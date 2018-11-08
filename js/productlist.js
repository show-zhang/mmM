$(function(){
  //设置三级标题
  // var category=getSearch("category");
  // $("#category").text(category);
  
  //分类id
  var categoryId=getSearch("categoryId");
  // console.log(categoryId);
  var pageid=getSearch("pageid");
  var categoryName='';//用于存放三级分类名
  //定义一个对象
  var obj={};//用来存放分页总数，模板需要用对象

  //根据分类的id获取分类的名称
  $.ajax({
    type:"get",
    url:"http://127.0.0.1:9090/api/getcategorybyid?",
    data:{
      categoryid:categoryId
    },
    dataType:"json",
    success:function(info){
      // console.log(info);
      var htmlStr=template("categoryTmp",info);
      $(".productlist_title").html(htmlStr);
      categoryName=info.result[0].category;
      // console.log(categoryName);
      
    }
  });
 
  
  render();
  renderPage();
  // var htmlStr3=template("selectTmp2",obj);
  // $("#selectPage").html(htmlStr3);
 //跳出，让外界函数可以调用
  // return obj.pages;

  //发送请求,获取产品页面
  function render(pageid){
    $.ajax({
      type:"get",
      url:"http://127.0.0.1:9090/api/getproductlist?",
      data:{
        pageid:pageid||1,
        categoryid:categoryId
      },
      dataType:"json",
      success:function(info){
        //给info添加categoryName用于渲染模板
        info.result.forEach(function(v,i){
            v.categoryName=categoryName;
        })
        
        console.log(info);

        // 渲染产品页面
        var htmlStr=template("productlistTmp",info);
        $(".productlist_List").html(htmlStr);
         // 先计算分页总页数 再渲染选择器
         var pages=Math.ceil(info.totalCount/info.pagesize);
         // console.log(pages);
         obj.pages=pages;//存放到对象中
         console.log(obj); 

      }
    });  

  }
  // 渲染分页选择器
  function renderPage(){
    $.ajax({
      type:"get",
      url:"http://127.0.0.1:9090/api/getproductlist?",
      data:{
        pageid:pageid||"1",
        categoryid:categoryId
      },
      dataType:"json",
      success:function(info){
        
        var htmlStr2=template("selectTmp",obj);
        $("#selectPage").html(htmlStr2);
 
      }
    });  
  }


  //点击上一页进行渲染

  $(".pre_btn").click(function(){
    
    pageid--;
    // console.log(pageid);
  
    // if(pageid<1){
    //   pageid=1;
    //   render(pageid);
    // $("#myselect").val(pageid);
    // }else{
    //   render(pageid);
    //   //修改选择器的值
    //   $("#myselect").val(pageid);
    // }
     
    
      if(pageid<1){
        pageid=1;
      }
      //根据 pageid重新渲染
      render(pageid);
      //修改选择器的值
     $("#myselect").val(pageid);
    
  })

  //点击下一页进行渲染
  $(".next_btn").click(function(){
    pageid++;
    // console.log(pageid);
  
    // if(pageid >= obj.pages){
    //   pageid=obj.pages
    //   render(pageid);
    // $("#myselect").val(pageid);
    // }else{
    //   render(pageid);
    //     //修改选择器的值
    // $("#myselect").val(pageid);
    // }

     
    //根据 pageid重新渲染
    if(pageid >= obj.pages){
      pageid=obj.pages;
    }
    // 渲染分页
    render(pageid);
    //修改选择器的值
    $("#myselect").val(pageid);
    
  })

  //根据选择器进行分页渲染

  $("#selectPage").on("change","#myselect",function(){
    // console.log(1);
    console.log($(this).children('option:selected').val()); 
    pageid=$(this).children('option:selected').val();
    render(pageid);
  })
  // $("#myselect").change(function(){
  //   console.log(1);
    
  //   alert($(this).children('option:selected').val()); 
  // })
})