$(function(){

   var id=getSearch("brandtitleid");
   console.log(id);
   
  $.ajax({
    type:"get",
    url:"http://127.0.0.1:9090/api/getbrand",
    data:{
      brandtitleid:id
    },
    dataType:"json",
    success:function(info){
        console.log(info);
        var htmlStr=template("brandTmp",info);
        $(".brand_List").html(htmlStr);
    }


  })
})