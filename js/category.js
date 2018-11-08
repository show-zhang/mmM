$(function(){

  //获取大标题列表
  $.ajax({
    type:"get",
    url:"http://127.0.0.1:9090/api/getcategorytitle",
    dataType:"json",
    success:function(info){
      console.log(info);
      var htmlStr=template("titleTmp",info);
      $(".category_title").html(htmlStr);
    }
  })

  //添加点击事件。发送请求获取下方标题
  $(".category_title").on("click","li",function(){
    var titleid=$(this).data("id");
    // console.log(titleid);
    
    $(this).find("ul").toggleClass("current");
    //清除其他兄弟节点的类名,排他
    $(this).siblings().find("ul").removeClass("current");
    
    $.ajax({
      type:"get",
      url:"http://127.0.0.1:9090/api/getcategory",
     data:{
      titleid:titleid
     },
     dataType:"json",
     success:function(info){
        console.log(info);
        var htmlStr=template("contentTmp",info);
        $(" .category_content").html(htmlStr);
     }
    })
   
  })
})