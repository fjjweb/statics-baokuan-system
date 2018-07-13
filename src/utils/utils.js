/**
 * Created by Administrator on 2018/6/12 0012.
 */
export default {
  getCookieUsername(name) {
    var myCookies = (document.cookie).split(";");
    var postCookie = '';
    for (var i = 0; i < myCookies.length; i++) {
      var userNames = myCookies[i].split("=");
      if (userNames[0].replace(/(^\s*)|(\s*$)/g,"") === name) {
        postCookie = userNames[1];
      }
    }
    return postCookie
  }
}
