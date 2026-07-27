/**
 * 购物车页
 */
const cartService = require('../../utils/cart');

Page({
  data: {
    cartList: [],
    allSelected: false,
    totalPrice: 0,
    editMode: false
  },

  onShow() {
    this.refreshCart();
    // 更新 tabBar 角标
    if (typeof this.getTabBar === 'function') {
      const tabBar = this.getTabBar();
      if (tabBar) {
        tabBar.setData({ selected: 2 });
        tabBar.updateCartBadge();
      }
    }
  },

  /** 刷新购物车数据 */
  refreshCart() {
    const cartList = cartService.getCart();
    this.setData({
      cartList,
      allSelected: cartService.isAllSelected(),
      totalPrice: cartService.getTotalPrice()
    });
  },

  /** 切换选中 */
  onToggle(e) {
    const { id } = e.detail;
    cartService.toggleSelected(id);
    this.refreshCart();
  },

  /** 全选/取消全选 */
  onToggleAll() {
    const isAll = !this.data.allSelected;
    cartService.toggleAllSelected(isAll);
    this.refreshCart();
  },

  /** 改变数量 */
  onChangeQuantity(e) {
    const { id, quantity } = e.detail;
    cartService.updateQuantity(id, quantity);
    this.refreshCart();
  },

  /** 删除商品 */
  onDelete(e) {
    const { id } = e.detail;
    cartService.removeFromCart(id);
    this.refreshCart();
    // 更新 tabBar 角标
    if (typeof this.getTabBar === 'function') {
      const tabBar = this.getTabBar();
      if (tabBar) tabBar.updateCartBadge();
    }
  },

  /** 切换编辑模式 */
  onToggleEdit() {
    this.setData({ editMode: !this.data.editMode });
  },

  /** 结算 */
  onCheckout() {
    const selected = cartService.getSelectedItems();
    if (selected.length === 0) {
      wx.showToast({ title: '请先选择商品', icon: 'none' });
      return;
    }
    wx.navigateTo({ url: '/pages/checkout/index' });
  }
});