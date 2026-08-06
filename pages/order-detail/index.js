/**
 * 订单详情页
 */
const { getProductImage } = require('../../utils/image');
const { pay } = require('../../utils/payment');
const { getOrderStatusText, getOrderStatusColor } = require('../../utils/util');
const { getRefundByOrderNo } = require('../../utils/refund');

Page({
  data: {
    order: null,
    statusText: '',
    statusColor: '',
    hasRefund: false
  },

  onLoad(options) {
    const { orderNo } = options;
    if (orderNo) {
      this.loadOrder(orderNo);
    }
  },

  /** 加载订单 */
  loadOrder(orderNo) {
    const orderList = wx.getStorageSync('orderList') || [];
    const order = orderList.find(o => o.orderNo === orderNo);
    if (order) {
      // 给每个商品生成图片
      order.items.forEach(item => {
        if (!item.image) {
          item.image = getProductImage(item);
        }
      });
      this.setData({
        order,
        statusText: getOrderStatusText(order.status),
        statusColor: getOrderStatusColor(order.status)
      });
    } else {
      wx.showToast({ title: '订单不存在', icon: 'none' });
    }
  },

  /** 去支付（调用统一支付模块） */
  onPay() {
    const { order } = this.data;
    if (!order) return;

    pay(order)
      .then((res) => {
        if (res.success) {
          this.updateStatus('completed');
        }
      })
      .catch((err) => {
        if (err.message !== '用户取消支付') {
          wx.showToast({ title: err.message || '支付失败', icon: 'none' });
        }
      });
  },

  /** 确认收货 */
  onConfirmReceive() {
    const that = this;
    wx.showModal({
      title: '确认收货',
      content: '确定已收到商品吗？',
      success(res) {
        if (res.confirm) {
          that.updateStatus('completed');
        }
      }
    });
  },

  /** 取消订单 */
  onCancel() {
    const that = this;
    wx.showModal({
      title: '取消订单',
      content: '确定要取消该订单吗？',
      success(res) {
        if (res.confirm) {
          that.updateStatus('cancelled');
        }
      }
    });
  },

  /** 申请退款 */
  onRefund() {
    const { order } = this.data;
    if (!order) return;
    wx.navigateTo({ url: '/pages/refund/index?orderNo=' + order.orderNo + '&price=' + order.totalPrice });
  },

  /** 更新订单状态 */
  updateStatus(newStatus) {
    const orderList = wx.getStorageSync('orderList') || [];
    const order = orderList.find(o => o.orderNo === this.data.order.orderNo);
    if (order) {
      order.status = newStatus;
      wx.setStorageSync('orderList', orderList);
      wx.showToast({ title: '操作成功', icon: 'success' });
      this.loadOrder(order.orderNo);
    }
  },

  onShow() {
    const { order } = this.data;
    if (order) {
      const refund = getRefundByOrderNo(order.orderNo);
      this.setData({ hasRefund: !!refund });
    }
  }
});