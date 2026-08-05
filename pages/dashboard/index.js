/**消费统计页面*/
const { formatPrice, formatTime, getOrderStatusText } = require('../../utils/util');

Page({
  data:{
    totalSpend:0,
    orderCount:0,
    saveMoney:0,
    recentOrderList:[]
  },

  onShow(){
    this.calcStatistics();
    if(typeof this.getTabBar === 'function'){
      const tabBar = this.getTabBar();
      if(tabBar) tabBar.setData({selected:3});
    }
  },

  calcStatistics(){
    const orderList = wx.getStorageSync('orderList') || [];
    let totalSpend = 0;
    let saveMoney = 0;

    //只统计已支付完成的订单：pending_shipment / pending_receipt / completed
    const validOrders = orderList.filter(o=>{
      return ['pending_shipment','pending_receipt','completed'].includes(o.status);
    });

    validOrders.forEach(o=>{
      totalSpend += Number(o.totalPrice);
      //模拟优惠节省，demo写死，真实项目可取自订单discount字段
      saveMoney += Number(o.discount || 0);
    });

    //全部订单倒序取前5条作为最近订单
    const allSorted = [...orderList].sort((a,b)=>new Date(b.createTime)-new Date(a.createTime));
    const recent = allSorted.slice(0,5).map(item=>{
      return {
        ...item,
        createTimeStr: formatTime(item.createTime,'YYYY-MM-DD HH:mm'),
        statusText:getOrderStatusText(item.status)
      }
    });

    this.setData({
      totalSpend: totalSpend,
      orderCount: validOrders.length,
      saveMoney: saveMoney,
      recentOrderList: recent
    })
  },

  goOrderDetail(e){
    const no = e.currentTarget.dataset.orderNo;
    wx.navigateTo({url:`/pages/order-detail/index?orderNo=${no}`})
  }
})
