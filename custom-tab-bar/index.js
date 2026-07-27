/**
 * 自定义 TabBar 组件
 * 使用纯文字+emoji图标，无需任何图片资源
 */
Component({
  properties: {
    selected: {
      type: Number,
      value: 0
    }
  },

  data: {
    showBadge: false,
    cartCount: 0,
    list: [
      { pagePath: '/pages/index/index', text: '首页', icon: '🏠' },
      { pagePath: '/pages/category/index', text: '分类', icon: '📋' },
      { pagePath: '/pages/cart/index', text: '购物车', icon: '🛒' },
      { pagePath: '/pages/user/index', text: '我的', icon: '👤' }
    ]
  },

  lifetimes: {
    attached() {
      this.updateCartBadge();
    }
  },

  pageLifetimes: {
    show() {
      this.updateCartBadge();
    }
  },

  methods: {
    /** 切换Tab */
    switchTab(e) {
      const index = e.currentTarget.dataset.index;
      if (index === this.data.selected) return;
      const url = this.data.list[index].pagePath;
      wx.switchTab({ url });
    },

    /** 更新购物车角标 */
    updateCartBadge() {
      try {
        const cart = wx.getStorageSync('cart') || [];
        const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        this.setData({
          cartCount: count,
          showBadge: count > 0
        });
      } catch (e) {
        // ignore
      }
    }
  }
});
