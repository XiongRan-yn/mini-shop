/**
 * 商品详情页
 */
const { getProductById } = require('../../utils/mock');
const { getProductImage } = require('../../utils/image');
const cart = require('../../utils/cart');
const favorite = require('../../utils/favorite');

Page({
  data: {
    goods: null,
    swiperImages: [],   // CDN 轮播图
    quantity: 1,
    showCartTip: false,
    isFavorite: false
  },

  onLoad(options) {
    const id = options.id;
    if (id) {
      const goods = getProductById(id);
      if (goods) {
        // 用同分类不同图片做轮播
        const swiperImages = [0, 1, 2].map(offset => {
          const p = { ...goods, id: goods.id + offset };
          return getProductImage(p);
        });
        this.setData({ goods, swiperImages, isFavorite: favorite.isFavorite(goods.id) });
        wx.setNavigationBarTitle({ title: goods.name });
      } else {
        wx.showToast({ title: '商品不存在', icon: 'none' });
      }
    }
  },

  onDecrease() {
    if (this.data.quantity > 1) {
      this.setData({ quantity: this.data.quantity - 1 });
    }
  },

  onIncrease() {
    const goods = this.data.goods;
    if (this.data.quantity < (goods?.stock || 999)) {
      this.setData({ quantity: this.data.quantity + 1 });
    }
  },

  onAddToCart() {
    const goods = this.data.goods;
    if (!goods) return;
    cart.addToCart(goods, this.data.quantity);
    wx.showToast({ title: '已加入购物车', icon: 'success' });
    this.setData({ showCartTip: true });
    setTimeout(() => { this.setData({ showCartTip: false }); }, 3000);
  },

  onBuyNow() {
    const goods = this.data.goods;
    if (!goods) return;
    cart.addToCart(goods, this.data.quantity);
    wx.navigateTo({ url: '/pages/checkout/index' });
  },

  onGoCart() {
    wx.switchTab({ url: '/pages/cart/index' });
  },

  /** 切换收藏状态 */
  onToggleFavorite() {
    const goods = this.data.goods;
    if (!goods) return;
    const isFavorite = favorite.toggleFavorite(goods);
    this.setData({ isFavorite });
    wx.showToast({ title: isFavorite ? '已收藏' : '已取消收藏', icon: 'none' });
  },
  onShareAppMessage() {
    const goods = this.data.goods;
    return {
      title: goods ? goods.name : 'MiniShop',
      path: `/pages/goods/index?id=${goods?.id || 1}`
    };
  }
});
