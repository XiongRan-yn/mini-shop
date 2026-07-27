/**
 * 搜索页
 */
const { searchProducts, getHotProducts } = require('../../utils/mock');
const { debounce } = require('../../utils/util');

Page({
  data: {
    keyword: '',
    searchHistory: [],
    hotSearch: [],
    results: [],
    searched: false
  },

  onLoad() {
    // 加载搜索历史
    const history = wx.getStorageSync('searchHistory') || [];
    this.setData({
      searchHistory: history,
      hotSearch: getHotProducts(6)
    });
    // 初始化防抖搜索函数
    this.doSearchDebounced = debounce((keyword) => {
      const results = searchProducts(keyword);
      this.setData({ results, searched: true });
    }, 300);
  },

  /** 输入搜索词 */
  onInput(e) {
    const keyword = e.detail.value;
    this.setData({ keyword });
    // 实时搜索（防抖）
    if (keyword.trim()) {
      this.doSearchDebounced(keyword);
    }
  },

  /** 执行搜索 */
  doSearch(keyword) {
    const results = searchProducts(keyword);
    this.setData({ results, searched: true });
  },

  // 防抖搜索函数（在onLoad中绑定）
  doSearchDebounced: null,

  /** 点击搜索 */
  onSearch() {
    const keyword = this.data.keyword.trim();
    if (!keyword) {
      wx.showToast({ title: '请输入搜索关键词', icon: 'none' });
      return;
    }
    this.saveHistory(keyword);
    this.doSearch(keyword);
  },

  /** 保存搜索历史 */
  saveHistory(keyword) {
    let history = this.data.searchHistory;
    // 去重
    history = history.filter(h => h !== keyword);
    history.unshift(keyword);
    // 最多保留10条
    history = history.slice(0, 10);
    this.setData({ searchHistory: history });
    wx.setStorageSync('searchHistory', history);
  },

  /** 点击历史搜索词 */
  onHistoryTap(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({ keyword });
    this.doSearch(keyword);
  },

  /** 清空历史 */
  onClearHistory() {
    const that = this;
    wx.showModal({
      title: '提示',
      content: '确定要清空搜索历史吗？',
      success(res) {
        if (res.confirm) {
          that.setData({ searchHistory: [] });
          wx.setStorageSync('searchHistory', []);
        }
      }
    });
  },

  /** 确认搜索 */
  onConfirm(e) {
    this.onSearch();
  }
});