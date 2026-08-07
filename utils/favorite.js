/**
 * 收藏管理模块
 * 使用 wx.Storage 持久化存储收藏商品数据
 */

const STORAGE_KEY = 'favorites';

/** 获取收藏列表 */
function getFavorites() {
  return wx.getStorageSync(STORAGE_KEY) || [];
}

/** 保存收藏列表 */
function saveFavorites(favorites) {
  wx.setStorageSync(STORAGE_KEY, favorites);
}

/** 是否已收藏 */
function isFavorite(productId) {
  const id = parseInt(productId, 10);
  return getFavorites().some(item => parseInt(item.id, 10) === id);
}

/** 添加收藏 */
function addFavorite(product) {
  const favorites = getFavorites();
  const productId = parseInt(product.id, 10);
  if (!favorites.some(item => parseInt(item.id, 10) === productId)) {
    favorites.push({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      sales: product.sales || 0,
      stock: product.stock || 999,
      color: product.color || '#eee',
      categoryId: product.categoryId
    });
    saveFavorites(favorites);
  }
  return favorites;
}

/** 取消收藏 */
function removeFavorite(productId) {
  const id = parseInt(productId, 10);
  const favorites = getFavorites().filter(item => parseInt(item.id, 10) !== id);
  saveFavorites(favorites);
  return favorites;
}

/** 切换收藏状态（已收藏则取消，否则添加），返回切换后是否处于收藏状态 */
function toggleFavorite(product) {
  if (isFavorite(product.id)) {
    removeFavorite(product.id);
    return false;
  }
  addFavorite(product);
  return true;
}

/** 获取收藏数量 */
function getFavoriteCount() {
  return getFavorites().length;
}

module.exports = {
  getFavorites,
  saveFavorites,
  isFavorite,
  addFavorite,
  removeFavorite,
  toggleFavorite,
  getFavoriteCount
};