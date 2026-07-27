/**
 * 小程序入口文件
 * 纯原生微信小程序 - 零npm依赖 - 导入即运行
 */
App({
  onLaunch() {
    // 初始化本地存储
    this.initStorage();
  },

  /** 初始化存储数据 */
  initStorage() {
    const cart = wx.getStorageSync('cart');
    if (!cart) wx.setStorageSync('cart', []);

    const addressList = wx.getStorageSync('addressList');
    if (!addressList) wx.setStorageSync('addressList', []);

    const orderList = wx.getStorageSync('orderList');
    if (!orderList) wx.setStorageSync('orderList', []);

    const searchHistory = wx.getStorageSync('searchHistory');
    if (!searchHistory) wx.setStorageSync('searchHistory', []);
  },

  globalData: {
    userInfo: null,
    isLogin: false
  }
});
