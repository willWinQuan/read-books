
var myImage=(function(src){
    console.log(src);
	return function(src){
		 var imgNode=document.createElement('img');
	     document.body.appendChild(imgNode);
		 imgNode.src=src;
	}
})();

var proxyImage=(function(){
	var img=new Image;
	img.onload=function(){
		var that=this;
		setTimeout(function(){//setTimeout 测试图片加载速度慢的情况
			   myImage(that.src);
		},2000)	
	};
	return function(src){
		   myImage('loading.gif');
		   img.src=src;
	}
})();

var imgsrc_array=['http://p2.so.qhimgs1.com/t014a0751046b4c2202.jpg','http://p2.so.qhimgs1.com/t014a0751046b4c2202.jpg','http://img1.3lian.com/2015/a1/84/d/95.jpg','http://img1.3lian.com/2015/a1/84/d/95.jpg']

	proxyImage('http://p2.so.qhimgs1.com/t014a0751046b4c2202.jpg');
	
