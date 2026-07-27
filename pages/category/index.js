/**
 * 分类页
 * 左侧分类列表 + 右侧商品列表
 */
const { categories, getProductsByCategory } = require('../../utils/mock');

Page({
  data: {
    categories: [],
    activeCategoryId: 1,
    products: []
  },

  onLoad() {
    this.setData({ categories });
    // 读取首页传递的分类ID
    const activeId = wx.getStorageSync('activeCategoryId');
    const categoryId = activeId || categories[0]?.id || 1;
    this.setData({ activeCategoryId: categoryId });
    this.loadProducts(categoryId);
    // 清除暂存的分类ID
    wx.removeStorageSync('activeCategoryId');
  },

  onShow() {
    if (typeof this.getTabBar === 'function') {
      const tabBar = this.getTabBar();
      if (tabBar) {
        tabBar.setData({ selected: 1 });
        tabBar.updateCartBadge();
      }
    }
  },

  /** 切换分类 */
  onCategoryTap(e) {
    const id = e.currentTarget.dataset.id;
    if (id === this.data.activeCategoryId) return;
    this.setData({ activeCategoryId: id });
    this.loadProducts(id);
  },

  /** 加载分类商品 */
  loadProducts(categoryId) {
    const products = getProductsByCategory(categoryId);
    this.setData({ products });
  }
});