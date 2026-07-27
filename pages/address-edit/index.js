/**
 * 地址编辑页（增加/编辑）
 */
Page({
  data: {
    isEdit: false,
    editIndex: -1,
    form: {
      name: '',
      phone: '',
      region: '',
      detail: '',
      isDefault: false
    },
    // 简化的地区选择（省-市-区模拟数据）
    regionIndex: [0, 0, 0]
  },

  onLoad(options) {
    const index = parseInt(options.index);
    if (!isNaN(index) && options.index !== undefined) {
      const addressList = wx.getStorageSync('addressList') || [];
      const address = addressList[index];
      if (address) {
        this.setData({
          isEdit: true,
          editIndex: index,
          form: { ...address }
        });
        wx.setNavigationBarTitle({ title: '编辑地址' });
      }
    }
  },

  /** 表单输入 */
  onInput(e) {
    const { field } = e.currentTarget.dataset;
    const form = this.data.form;
    form[field] = e.detail.value;
    this.setData({ form });
  },

  /** 选择地区（使用微信原生地区选择器） */
  onRegionChange(e) {
    const value = e.detail.value;
    const form = this.data.form;
    form.region = value.join(' ');
    this.setData({ form });
  },

  /** 切换默认地址 */
  onToggleDefault() {
    const form = this.data.form;
    form.isDefault = !form.isDefault;
    this.setData({ form });
  },

  /** 保存地址 */
  onSave() {
    const { name, phone, region, detail } = this.data.form;

    // 校验
    if (!name.trim()) {
      wx.showToast({ title: '请输入收货人姓名', icon: 'none' });
      return;
    }
    if (!phone.trim() || !/^1\d{10}$/.test(phone.trim())) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }
    if (!region.trim()) {
      wx.showToast({ title: '请选择所在地区', icon: 'none' });
      return;
    }
    if (!detail.trim()) {
      wx.showToast({ title: '请输入详细地址', icon: 'none' });
      return;
    }

    const addressList = wx.getStorageSync('addressList') || [];
    const form = this.data.form;
    // 如果设为默认，取消其他默认
    if (form.isDefault) {
      addressList.forEach(a => { a.isDefault = false; });
    }

    if (this.data.isEdit) {
      // 编辑模式：替换
      addressList[this.data.editIndex] = { ...form };
    } else {
      // 新增模式
      // 如果是第一个地址，自动设为默认
      if (addressList.length === 0) {
        form.isDefault = true;
      }
      addressList.push({ ...form });
    }

    wx.setStorageSync('addressList', addressList);
    wx.showToast({ title: '保存成功', icon: 'success' });
    setTimeout(() => wx.navigateBack(), 1000);
  }
});
