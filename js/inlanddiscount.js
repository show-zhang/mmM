$(function(){
  console.log(1);
  
  $.ajax({
    type:"get",
    url:"http://127.0.0.1:9090/api/getinlanddiscount",
    dataType:"json",
    success:function(info){
      console.log(info);
      var htmlStr=template("recommenTmp",info);
      $(".recommen_List").html(htmlStr);
    }
  })
})