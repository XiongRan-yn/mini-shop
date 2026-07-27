/**
 * 支付模块
 * - pay()      模拟支付（当前可用）
 * - payReal()  真实微信支付（需后端支持，暂未启用）
 * 
 * 切换方式：将下方 USE_REAL_PAYMENT 改为 true 即可
 * 
 * 真实支付接入前提：
 * 1. 拥有微信支付商户号 (mchId) 和 API 密钥
 * 2. 后端服务调用统一下单接口获取 prepay_id
 * 3. 小程序绑定微信支付商户
 */

const USE_REAL_PAYMENT = false; // true=真实支付  false=模拟支付

/**
 * === 真实微信支付（需后端配合） ===
 * 
 * 流程：
 * 1. wx.login() 获取 code
 * 2. 后端用 code 换取 openid
 * 3. 后端调用微信支付「统一下单」接口 → 返回 prepay_id + 签名参数
 * 4. 前端调用 wx.requestPayment 唤起收银台
 * 
 * @param {object} order 订单对象 { orderNo, totalPrice, ... }
 * @returns {Promise<object>} { success, data/error }
 */
function payReal(order) {
  return new Promise((resolve, reject) => {
    // 第一步：wx.login 获取临时 code
    wx.login({
      success: (loginRes) => {
        if (!loginRes.code) {
          reject({ message: 'wx.login 失败' });
          return;
        }

        // 第二步：将 code + 订单信息发给后端
        wx.request({
          url: 'https://your-api-server.com/api/pay/prepay',  // TODO: 替换为你的后端地址
          method: 'POST',
          header: { 'Content-Type': 'application/json' },
          data: {
            code: loginRes.code,
            orderNo: order.orderNo,
            totalFee: Math.round(order.totalPrice * 100),  // 单位：分
            body: 'MiniShop商品'
          },
          success: (res) => {
            if (res.statusCode === 200 && res.data.code === 0) {
              const payParams = res.data.data;  // 后端返回的支付参数

              // 第三步：调起微信支付收银台
              wx.requestPayment({
                timeStamp: payParams.timeStamp,
                nonceStr: payParams.nonceStr,
                package: payParams.package,
                signType: payParams.signType || 'RSA',
                paySign: payParams.paySign,
                success: () => {
                  resolve({ success: true, message: '支付成功' });
                },
                fail: (payErr) => {
                  reject({ success: false, message: '支付取消或失败', error: payErr });
                }
              });
            } else {
              reject({ message: res.data.msg || '预下单失败' });
            }
          },
          fail: (reqErr) => {
            reject({ message: '网络请求失败', error: reqErr });
          }
        });
      },
      fail: (loginErr) => {
        reject({ message: 'wx.login 调用失败', error: loginErr });
      }
    });
  });
}

/**
 * === 模拟支付（当前使用） ===
 * 
 * 弹窗确认后直接返回成功，不涉及真实资金
 * 
 * @param {object} order 订单对象
 * @returns {Promise<object>} { success }
 */
function payMock(order) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '确认支付',
      content: `订单金额：¥${order.totalPrice.toFixed(2)}\n\n模拟支付场景，确认支付？`,
      success: (res) => {
        if (res.confirm) {
          // 模拟支付延迟
          wx.showLoading({ title: '支付处理中...' });
          setTimeout(() => {
            wx.hideLoading();
            resolve({ success: true, message: '支付成功' });
          }, 800);
        } else {
          reject({ success: false, message: '用户取消支付' });
        }
      }
    });
  });
}

/**
 * === 统一支付入口 ===
 * 
 * 根据 USE_REAL_PAYMENT 自动选择支付方式
 * 
 * @param {object} order 订单对象 { orderNo, totalPrice, items, ... }
 * @returns {Promise<object>} { success, message }
 */
function pay(order) {
  if (USE_REAL_PAYMENT) {
    return payReal(order);
  }
  return payMock(order);
}

module.exports = {
  pay,
  payMock,
  payReal,
  USE_REAL_PAYMENT
};