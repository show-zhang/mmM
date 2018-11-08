

  function getSearch(k){
    var str=location.search;
    str=decodeURI(str);
    str=str.slice(1);
    var arr=str.split("&");
    var obj={};
    arr.forEach(function(v,i){
    var key=v.split("=")[0];
    var value=v.split("=")[1];
     obj[key]=value;
    })
    // console.log(obj);
    return obj[k];
  }
  

  // var product=getSearch("category");
  // console.log(product);
  
