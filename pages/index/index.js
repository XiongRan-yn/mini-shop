/**
 * 首页
 * 轮播图 + 分类导航 + 推荐商品
 */
const { banners, categories, getHotProducts, getRecommendProducts } = require('../../utils/mock');
const { getBannerImage } = require('../../utils/image');

Page({
  data: {
    bannerImages: [],   // CDN 轮播图
    categories: [],
    hotProducts: [],
    recommendProducts: [],
    loading: true
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    if (typeof this.getTabBar === 'function') {
      const tabBar = this.getTabBar();
      if (tabBar) {
        tabBar.setData({ selected: 0 });
        tabBar.updateCartBadge();
      }
    }
  },

  loadData() {
    // 用 CDN 真实图片做轮播
    const bannerImages = banners.map((b, i) => ({
      ...b,
      image: getBannerImage(i)
    }));
    setTimeout(() => {
      this.setData({
        bannerImages,
        categories,
        hotProducts: getHotProducts(8),
        recommendProducts: getRecommendProducts(6),
        loading: false
      });
    }, 300);
  },

  onPullDownRefresh() {
    this.setData({ recommendProducts: getRecommendProducts(6) });
    wx.stopPullDownRefresh();
  },

  onBannerTap(e) {
    const { link } = e.currentTarget.dataset;
    if (link) wx.navigateTo({ url: link });
  },

  onCategoryTap(e) {
    const { id } = e.currentTarget.dataset;
    wx.switchTab({ url: '/pages/category/index' });
    wx.setStorageSync('activeCategoryId', id);
  },

  onSearchTap() {
    wx.navigateTo({ url: '/pages/search/index' });
  }
});