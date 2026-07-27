/**
 * 购物车商品项组件
 */
const { getProductImage } = require('../../utils/image');

Component({
  properties: {
    item: {
      type: Object,
      value: {}
    },
    /** 是否编辑模式 */
    editMode: {
      type: Boolean,
      value: false
    }
  },

  observers: {
    'item': function(item) {
      if (item && item.id) {
        this.setData({ image: getProductImage(item) });
      }
    }
  },

  data: {
    image: ''
  },

  methods: {
    /** 切换选中 */
    onToggle() {
      this.triggerEvent('toggle', { id: this.data.item.id });
    },

    /** 增加数量 */
    onIncrease() {
      const item = this.data.item;
      this.triggerEvent('change', {
        id: item.id,
        quantity: item.quantity + 1
      });
    },

    /** 减少数量 */
    onDecrease() {
      const item = this.data.item;
      if (item.quantity <= 1) return;
      this.triggerEvent('change', {
        id: item.id,
        quantity: item.quantity - 1
      });
    },

    /** 删除 */
    onDelete() {
      const that = this;
      wx.showModal({
        title: '提示',
        content: '确定要删除该商品吗？',
        success(res) {
          if (res.confirm) {
            that.triggerEvent('delete', { id: that.data.item.id });
          }
        }
      });
    }
  }
});
