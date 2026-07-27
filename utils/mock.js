/**
 * 模拟数据模块
 * 所有商品、分类、轮播图数据均在此定义
 * 商品名称与CDN展示图保持一致（品类化命名）
 */

/* ========== 轮播图 ========== */
const banners = [
  {
    id: 1,
    bgColor: '#ff6b6b',
    title: '新品首发',
    desc: '数码好物 限时特惠',
    link: '/pages/goods/index?id=1'
  },
  {
    id: 2,
    bgColor: '#4ecdc4',
    title: '品牌日',
    desc: '品质生活 尽享优惠',
    link: '/pages/goods/index?id=5'
  },
  {
    id: 3,
    bgColor: '#45b7d1',
    title: '618返场',
    desc: '爆款好物 低至5折',
    link: '/pages/goods/index?id=10'
  },
  {
    id: 4,
    bgColor: '#f9ca24',
    title: '限时秒杀',
    desc: '每日10点 准时开抢',
    link: '/pages/goods/index?id=15'
  }
];

/* ========== 商品分类 ========== */
const categories = [
  { id: 1, name: '手机数码', icon: '📱' },
  { id: 2, name: '服装鞋帽', icon: '👗' },
  { id: 3, name: '食品生鲜', icon: '🍕' },
  { id: 4, name: '家居家装', icon: '🏠' },
  { id: 5, name: '美妆护肤', icon: '💕' },
  { id: 6, name: '运动户外', icon: '⚽' },
  { id: 7, name: '图书文具', icon: '📎' },
  { id: 8, name: '母婴玩具', icon: '🐣' }
];

