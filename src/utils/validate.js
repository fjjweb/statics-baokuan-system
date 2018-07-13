/**
 * Created by Administrator on 2018/6/26 0026.
 */
export default{
  IsNum(num){
    var reg =new RegExp("^[0-9]*$")
    return reg.test(num);
  },
}
