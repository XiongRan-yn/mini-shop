/**
 * 退款申请页
 */
const refundService = require('../../utils/refund');

Page({
  data: {
    orderNo: '',
    totalPrice: 0,
    reason: '',
    reasons: ['商品与描述不符', '商品破损/质量问题', '未收到商品', '发错货/漏发', '不想要了', '其他原因']
  },

  onLoad(options) {
    const { orderNo, price } = options;
    this.setData({ orderNo, totalPrice: parseFloat(price) || 0 });
  },

  onReasonTap(e) {
    this.setData({ reason: e.currentTarget.dataset.text });
  },

  onSubmit() {
    const { orderNo, totalPrice, reason } = this.data;
    if (!reason) {
      wx.showToast({ title: '请选择退款原因', icon: 'none' });
      return;
    }

    wx.showModal({
      title: '确认申请',
      content: 退款金额：¥，确定提交？,
      success: (res) => {
        if (res.confirm) {
          refundService.submitRefund({ orderNo, totalPrice, reason });
          wx.showToast({ title: '申请已提交', icon: 'success' });
          setTimeout(() => wx.navigateBack(), 1500);
        }
      }
    });
  }
});