/* ========== 商品列表 ========== */
const products = [
  // ---- 手机数码 ----
  {
    id: 1, categoryId: 1,
    name: '旗舰智能手机 256GB 暗夜黑',
    price: 8999, originalPrice: 9999,
    sales: 2356, stock: 99,
    color: '#1a1a2e',
    images: [],
    desc: '【旗舰性能】最新一代处理器 | 钛金属机身 | 4800万像素主摄 | USB-C接口 | 超长续航 | 支持卫星通信',
    specs: '颜色：暗夜黑 | 容量：256GB | 网络：5G全网通'
  },
  {
    id: 2, categoryId: 1,
    name: '商务旗舰手机 512GB 雅丹黑',
    price: 6999, originalPrice: 7999,
    sales: 1890, stock: 50,
    color: '#2d3436',
    images: [],
    desc: '【商务之选】自研旗舰芯片 | 卫星通话 | 昆仑玻璃 | 5000万像素超感知摄像头 | 大容量电池 | 流畅OS',
    specs: '颜色：雅丹黑 | 容量：512GB | 网络：5G全网通'
  },
  {
    id: 3, categoryId: 1,
    name: '影像旗舰手机 256GB 龙晶蓝',
    price: 5999, originalPrice: 6499,
    sales: 3201, stock: 120,
    color: '#e94560',
    images: [],
    desc: '【影像旗舰】旗舰处理器 | 专业光学镜头 | 5000万像素四摄 | 快充技术 | 无线秒充',
    specs: '颜色：龙晶蓝 | 容量：256GB | 网络：5G全网通'
  },
  {
    id: 4, categoryId: 1,
    name: '真无线降噪耳机 第二代',
    price: 1799, originalPrice: 1999,
    sales: 5600, stock: 200,
    color: '#dfe6e9',
    images: [],
    desc: '【沉浸降噪】自研芯片 | 自适应降噪 | 个性化空间音频 | 触控操作 | 无线充电 | 6小时续航',
    specs: '型号：真无线降噪耳机 (二代) | 接口：USB-C | 防水：IPX4'
  },

  // ---- 服装鞋帽 ----
  {
    id: 5, categoryId: 2,
    name: '纯棉圆领短袖T恤 男士休闲款',
    price: 129, originalPrice: 259,
    sales: 8900, stock: 500,
    color: '#3498db',
    images: [],
    desc: '【舒适百搭】100%优质长绒棉 | 精梳工艺 | 不起球不缩水 | 多色可选 | 透气吸汗 | S-3XL码全',
    specs: '材质：100%棉 | 领型：圆领 | 适用季节：夏季 | 风格：休闲'
  },
  {
    id: 6, categoryId: 2,
    name: '碎花连衣裙 女士春夏新款',
    price: 299, originalPrice: 599,
    sales: 4320, stock: 300,
    color: '#e84393',
    images: [],
    desc: '【清新优雅】碎花印花 | V领设计 | 收腰显瘦 | A字裙摆 | 雪纺面料 | 适合通勤约会',
    specs: '材质：雪纺 | 裙长：中长裙 | 袖型：泡泡袖 | 适用季节：春夏'
  },
  {
    id: 7, categoryId: 2,
    name: '商务休闲修身西装外套',
    price: 599, originalPrice: 1299,
    sales: 1670, stock: 80,
    color: '#2d3436',
    images: [],
    desc: '【干练有型】TR混纺面料 | 微弹舒适 | 抗皱免烫 | 单排两扣 | 职场通勤首选',
    specs: '材质：TR混纺 | 版型：修身 | 领型：平驳领 | 适用季节：春秋'
  },
  {
    id: 8, categoryId: 2,
    name: '透气运动跑鞋 情侣款',
    price: 399, originalPrice: 699,
    sales: 7800, stock: 400,
    color: '#2ecc71',
    images: [],
    desc: '【轻盈畅跑】飞织透气鞋面 | 爆米花中底 | 橡胶防滑大底 | 袜套式设计 | 运动休闲两穿',
    specs: '鞋面材质：飞织 | 鞋底材质：橡胶+EVA | 闭合方式：系带 | 适用场景：跑步/日常'
  },

  // ---- 食品生鲜 ----
  {
    id: 9, categoryId: 3,
    name: '混合坚果礼盒 每日坚果 750g',
    price: 99, originalPrice: 169,
    sales: 15600, stock: 800,
    color: '#e67e22',
    images: [],
    desc: '【营养健康】6种坚果+3种果干 | 独立小包 | 无添加防腐剂 | 原味烘焙 | 年货送礼必备',
    specs: '净含量：750g (25g×30包) | 储存：阴凉干燥处 | 保质期：240天 | 配料：核桃/腰果/巴旦木等'
  },
  {
    id: 10, categoryId: 3,
    name: '云南普洱茶饼 古树生普 357g',
    price: 268, originalPrice: 399,
    sales: 4320, stock: 150,
    color: '#6d4c41',
    images: [],
    desc: '【经典传承】古树茶园 | 传统手工石磨压制 | 条索肥壮 | 回甘生津 | 越陈越香 | 附收藏证书',
    specs: '净含量：357g | 年份：2024年春茶 | 产地：云南西双版纳 | 储存：通风干燥避光'
  },
  {
    id: 11, categoryId: 3,
    name: '进口牛排套餐 澳洲谷饲 10片装',
    price: 199, originalPrice: 359,
    sales: 8900, stock: 300,
    color: '#c0392b',
    images: [],
    desc: '【鲜嫩多汁】澳洲谷饲100天 | 原切无拼接 | 顺丰冷链 | 送黑胡椒酱+黄油 | 家庭西餐必备',
    specs: '净含量：约1500g(10片) | 原料：澳洲谷饲安格斯 | 储存：-18℃冷冻 | 保质期：12个月'
  },

  // ---- 家居家装 ----
  {
    id: 12, categoryId: 4,
    name: '北欧简约落地灯 客厅卧室立式台灯',
    price: 299, originalPrice: 499,
    sales: 3200, stock: 180,
    color: '#dfe6e9',
    images: [],
    desc: '【温馨照明】北欧简约设计 | 金属灯杆+布艺灯罩 | 三档调光 | E27通用螺口 | 遥控定时 | 高度165cm',
    specs: '材质：金属+布艺 | 功率：LED 12W | 色温：3000K暖光 | 控制：遥控/脚踩开关'
  },
  {
    id: 13, categoryId: 4,
    name: '乳胶记忆棉枕头 护颈助睡眠',
    price: 159, originalPrice: 299,
    sales: 12300, stock: 600,
    color: '#81ecec',
    images: [],
    desc: '【呵护颈椎】天然乳胶+记忆棉 | 人体工学曲线 | 透气蜂窝结构 | 可拆洗枕套 | 高低两用',
    specs: '材质：天然乳胶+记忆棉 | 尺寸：60×40×12/10cm | 密度：45D | 适用睡姿：仰睡/侧睡'
  },
  {
    id: 14, categoryId: 4,
    name: '不锈钢保温壶 家用大容量 2L',
    price: 99, originalPrice: 169,
    sales: 6700, stock: 350,
    color: '#dfe6e9',
    images: [],
    desc: '【长效保温】316不锈钢内胆 | 24小时保温保冷 | 一键出水 | 大容量2L | 食品级硅胶密封圈',
    specs: '材质：316不锈钢+PP外壳 | 容量：2L | 保温时效：24h≥60℃ | 口径：广口易清洗'
  },

  // ---- 美妆护肤 ----
  {
    id: 15, categoryId: 5,
    name: '玻尿酸补水面膜 28片装',
    price: 89, originalPrice: 169,
    sales: 23400, stock: 900,
    color: '#a29bfe',
    images: [],
    desc: '【水润透亮】三重玻尿酸 | 轻薄蚕丝膜布 | 深层补水 | 舒缓修护 | 适合所有肤质 | 28天焕肤计划',
    specs: '规格：25ml×28片 | 主要成分：玻尿酸/烟酰胺/神经酰胺 | 保质期：3年 | 适用肤质：所有肤质'
  },
  {
    id: 16, categoryId: 5,
    name: '氨基酸洁面乳 温和不紧绷',
    price: 69, originalPrice: 129,
    sales: 18700, stock: 700,
    color: '#fd79a8',
    images: [],
    desc: '【温和清洁】氨基酸表活 | 弱酸性配方 | 泡沫绵密 | 不紧绷不假滑 | 敏感肌适用 | 150g大容量',
    specs: '净含量：150g | 主要成分：氨基酸/甘油/神经酰胺 | 适合肤质：所有肤质(尤其敏感肌) | pH值：5.5'
  },
  {
    id: 17, categoryId: 5,
    name: '防晒霜 SPF50+ 清爽不油腻',
    price: 129, originalPrice: 199,
    sales: 15600, stock: 500,
    color: '#ffeaa7',
    images: [],
    desc: '【清爽防护】SPF50+ PA++++ | 水感轻薄质地 | 不假白不搓泥 | 养肤成分 | 面部身体两用',
    specs: '规格：50ml | 防晒指数：SPF50+ PA++++ | 质地：乳液 | 适用：面部+身体'
  },

  // ---- 运动户外 ----
  {
    id: 18, categoryId: 6,
    name: '加厚防滑瑜伽垫 NBR材质',
    price: 79, originalPrice: 149,
    sales: 9800, stock: 600,
    color: '#55efc4',
    images: [],
    desc: '【舒适运动】NBR环保材质 | 10mm加厚 | 双面防滑纹理 | 抗撕裂 | 附收纳绑带 | 183×61cm',
    specs: '材质：NBR | 尺寸：183×61cm | 厚度：10mm | 重量：约0.9kg'
  },
  {
    id: 19, categoryId: 6,
    name: '超轻碳素羽毛球拍 对装',
    price: 149, originalPrice: 299,
    sales: 6700, stock: 220,
    color: '#81ecec',
    images: [],
    desc: '【轻盈挥拍】碳素纤维拍框 | 重量仅85g | 高弹中杆 | 减震手柄 | 含拍套+羽毛球3只',
    specs: '材质：碳素纤维 | 重量：85g±3g | 长度：675mm | 套装：2支装'
  },
  {
    id: 20, categoryId: 6,
    name: '大容量运动水壶 750ml',
    price: 89, originalPrice: 129,
    sales: 11200, stock: 430,
    color: '#74b9ff',
    images: [],
    desc: '【畅快补水】Tritan材质 | 安全无味 | 弹盖设计 | 单手开合 | 防漏锁扣 | 750ml大容量',
    specs: '材质：Tritan（不含BPA）| 容量：750ml | 耐温：-10℃~96℃ | 口径：宽口易清洗'
  },

  // ---- 图书文具 ----
  {
    id: 21, categoryId: 7,
    name: '《思考的艺术》精装典藏版',
    price: 68, originalPrice: 98,
    sales: 23400, stock: 800,
    color: '#b2bec3',
    images: [],
    desc: '【现象级畅销书】批判性思维经典著作 | 从逻辑到创造 | 重新审视思维方式 | 精装硬壳典藏',
    specs: '作者：文森特·赖安·拉吉罗 | 出版社：机械工业出版社 | 装帧：精装 | 页数：340页'
  },
  {
    id: 22, categoryId: 7,
    name: '复古牛皮笔记本 A5手账本',
    price: 49, originalPrice: 89,
    sales: 5600, stock: 300,
    color: '#cd6133',
    images: [],
    desc: '【文艺手账】头层牛皮封面 | 米黄道林纸 | 192页可180°平摊 | 书签绳+绑带 | A5便携尺寸',
    specs: '尺寸：A5(148×210mm) | 封面：牛皮 | 内页：80g道林纸 | 页数：192页'
  },

  // ---- 母婴玩具 ----
  {
    id: 23, categoryId: 8,
    name: '婴儿纯棉连体衣 新生儿款',
    price: 79, originalPrice: 139,
    sales: 6700, stock: 380,
    color: '#fab1a0',
    images: [],
    desc: '【柔软呵护】A类纯棉 | 无荧光剂 | 按扣设计 | 方便穿脱 | 0-12个月可选 | 多色多款',
    specs: '材质：100%棉 A类 | 适用：0-12个月 | 款式：连体衣 | 安全标准：GB31701 A类'
  },
  {
    id: 24, categoryId: 8,
    name: '儿童积木拼装玩具 100粒',
    price: 129, originalPrice: 199,
    sales: 8900, stock: 500,
    color: '#f9ca24',
    images: [],
    desc: '【创意无限】大颗粒积木 | ABS安全材质 | 光滑无毛刺 | 100粒桶装 | 兼容主流积木品牌',
    specs: '材质：ABS塑料 | 颗粒数：100粒 | 适用年龄：3岁以上 | 含收纳桶'
  }
];

/* ========== 工具方法 ========== */

/** 根据ID获取商品 */
function getProductById(id) {
  return products.find(p => p.id === parseInt(id)) || null;
}

/** 根据分类ID获取商品列表 */
function getProductsByCategory(categoryId) {
  return products.filter(p => p.categoryId === categoryId);
}

/** 搜索商品 */
function searchProducts(keyword) {
  if (!keyword || keyword.trim() === '') return [];
  const kw = keyword.trim().toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(kw) ||
    p.desc.toLowerCase().includes(kw) ||
    categories.some(c => c.id === p.categoryId && c.name.includes(kw))
  );
}

/** 获取热销商品 (按销量排序) */
function getHotProducts(limit = 8) {
  return [...products].sort((a, b) => b.sales - a.sales).slice(0, limit);
}

/** 获取推荐商品 */
function getRecommendProducts(limit = 6) {
  return [...products].sort(() => 0.5 - Math.random()).slice(0, limit);
}

module.exports = {
  banners,
  categories,
  products,
  getProductById,
  getProductsByCategory,
  searchProducts,
  getHotProducts,
  getRecommendProducts
};