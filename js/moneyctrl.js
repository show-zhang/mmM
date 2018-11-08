$(function(){
   var index=0;
   var maxPage=1;
   render();//一进入就渲染
  // 折扣商品列表信息,和首页相同

  function render(index){
    $.ajax({
      type:"get",
      url:"http://127.0.0.1:9090/api/getmoneyctrl",
      data:{
        pageid:index   
      },
      dataType:"json",
      success:function(info){
        // console.log(info);
        var htmlStr=template("recommenTmp",info);
        $(".recommen_List").html(htmlStr);
        
         maxPage=Math.ceil(info.totalCount/info.pagesize);
         info.arr=[];
         info.arr.length=maxPage;
         info.index=index;

         var htmlStr2=template("selectTmp",info);
         $("#myselect").html(htmlStr2);
        
      }
    });

  }


  //点击上一页进行渲染

  $(".pre_btn").click(function(){   
    index--;
      if(index<0){
        index=0;
      }
      //根据 pageid重新渲染
      render(index);
      //修改选择器的值
    //  $("#myselect").val(index);
    
  })

  //点击下一页进行渲染
  $(".next_btn").click(function(){
    index++;
    //根据 index重新渲染
    if(index >=maxPage-1){
      index=maxPage-1;
    }   
    // 渲染分页
    render(index);
    //修改选择器的值  已经修改 
    // $("#myselect").val(index);
    
  })

  //根据选择器进行分页渲染

  $("#myselect").on("change",function(){
    index=$(this).val();
    console.log(index);
   
    render(index);
  })

})