/**
 * Created by fengjj on 2018/6/6 .
 */
export default {
  /*
   时间格式化
   */
  formatDateTime_day (date) {
    var date = new Date(date);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
  },
  /*
   获取当前的时间
   */
  getCurrentTime(){
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var min = date.getMinutes();
    min = min < 10 ? ('0' + min) : min;
    var sec = date.getSeconds();
    sec = sec < 10 ? ('0' + sec) : sec;
    // return y + '-' + m + '-' + d + " " + h + ":" + min + ":" + sec;
    // return y + '-' + m + '-' + d;
    return m + '.' + d;
  },
  /*
   获取前几天的时间
   */
  getBeforeDate(n){
    var [n,d] = [n,new Date()];
    var [year,mon,day,h,min,sec] = [d.getFullYear(),d.getMonth() + 1,d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds()];
    h = h < 10 ? ('0' + h) : h;
    min = min < 10 ? ('0' + min) : min;
    sec = sec < 10 ? ('0' + sec) : sec;
    if (day <= n) {
      if (mon > 1) {
        mon = mon - 1;
      }
      else {
        year = year - 1;
        mon = 12;
      }
    }
    d.setDate(d.getDate() - n);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    mon = mon < 10 ? ('0' + mon) : mon;
    day = d.getDate();
    day = day < 10 ? ('0' + day) : day;
    h = d.getHours();
    h = h < 10 ? ('0' + h) : h;
    min = d.getMinutes();
    min = min < 10 ? ('0' + min) : min;
    sec = d.getSeconds();
    sec = sec < 10 ? ('0' + sec) : sec;
    // return year + "-" + mon+ "-" + day  + " "+h +":"+min+":"+sec;
    // return year + "-" + mon+ "-" + day  ;
    return mon + "." + day;
  },
  /*
   获取前几个月的时间
   */
  getPreMonthDay(monthNum)
  {
    var dateArr = this.formatDateTime_day(new Date()).split('-');
    var year = dateArr[0]; //获取当前日期的年份
    var month = dateArr[1]; //获取当前日期的月份
    var day = dateArr[2]; //获取当前日期的日
    var days = new Date(year,month,0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - monthNum;
    if (month2 <= 0) {
      year2 = parseInt(year2) - parseInt(month2 / 12 == 0 ? 1 : parseInt(month2) / 12);
      month2 = 12 - (Math.abs(month2) % 12);
    }
    var day2 = day;
    var days2 = new Date(year2,month2,0);
    days2 = days2.getDate();
    if (day2 > days2) {
      day2 = days2;
    }
    if (month2 < 10) {
      month2 = '0' + month2;
    }
    // return t2 = year2 + '-' + month2 + '-' + day2;
    return year2 + '年' + month2;

  },
  /*
   处理成前7天成为一个数组
   */
  getBeforeDateArr(){
    return [this.getBeforeDate(6),this.getBeforeDate(5),this.getBeforeDate(4),this.getBeforeDate(3),this.getBeforeDate(2),this.getBeforeDate(1),this.getCurrentTime()]
  },
  /*
   处理成前4周为一个数组
   */
  getBeforeWeekArr(){
    return [
      this.getBeforeDate(21) + "~" + this.getBeforeDate(27),
      this.getBeforeDate(14) + "~" + this.getBeforeDate(20),
      this.getBeforeDate(7) + "~" + this.getBeforeDate(13),
      this.getCurrentTime() + "~" + this.getBeforeDate(6)
    ]
  },
  /*
   处理成前6个月为一个数组
   */
  getPreMonthDayArr(){
    return [
      this.getPreMonthDay(5),
      this.getPreMonthDay(4),
      this.getPreMonthDay(3),
      this.getPreMonthDay(2),
      this.getPreMonthDay(1),
      this.getPreMonthDay(0),
    ]
  }
}

