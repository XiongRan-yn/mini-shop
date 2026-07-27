/**
 * 结算页
 * 确认地址 + 商品清单 + 下单
 */
const cartService = require('../../utils/cart');
const { generateOrderNo } = require('../../utils/util');
const { getProductImage } = require('../../utils/image');

Page({
  data: {
    address: null,
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
    freight: 0,
    remark: ''
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    this.loadAddress();
  },

  /** 加载数据 */
  loadData() {
    const items = cartService.getSelectedItems();
    if (items.length === 0) {
      wx.showToast({ title: '请先选择商品', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }
    // 为每个商品生成占位图
    items.forEach(item => {
      item.image = getProductImage(item);
    });
    const totalPrice = cartService.getTotalPrice();
    const totalQuantity = cartService.getTotalQuantity();
    const freight = totalPrice >= 99 ? 0 : 8;

    this.setData({ items, totalPrice, totalQuantity, freight });
    this.loadAddress();
  },

  /** 加载默认地址 */
  loadAddress() {
    const addressList = wx.getStorageSync('addressList') || [];
    const defaultAddr = addressList.find(a => a.isDefault) || addressList[0] || null;
    this.setData({ address: defaultAddr });
  },

  /** 选择地址 */
  onSelectAddress() {
    wx.navigateTo({ url: '/pages/address/index?from=checkout' });
  },

  /** 备注输入 */
  onRemarkInput(e) {
    this.setData({ remark: e.detail.value });
  },

  /** 提交订单 */
  onSubmit() {
    const { address, items, totalPrice, freight, remark } = this.data;

    if (!address) {
      wx.showToast({ title: '请先添加收货地址', icon: 'none' });
      return;
    }

    // 构建订单
    const order = {
      orderNo: generateOrderNo(),
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        color: item.color,
        categoryId: item.categoryId
      })),
      totalPrice: totalPrice + freight,
      freight,
      address: {
        name: address.name,
        phone: address.phone,
        region: address.region,
        detail: address.detail
      },
      remark,
      status: 'pending_payment',
      createTime: new Date().toISOString()
    };

    // 保存订单
    const orderList = wx.getStorageSync('orderList') || [];
    orderList.unshift(order);
    wx.setStorageSync('orderList', orderList);

    // 清除购物车中已选商品
    cartService.clearSelected();

    wx.showToast({ title: '下单成功', icon: 'success', duration: 1500 });

    setTimeout(() => {
      wx.redirectTo({ url: `/pages/order-detail/index?orderNo=${order.orderNo}` });
    }, 1500);
  }
});
