
var event={
	clientList:[],
	listen:function(key,fn){
		
		if(!this.clientList[key]){
			this.clientList[key]=[];
		}
		this.clientList[key].push(fn);  //订阅的消息添加进缓存列表
	},
	
	trigger:function(){
		
		var key=Array.prototype.shift.call(arguments),  //(1)
		    fns=this.clientList[key];
		    
		    if(!fns || fns.length===0){
		    	return false;
		    };
		    
		    for (var i=0,fn;fn=fns[i++];) {
		    	fn.apply(this,arguments);   //(2) //arguments 是 trigger 时带上的参数
		    }
	},
	remove:function(key,fn){
		var fns=this.clientList[key];
		
		if(!fns){   //如果key对应的消息没有被人订阅，则直接返回
			return false;
		}
		if(!fn){  //如果没有传入具体的回调函数，表示需要取消key对应消息的所以订阅
			fns &&(fns.length=0);
		}else{
			for (var l=fns.length-1;l>=0;l--) { //反向遍历订阅的回调函数列表
				 var _fn=fns[l];
				 if(_fn===fn){
				 	 fns.splice(l,1);   //删除订阅者的回调函数
				 }
				
			}
		}
	}
	
};

//定义installEvent函数，这个函数可以给所有的对象都动态安装发布-订阅功能。
var installEvent=function(obj){
	for (var i in event) {
		obj[i]=event[i];
	}
};


//test
var salesOffices={};
installEvent(salesOffices);

salesOffices.listen('squareMeter88',fn1=function(price){ //小明订阅消息
	console.log('价格1='+price);
});

salesOffices.listen('squareMeter100',fn2=function(price){ //小红订阅消息
	console.log('价格2='+price);
});

salesOffices.trigger('squareMeter88',2000000); 
salesOffices.trigger('squareMeter100',3000000);

salesOffices.remove('squareMeter88',fn1);  //删除小明的订阅
salesOffices.trigger('squareMeter88',20000)


//登录模块订阅式刷新 

var login={};
installEvent(login);

var header=(function(){   //header模块
	  login.listen('loginSucc',function(data){
	  	console.log(123)
	  	   header.setAvatar(data.avatar);
	  });
	  return {
	  	setAvatar:function(data){
	  		console.log('设置header模块的头像');
	  	}
	  }
})();

var nav=(function(){
	  login.listen('loginSucc',function(data){
	  	nav.setAvatar(data.avatar);
	  });
	  return {
	  	setAvatar:function(avatar){
	  		console.log('设置nav模块的头像');
	  	}
	  }
})();

var address=(function(){
	login.listen('loginSucc',function(obj){
		address.refresh(obj);
	});
	return {
		refresh:function(avatar){
			console.log('刷新收货地址列表');
		}
	}
})();

var data={
	test:123
};
//var url='https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10';
//$.ajax(url,function(data){  //登录成功
	login.trigger('loginSucc',data);  //发布登录成功的消息
//})