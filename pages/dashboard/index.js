/**消费统计页面*/
// 导入工具函数：价格格式化、时间格式化、订单状态文本转换
const { formatPrice, formatTime, getOrderStatusText } = require('../../utils/util');

Page({
  /**页面初始数据*/
  data:{
    totalSpend:0,      // 实际消费总金额（数字，单位元）
    orderCount:0,      // 有效已支付订单数量
    saveMoney:0,       // 优惠总共省下多少钱
    showTotalSpend:"", // 格式化后消费总额（给视图渲染）
    showSaveMoney:"",  // 格式化后优惠节省（给视图渲染）
    recentOrderList:[] // 最近订单列表（用于页面渲染）
  },

  /**页面每次显示都会触发（从别的页面返回本页面也会执行）*/
  onShow(){
    this.calcStatistics();
    if(typeof this.getTabBar === 'function'){
      const tabBar = this.getTabBar();
      if(tabBar) tabBar.setData({selected:3});
    }
  },

  /**核心统计计算函数：所有统计逻辑在这里 */
  calcStatistics(){
    const orderList = wx.getStorageSync('orderList') || [];
    // 读取退款列表
    const refundList = wx.getStorageSync('refundList') || [];
    // 拿到所有已经提交退款的订单号集合
    const refundOrderNos = new Set(refundList.map(r => r.orderNo));

    let totalSpend = 0;
    let saveMoney = 0;

    // ①筛选有效订单：已支付 并且 没有提交退款
    const validOrders = orderList.filter(o=>{
      const isPaid = ['pending_shipment','pending_receipt','completed'].includes(o.status);
      const isRefunded = refundOrderNos.has(o.orderNo);
      return isPaid && !isRefunded;
    });

    // ②累加计算总消费、总优惠
    validOrders.forEach(o=>{
      totalSpend += Number(o.totalPrice);
      saveMoney += Number(o.discount || 0);
    });

    // ③最近订单：同样使用过滤后的有效订单，倒序取前5
    const allSorted = [...validOrders].sort((a,b)=>new Date(b.createTime)-new Date(a.createTime));
    const recent = allSorted.slice(0,5).map(item=>{
      return {
        ...item,
        createTimeStr: formatTime(item.createTime,'YYYY-MM-DD HH:mm'),
        statusText:getOrderStatusText(item.status),
        showTotalPrice: formatPrice(Number(item.totalPrice))
      }
    });

    // ④赋值data
    this.setData({
      totalSpend: totalSpend,
      orderCount: validOrders.length,
      saveMoney: saveMoney,
      showTotalSpend: formatPrice(totalSpend),
      showSaveMoney: formatPrice(saveMoney),
      recentOrderList: recent
    })
  },

  /**点击订单跳转到订单详情*/
  goOrderDetail(e){
    const no = e.currentTarget.dataset.orderNo;
    wx.navigateTo({url:`/pages/order-detail/index?orderNo=${no}`})
  }
})
