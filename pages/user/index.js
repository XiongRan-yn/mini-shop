/**
 * 个人中心页
 */
const app = getApp();

Page({
  data: {
    userInfo: null,
    isLogin: false,
    orderStats: {
      pending_payment: 0,
      pending_shipment: 0,
      pending_receipt: 0,
      completed: 0
    }
  },

  onShow() {
    this.loadUserInfo();
    this.loadOrderStats();
    // 更新 tabBar
    if (typeof this.getTabBar === 'function') {
      const tabBar = this.getTabBar();
      if (tabBar) {
        tabBar.setData({ selected: 3 });
        tabBar.updateCartBadge();
      }
    }
  },

  /** 加载用户信息 */
  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({ userInfo, isLogin: true });
    }
  },

  /** 加载订单统计 */
  loadOrderStats() {
    const orderList = wx.getStorageSync('orderList') || [];
    const stats = {
      pending_payment: 0,
      pending_shipment: 0,
      pending_receipt: 0,
      completed: 0
    };
    orderList.forEach(order => {
      if (stats[order.status] !== undefined) {
        stats[order.status]++;
      }
    });
    this.setData({ orderStats: stats });
  },

  /** 获取用户信息 */
  onGetUserInfo(e) {
    if (e.detail.userInfo) {
      const userInfo = e.detail.userInfo;
      this.setData({ userInfo, isLogin: true });
      wx.setStorageSync('userInfo', userInfo);
      app.globalData.userInfo = userInfo;
      app.globalData.isLogin = true;
    }
  },

  /** 退出登录 */
  onLogout() {
    const that = this;
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success(res) {
        if (res.confirm) {
          wx.removeStorageSync('userInfo');
          that.setData({ userInfo: null, isLogin: false });
          app.globalData.userInfo = null;
          app.globalData.isLogin = false;
        }
      }
    });
  },

  /** 查看订单(按状态) */
  onViewOrders(e) {
    const { status } = e.currentTarget.dataset;
    wx.navigateTo({ url: '/pages/order/index' });
    // 存储要查看的tab
    wx.setStorageSync('orderActiveTab', status || 'all');
  },

  /** 跳转我的收藏 */
  onGoFavorites() {
    wx.navigateTo({ url: '/pages/favorites/index' });
  },

  /** 跳转地址管理 */
  onAddressManage() {
    wx.navigateTo({ url: '/pages/address/index' });
  },

  /** 关于我们 */
  onAbout() {
    wx.showModal({
      title: '关于 MiniShop',
      content: 'MiniShop 是一个纯原生微信小程序电商演示项目。\n\n· 零npm依赖，导入即运行\n· 完整电商业务流程\n· 本地模拟数据\n· 代码简洁清晰',
      showCancel: false
    });
  },

  /** 联系客服 */
  onContact() {
    wx.showToast({ title: '客服功能开发中', icon: 'none' });
  }
});