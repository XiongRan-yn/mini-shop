/**
 * 订单列表页
 */
const { getProductImage } = require('../../utils/image');
const { pay } = require('../../utils/payment');

Page({
  data: {
    tabs: [
      { key: 'all', label: '全部' },
      { key: 'pending_payment', label: '待付款' },
      { key: 'pending_shipment', label: '待发货' },
      { key: 'pending_receipt', label: '待收货' },
      { key: 'completed', label: '已完成' }
    ],
    activeTab: 'all',
    orderList: [],
    filteredList: []
  },

  onShow() {
    this.loadOrders();
  },

  /** 加载订单 */
  loadOrders() {
    const orderList = wx.getStorageSync('orderList') || [];
    // 按时间倒序并给每个商品项目生成图片
    orderList.sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
    orderList.forEach(order => {
      order.items.forEach(item => {
        if (!item.image) {
          item.image = getProductImage(item);
        }
      });
    });
    this.setData({ orderList });
    this.filterOrders();
  },

  /** 切换Tab */
  onTabTap(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({ activeTab: key });
    this.filterOrders();
  },

  /** 筛选订单 */
  filterOrders() {
    const { orderList, activeTab } = this.data;
    let filteredList = orderList;
    if (activeTab !== 'all') {
      filteredList = orderList.filter(o => o.status === activeTab);
    }
    this.setData({ filteredList });
  },

  /** 查看订单详情 */
  onOrderTap(e) {
    const { orderNo } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/order-detail/index?orderNo=${orderNo}` });
  },

  /** 去支付（调用统一支付模块） */
  onPay(e) {
    const { orderNo } = e.currentTarget.dataset;
    const order = this.data.orderList.find(o => o.orderNo === orderNo);
    if (!order) return;

    pay(order)
      .then((res) => {
        if (res.success) {
          this.updateOrderStatus(orderNo, 'pending_shipment');
        }
      })
      .catch((err) => {
        if (err.message !== '用户取消支付') {
          wx.showToast({ title: err.message || '支付失败', icon: 'none' });
        }
      });
  },

  /** 确认收货 */
  onConfirmReceive(e) {
    const { orderNo } = e.currentTarget.dataset;
    wx.showModal({
      title: '确认收货',
      content: '确定已收到商品吗？',
      success: (res) => {
        if (res.confirm) {
          this.updateOrderStatus(orderNo, 'completed');
        }
      }
    });
  },

  /** 取消订单 */
  onCancel(e) {
    const { orderNo } = e.currentTarget.dataset;
    wx.showModal({
      title: '取消订单',
      content: '确定要取消该订单吗？',
      success: (res) => {
        if (res.confirm) {
          this.updateOrderStatus(orderNo, 'cancelled');
        }
      }
    });
  },

  /** 更新订单状态 */
  updateOrderStatus(orderNo, newStatus) {
    const orderList = wx.getStorageSync('orderList') || [];
    const order = orderList.find(o => o.orderNo === orderNo);
    if (order) {
      order.status = newStatus;
      wx.setStorageSync('orderList', orderList);
      wx.showToast({ title: '操作成功', icon: 'success' });
      this.loadOrders();
    }
  }
});