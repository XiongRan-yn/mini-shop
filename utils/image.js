/**
 * 商品图片工具
 * 使用 TDesign 官方 CDN 商品实拍图（腾讯 gtimg.com，国内秒开）
 * urlCheck: false 已设，开发模式无需配置域名白名单
 */

const CDN = 'https://tdesign.gtimg.com/miniprogram/template/retail/goods';

/** 各分类对应的 CDN 图片池（真实商品摄影图） */
const pool = {
  1: ['dz-2a', 'dz-2b', 'dz-3a', 'dz-3b'],              // 手机数码 — 电子产品实拍
  2: ['nz-08a', 'nz-08b', 'nz-09a', 'nz-09b', 'nz-17a', 'nz-17b'], // 服装 — 服装实拍
  3: ['gh-1a', 'gh-1b', 'gh-2a', 'gh-2b'],              // 食品 — 餐具/食品风格
  4: ['gh-1a', 'gh-1b', 'gh-2a', 'gh-2b'],              // 家居 — 家居家装
  5: ['nz-09a', 'nz-09b'],                               // 美妆 — 时尚风格
  6: ['nz-17a', 'nz-17b', 'nz-08a', 'nz-08b'],          // 运动 — 运动服装
  7: ['gh-1a', 'gh-2a', 'dz-3a'],                        // 图书 — 通用
  8: ['muy-3a', 'muy-3b', 'muy-3a1'],                    // 母婴 — 母婴用品实拍
};

/** 轮播图 */
const BANNER_CDN = 'https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-mp';

/**
 * 获取商品图片 URL（TDesign CDN 真实摄影图）
 * @param {Object} product - { id, categoryId }
 * @param {string} _unused  - 保留兼容
 */
function getProductImage(product, _unused) {
  const cid = product.categoryId || 1;
  const images = pool[cid] || pool[4];
  const idx = (product.id || 1) % images.length;
  return `${CDN}/${images[idx]}.png`;
}

/** 获取轮播图 */
function getBannerImage(index) {
  // 每张轮播图略有不同
  const banners = [
    `${BANNER_CDN}/activity/banner.png`,
    `https://tdesign.gtimg.com/miniprogram/template/retail/goods/nz-09a.png`,
    `https://tdesign.gtimg.com/miniprogram/template/retail/goods/dz-3a.png`,
  ];
  return banners[index % banners.length];
}

module.exports = { getProductImage, getBannerImage };
