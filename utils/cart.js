/**
 * 购物车管理模块
 * 使用 wx.Storage 持久化存储购物车数据
 */

const STORAGE_KEY = 'cart';

/** 获取购物车 */
function getCart() {
  return wx.getStorageSync(STORAGE_KEY) || [];
}

/** 保存购物车 */
function saveCart(cart) {
  wx.setStorageSync(STORAGE_KEY, cart);
}

/** 添加商品到购物车 */
function addToCart(product, quantity = 1) {
  const cart = getCart();
  const index = cart.findIndex(item => item.id === product.id);
  if (index > -1) {
    cart[index].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      color: product.color || '#eee',
      quantity: quantity,
      selected: true,
      stock: product.stock || 999,
      categoryId: product.categoryId
    });
  }
  saveCart(cart);
  return cart;
}

/** 更新商品数量 */
function updateQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = Math.max(1, Math.min(quantity, item.stock || 999));
  }
  saveCart(cart);
  return cart;
}

/** 从购物车删除商品 */
function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
  return cart;
}

/** 切换商品选中状态 */
function toggleSelected(productId) {
  const cart = getCart();
  const item = cart.find(item => item.id === productId);
  if (item) item.selected = !item.selected;
  saveCart(cart);
  return cart;
}

/** 全选/取消全选 */
function toggleAllSelected(isSelected) {
  const cart = getCart();
  cart.forEach(item => { item.selected = isSelected; });
  saveCart(cart);
  return cart;
}

/** 删除已选中的商品 */
function clearSelected() {
  const cart = getCart().filter(item => !item.selected);
  saveCart(cart);
  return cart;
}

/** 获取已选中的商品 */
function getSelectedItems() {
  return getCart().filter(item => item.selected);
}

/** 获取选中商品总价 */
function getTotalPrice() {
  return getSelectedItems().reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

/** 获取选中商品总数量 */
function getTotalQuantity() {
  return getSelectedItems().reduce((count, item) => count + item.quantity, 0);
}

/** 获取购物车商品总数 */
function getCartCount() {
  return getCart().reduce((count, item) => count + item.quantity, 0);
}

/** 是否全选 */
function isAllSelected() {
  const cart = getCart();
  return cart.length > 0 && cart.every(item => item.selected);
}

module.exports = {
  getCart,
  saveCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  toggleSelected,
  toggleAllSelected,
  clearSelected,
  getSelectedItems,
  getTotalPrice,
  getTotalQuantity,
  getCartCount,
  isAllSelected
};
