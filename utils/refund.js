/**
 * 退款模块
 */
const STORAGE_KEY = 'refundList';

function getRefundList() {
  return wx.getStorageSync(STORAGE_KEY) || [];
}

function getRefundByOrderNo(orderNo) {
  return getRefundList().find(r => r.orderNo === orderNo) || null;
}

function submitRefund(refund) {
  const list = getRefundList();
  refund.id = Date.now().toString(36);
  refund.status = 'pending';
  refund.createTime = new Date().toISOString();
  list.unshift(refund);
  wx.setStorageSync(STORAGE_KEY, list);

  const orderList = wx.getStorageSync('orderList') || [];
  const order = orderList.find(o => o.orderNo === refund.orderNo);
  if (order) {
    order.status = 'after_sale';
    wx.setStorageSync('orderList', orderList);
  }
  return refund;
}

function getStatusText(status) {
  const map = { 'pending': '审核中', 'approved': '已通过', 'rejected': '已拒绝', 'refunded': '已退款' };
  return map[status] || status;
}

module.exports = { getRefundList, getRefundByOrderNo, submitRefund, getStatusText };
