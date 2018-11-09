$(function(){
  
  
  render();

  function render(){
    $.ajax({
      type:"get",
      url:"http://127.0.0.1:9090/api/getsitenav",
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr=template("linkTmp",info);
        $(".link").html(htmlStr);
      }
    })

  }
})