/**
 * 我的收藏页
 */
const favorite = require('../../utils/favorite');
const { getProductImage } = require('../../utils/image');

Page({
  data: {
    favorites: []
  },

  onShow() {
    this.loadFavorites();
  },

  /** 加载收藏列表 */
  loadFavorites() {
    const favorites = favorite.getFavorites().map(item => ({
      ...item,
      image: getProductImage(item)
    }));
    this.setData({ favorites });
  },

  /** 点击进入商品详情 */
  onGoGoods(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/goods/index?id=${id}` });
  },

  /** 取消收藏 */
  onRemoveFavorite(e) {
    const { id } = e.currentTarget.dataset;
    favorite.removeFavorite(id);
    this.loadFavorites();
    wx.showToast({ title: '已取消收藏', icon: 'none' });
  }
});