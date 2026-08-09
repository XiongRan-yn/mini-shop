/**消费统计页面*/
// require导入工具模块util.js里面的三个工具函数
// formatPrice：金额格式化，数字转保留两位小数字符串，例 120 → "120.00"
// formatTime：时间格式化，把ISO时间字符串转 YYYY‑MM‑DD HH:mm
// getOrderStatusText：把订单状态码翻译成中文文本，如 completed → "已完成"
const { formatPrice, formatTime, getOrderStatusText } = require('../../utils/util');

Page({
  // 页面初始数据，wxml可以直接读取这里的变量
  data:{
    totalSpend:0,      // 数字类型，所有有效订单实际消费总和（单位元）
    orderCount:0,      // 数字类型，有效支付订单的个数
    saveMoney:0,       // 数字类型，全部订单优惠节省总金额
    recentOrderList:[] // 数组，存放处理过后最近订单，供wxml循环渲染
  },

  /**
   * onShow：页面生命周期，**每次页面显示都会执行**
   * 场景：第一次打开页面、从订单详情返回这个页面、切tab回到页面，都会触发
   * 对比 onLoad：页面仅第一次打开执行一次，返回页面不会触发，统计页面不适合用onLoad
   */
  onShow(){
    this.calcStatistics(); //调用统计函数，刷新全部统计数据，保证看到的是最新订单
    // 兼容自定义tabBar组件，把tabBar选中下标设置为3（我的页面tab）
    if(typeof this.getTabBar === 'function'){
      const tabBar = this.getTabBar();
      if(tabBar) tabBar.setData({selected:3});
    }
  },

  /**
   * calcStatistics() 核心统计逻辑函数
   * 所有读取存储、过滤订单、累加金额、加工订单数据全部在这里完成
   */
  calcStatistics(){
    // 读取本地缓存订单列表，如果storage为空，赋值空数组，避免报错
    const orderList = wx.getStorageSync('orderList') || [];
    let totalSpend = 0;
    let saveMoney = 0;

    // --------------------------①过滤有效订单--------------------------
    // filter：数组过滤，返回符合条件的新数组 validOrders
    // 业务规则：只统计已经付款的订单
    // pending_shipment：待发货；pending_receipt：待收货；completed：已完成
    // pending_payment（待付款）没有付钱，不计入消费统计
    const validOrders = orderList.filter(o=>{
      return ['pending_shipment','pending_receipt','completed'].includes(o.status);
    });

    // --------------------------②循环累加金额--------------------------
    validOrders.forEach(o=>{
      // storage读取出来的数据有可能是字符串，Number()强制转为数字，防止字符串拼接bug
      totalSpend += Number(o.totalPrice);
      // o.discount 订单优惠金额；如果订单没有discount字段，取0，避免得到NaN
      saveMoney += Number(o.discount || 0);
    });

    // --------------------------③处理最近订单列表--------------------------
    // [...orderList] 数组展开拷贝，复制一份新数组；不能直接sort原orderList，sort会修改原数组，会污染storage读取出来的数据
    // sort排序：new Date(b.createTime) - new Date(a.createTime) → 时间倒序，最新的订单排在数组前面
    const allSorted = [...orderList].sort((a,b)=>new Date(b.createTime)-new Date(a.createTime));
    // slice(0,5)截取数组前5项，只展示最近5条订单
    const recent = allSorted.slice(0,5).map(item=>{
      // map遍历每一条订单，加工字段，返回新对象
      return {
        ...item, //展开原始订单全部属性，保留id、orderNo、totalPrice等原有字段
        createTimeStr: formatTime(item.createTime,'YYYY‑MM‑DD HH:mm'), //预处理格式化时间，交给wxml直接渲染
        statusText:getOrderStatusText(item.status) //预处理中文状态文本
      }
    });

    // --------------------------④把计算结果赋值到data，视图自动更新--------------------------
    this.setData({
      totalSpend: totalSpend,
      orderCount: validOrders.length, //数组length拿到有效订单数量
      saveMoney: saveMoney,
      recentOrderList: recent
    })
  },

  /**
   * 订单列表点击事件：跳转到订单详情页
   * e：事件对象
   * e.currentTarget.dataset.orderNo：读取wxml标签上 data‑order‑no 绑定的订单号
   * wx.navigateTo：保留当前页面，跳转到新页面，url拼接订单号作为页面参数传给订单详情页
   */
  goOrderDetail(e){
    const no = e.currentTarget.dataset.orderNo;
    wx.navigateTo({url:`/pages/order-detail/index?orderNo=${no}`})
  }
})
