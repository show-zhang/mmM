$(function(){


 
  //获取滚动标题
  $.ajax({
    type:"get",
    url:"http://127.0.0.1:9090/api/getbaicaijiatitle",
    dataType:"json",
    success:function(info){
      //  console.log(info);
       var htmlStr=template("titleTmp",info);
       $("#wapper ul").html(htmlStr);
      
      //  获取搜索按钮的宽度
      //  console.log( $(".search_btn").outerWidth());//38
      //  console.log( $(".search_btn").width()+16);//width是22px  padding：8不被包含
       
       // 计算ul的宽度
       var ulWidth= $(".search_btn").outerWidth();
      //  遍历获取所有li的宽度。相加就是ul的宽度
       $('#wapper ul li').each(function(index,ele){
        ulWidth+=$(ele).width();
      })
      //设置给ul宽度
      $("#wapper ul").width(++ulWidth);
      console.log( $("#wapper ul").width());

      // 配置IScroll
      var myScroll = new IScroll('#wapper', {
        mouseWheel: true,
        // scrollbars: true,
        scrollX : true,
        // scrollY : false
      });
      
     }
  });
 

    //  延时加载
    setTimeout(function(){
      render();//一进入就渲染
      // 懒加载的图片必须和ul并列，放在一个父元素内
    },2000);
 
  //获取产品列表
  function render(id){
    $.ajax({
      type:"get",
      url:"http://127.0.0.1:9090/api/getbaicaijiaproduct",
      data:{
        titleid:id||12
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr=template("productTmp",info);
        $(".product_list .product").html(htmlStr);
      }
    });
  
  }
  // 给标题中的分类添加点击事件
 $("#wapper ul").on("click","li",function(){

   var id=$(this).data("titleid");
   render(id);
 });

})