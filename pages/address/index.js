/**
 * 地址列表页
 */
Page({
  data: {
    addressList: [],
    from: '' // 'checkout' 表示从结算页跳转
  },

  onLoad(options) {
    this.setData({ from: options.from || '' });
  },

  onShow() {
    this.loadAddressList();
  },

  /** 加载地址列表 */
  loadAddressList() {
    const addressList = wx.getStorageSync('addressList') || [];
    this.setData({ addressList });
  },

  /** 选择地址（结算页跳转时） */
  onSelectAddress(e) {
    if (this.data.from !== 'checkout') return;
    const index = e.currentTarget.dataset.index;
    // 设置选中地址为默认
    const addressList = this.data.addressList;
    addressList.forEach((a, i) => { a.isDefault = i === index; });
    wx.setStorageSync('addressList', addressList);
    wx.navigateBack();
  },

  /** 编辑地址 */
  onEdit(e) {
    const index = e.currentTarget.dataset.index;
    wx.navigateTo({ url: `/pages/address-edit/index?index=${index}` });
  },

  /** 新建地址 */
  onAdd() {
    wx.navigateTo({ url: '/pages/address-edit/index' });
  },

  /** 删除地址 */
  onDelete(e) {
    const that = this;
    const index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定要删除该地址吗？',
      success(res) {
        if (res.confirm) {
          const addressList = that.data.addressList;
          addressList.splice(index, 1);
          wx.setStorageSync('addressList', addressList);
          that.loadAddressList();
        }
      }
    });
  },

  /** 设置默认地址 */
  onSetDefault(e) {
    const index = e.currentTarget.dataset.index;
    const addressList = this.data.addressList;
    addressList.forEach((a, i) => { a.isDefault = i === index; });
    wx.setStorageSync('addressList', addressList);
    this.loadAddressList();
    wx.showToast({ title: '已设为默认地址', icon: 'success' });
  }
});
