$(function(){
  // console.log(1);
  setTimeout(function(){
     render();
  },3000)
  function render(){

    $.ajax({
      type:"get",
      url:"http://127.0.0.1:9090/api/getinlanddiscount",
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr=template("recommenTmp",info);
        $(".recommen_product").html(htmlStr);
      }
    });
  }
  
})