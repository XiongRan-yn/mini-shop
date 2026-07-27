/**
 * 商品详情页
 */
const { getProductById } = require('../../utils/mock');
const { getProductImage } = require('../../utils/image');
const cart = require('../../utils/cart');

Page({
  data: {
    goods: null,
    swiperImages: [],   // CDN 轮播图
    quantity: 1,
    showCartTip: false
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
        this.setData({ goods, swiperImages });
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

  onShareAppMessage() {
    const goods = this.data.goods;
    return {
      title: goods ? goods.name : 'MiniShop',
      path: `/pages/goods/index?id=${goods?.id || 1}`
    };
  }
});
