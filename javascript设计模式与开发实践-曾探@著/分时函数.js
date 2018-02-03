/*
 *分时函数，如：分时dom操作生成元素
 * 参数 
 * ary:创建节点需要的数据；
 * fn:封装了创建节点逻辑的函数；
 * count：每一批创建的节点数量;
 * time:分批执行的时间间隔;
 * ***/

var timeChunk=function(ary,fn,count,time){
	var obj,
	    t;
	
	var  len=ary.length;
	var start=function(){
		for (var i=0;i<Math.min(count || 1,ary.length);i++) {
			var obj=ary.shift();
			fn(obj);
		}
	};
	
	return function(){
		t=setInterval(function(){
			if(ary.length===0){//如果全部节点都已经被创建好
				return clearInterval(t);
			}
			start();
		},time);//分批执行的时间间隔
	};
};


//test

var ary=[];

for (var i=0;i<50;i++) {
	ary.push(i);
};

var renderFriendList=timeChunk(ary,function(n){
	var div=document.createElement('div');
	div.innerHTML=n;
	document.body.appendChild(div);
},10,250);

/****
//for (var i=1;i<1000000;i++) {
//	var div=document.createElement('div');
//	div.innerHTML=i;
//	document.body.appendChild(div);
//};
***/


renderFriendList();

