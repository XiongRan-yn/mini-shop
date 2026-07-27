/**
 * 商品卡片组件
 * 用于商品列表、推荐等场景的通用卡片
 */
const { getProductImage } = require('../../utils/image');

Component({
  properties: {
    goods: {
      type: Object,
      value: {}
    }
  },

  observers: {
    'goods': function(goods) {
      if (goods && goods.id) {
        this.setData({ image: getProductImage(goods) });
      }
    }
  },

  data: {
    image: '',
    imageError: false
  },

  methods: {
    /** 点击跳转到商品详情 */
    onClick() {
      const id = this.data.goods.id;
      if (id) {
        wx.navigateTo({ url: `/pages/goods/index?id=${id}` });
      }
    },

    /** 图片加载失败时显示占位 */
    onImageError() {
      this.setData({ imageError: true });
    }
  }
});