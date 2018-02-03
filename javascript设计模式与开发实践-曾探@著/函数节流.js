var throttle=function(fn,interval){
	var _self=fn,//保存需要被延迟执行的函数引用
	    timer,//定时器
	    firstTime=true;//是否第一次调用
	
	return function(){
		var args=arguments,
		   _me=this;
		
		if(firstTime){//如果是第一次调用，不需延迟执行
			_self.apply(_me,args);
			return firstTime=false;
		}
		if(timer){//如果定时器还在，说明前一次延迟执行还没有完成
			return false;
		}
		
		timer=setTimeout(function(){//延迟一段时间执行
			clearTimeout(timer);
			timer=null;
			_self.apply(_me,args);
		},interval || 500);
	};
};

window.onresize=throttle(function(){
	console.log(1);
},1000)

//window.onresize=function(){
//	console.log(2)
//}
