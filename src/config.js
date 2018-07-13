/**
 * Created by Administrator on 2018/6/21 0021.
 */
// console.log("ENV",process.env.ENV);
//
//
if (process.env.NODE_ENV == 'development') {
  window.SETDOMAIN = 'cn'

}else if(process.env.NODE_ENV == 'production'){
  window.SETDOMAIN = 'com'
}
// window.SETDOMAIN = 'cn';
// document.domain = '99114.' + SETDOMAIN;
// /* 单品爆款 */
window.baokuanHOST = 'http://wk-singlegoods-api.99114.' + SETDOMAIN;
// 上传图片
window.uploadImgHOST = "http://plw-file.99114."+SETDOMAIN;
// 返回的图片地址
window.returnImgUrlHOST = "http://img.99114."+SETDOMAIN;


