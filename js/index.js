$(function(){

  //发送ajax请求，获取nav内容
  $.ajax({
    type:"get",
    url:"http://127.0.0.1:9090/api/getindexmenu",
    dataType:"json",
    success:function(info){
      console.log(info);
      var htmlStr=template("navTmp",info);
      $(".mmM_nav ul").html(htmlStr);
    }
  });


  //发送ajax请求，获取超值折扣推荐内容
  $.ajax({
    type:"get",
    url:"http://127.0.0.1:9090/api/getmoneyctrl",
    dataType:"json",
    success:function(info){
      console.log(info);
      var htmlStr=template("recommenTmp",info);
      $(".recommen_List").html(htmlStr);
    }
  });

  // 点击更多,出现第三行nav
  // 初始化：一开始第三行就有点击事件
  // .addClass
  
  $(".mmM_nav ul").on("click","#more",function(){
    console.log("more");
    
    $(".mmM_nav ul li:nth-child(n+9)").toggleClass("active");
  })
 

})