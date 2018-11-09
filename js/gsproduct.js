$(function(){
  
  var obj_jd={};//存放渲染模板的对象
  var obj_hd={};
  var obj_all={};

  obj_all.areaName="全部价格";//给全部价格设计模板
  
  var shopid=0;
  var areaid=0;
  render(shopid, areaid);
   
  //发送请求，获取大标题地区

  // 此为获取京东下方的标题
  $.ajax({
    type:"get",
    url:"http://127.0.0.1:9090/api/getgsshop",
    dataType:"json",
    async: false,//将ajax设置为同步，默认是异步，否则数据不能同步到全局
    success:function(info){
      // console.log(info);
      obj_jd=info;//存放到对象中
      obj_jd.index=0;//设置下标值，用于后方选中li时进行判断
     
    }
  });
    // 此为获取华东下方的标题
  $.ajax({
    type:"get",
    url:"http://127.0.0.1:9090/api/getgsshoparea",
    data:{
      shopid:0,
      areaid:0
    },
    dataType:"json",
    async: false,//将ajax设置为同步，默认是异步，否则数据不能同步到全局
    success:function(info){
      // console.log(info);
      obj_hd=info;//存放到对象中
      obj_hd.index=0;//设置下标值，用于后方选中li时进行判断
    }
  });
  


  // 添加点击事件。点击地区，显示下方标题


  $(".category ul .jd").click(function(){
    // 模板渲染
      var htmlStr=template("shopTmp",obj_jd);
      $(".areaNav ul").html(htmlStr);
     //  显示下方下标题
    $(".areaNav").toggleClass("on");
    // console.log(obj_jd);
    
    
  })

  $(".category ul .hd").click(function(){
    // 模板渲染
      var htmlStr=template("areaTmp",obj_hd);
      $(".areaNav ul").html(htmlStr);
    //  显示下方下标题
      $(".areaNav").toggleClass("on");
      // console.log(obj_hd);
  })

  $(".category ul .all").click(function(){
    // 模板渲染
      var htmlStr=template("allTmp",obj_all);
      $(".areaNav ul").html(htmlStr);
     //  显示下方下标题
    $(".areaNav").toggleClass("on");
  })


  // 添加点击事件。点击下方标题。地区更改
   $(".areaNav ul").on("click","li",function(){
    //  添加选中。隐藏下方标题
    $(this).addClass("on").siblings().removeClass("on");
    $(".areaNav").toggleClass("on");

    //更改大标题的文本
    var area=$(this).text();
    var flaghd=$(this).hasClass("hd");//通过判断类名，确定给哪个大标题更改文本
    var flagjd=$(this).hasClass("jd");
    
    if(flagjd){
      $(".category ul li .jd span").text(area);
      obj_jd.index=$(this).index();
    }
    if(flaghd){
      $(".category ul li .hd span").text(area);
      obj_hd.index=$(this).index();//设置下标。添加on类名
    }
  
    console.log(obj_jd.index,obj_hd.index);
 

    //更新下方商品列表
  
   })


   //发送请求，获取下方商品内容

   $(".areaNav ul").on("click","li",function(){
    // href="http://127.0.0.1:9090/api/getgsproduct?shopid=2&areaid={{v.areaId}}"
  
     var flaghd=$(this).hasClass("hd");//通过判断类名，确定给哪个大标题更改文本
     var flagjd=$(this).hasClass("jd");
    
     if(flagjd){
      shopid=$(this).data("id");
      // console.log(shopid,areaid);
      render(shopid,areaid);
     }
    if(flaghd){
      areaid=$(this).data("id");
      // var areaid=$(this).data("id");
      // console.log(shopid,areaid); 
      render(shopid,areaid)
    }
    
  });

  function render(shopid,areaid){

    $.ajax({
      type:"get",
      url:"http://127.0.0.1:9090/api/getgsproduct",
      data:{
        shopid:shopid,
        areaid:areaid
      },
      dataType:"json",
      success:function(info){
        // console.log(info);
        var htmlStr=template("gsproductTmp",info);
        $(".gsproduct_list ul").html(htmlStr);
      }
    })
  }
   

   

})