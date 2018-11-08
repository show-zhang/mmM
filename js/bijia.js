$(function(){
  var categoryName=getSearch("categoryName");
  $("#categoryName").text(categoryName);
  console.log(categoryName);
  
  var productid=getSearch("productId");
  console.log(productid);
  
   //根据根据商品id 获取该商品的评论信息
   $.ajax({
    type:"get",
    url:"http://127.0.0.1:9090/api/getproduct",
    data:{
      productid:productid
    },
    dataType:"json",
    success:function(info){
      console.log(info);
      var htmlStr=template("productTmp",info);
      $(".productDesc").html(htmlStr);
    }
  });
  //根据根据商品id 获取该商品的评论信息
  $.ajax({
    type:"get",
    url:"http://127.0.0.1:9090/api/getproductcom",
    data:{
      productid:productid
    },
    dataType:"json",
    success:function(info){
      console.log(info);
      var htmlStr=template("commentTmp",info);
      $(".comment ul").html(htmlStr);
    }
  })

})