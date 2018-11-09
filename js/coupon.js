$(function(){
 
  //发送请求获取标题
  $.ajax({
    type:"get",
    url:"http://127.0.0.1:9090/api/getcoupon",
    dataType:"json",
    success:function(info){
       console.log(info);
       var htmlStr=template("titleTmp",info);
       $(".coupon_title ul").html(htmlStr);
    }
  })
})