/**
 * 通用工具函数
 */

/** 格式化价格（分转元，保留两位小数） */
function formatPrice(price) {
  if (typeof price !== 'number') return '0.00';
  return price.toFixed(2);
}

/** 格式化时间 */
function formatTime(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return '';
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second);
}

/** 防抖 */
function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

/** 节流 */
function throttle(fn, delay = 300) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn.apply(this, args);
    }
  };
}

/** 生成订单号 */
function generateOrderNo() {
  const now = new Date();
  const timeStr = formatTime(now, 'YYYYMMDDHHmmss');
  const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return timeStr + random;
}

/** 获取订单状态文字 */
function getOrderStatusText(status) {
  const map = {
    'all': '全部',
    'pending_payment': '待付款',
    'pending_shipment': '待发货',
    'pending_receipt': '待收货',
    'completed': '已完成',
    'cancelled': '已取消',
    'after_sale': '售后中'
  };
  return map[status] || status;
}

/** 获取订单状态样式色 */
function getOrderStatusColor(status) {
  const map = {
    'pending_payment': '#ff5777',
    'pending_shipment': '#f9ca24',
    'pending_receipt': '#4ecdc4',
    'completed': '#999999',
    'cancelled': '#999999',
    'after_sale': '#ff5777'
  };
  return map[status] || '#333';
}

/** 手机号脱敏 */
function maskPhone(phone) {
  if (!phone || phone.length < 11) return phone;
  return phone.substring(0, 3) + '****' + phone.substring(7);
}

module.exports = {
  formatPrice,
  formatTime,
  debounce,
  throttle,
  generateOrderNo,
  getOrderStatusText,
  getOrderStatusColor,
  maskPhone
};
