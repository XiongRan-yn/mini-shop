Page({
  data: {
    totalMoney: "0.00",
    orderCount: 0,
    saveMoney: "0.00",
    recentOrderList: []
  },
  onShow() {
    this.calcStatistics();
  },
  calcStatistics() {
    const orderList = wx.getStorageSync("orderList") || [];
    let totalMoney = 0;
    let saveMoney = 0;
    const orderCount = orderList.length;

    orderList.forEach(order => {
      totalMoney += Number(order.totalPrice || 0);
      saveMoney += Number(order.discountMoney || 0);
    });
    //取最新5条订单
    const recentOrderList = orderList.slice(-5).reverse();

    this.setData({
      totalMoney: totalMoney.toFixed(2),
      orderCount,
      saveMoney: saveMoney.toFixed(2),
      recentOrderList
    })
  },
  toOrderDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/order-detail/index?id=${id}`
    })
  }
})