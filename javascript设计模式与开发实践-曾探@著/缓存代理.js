
/*
 * 缓存代理-把运算开销大的结果缓存，下次需要再得到这个结果就不用再运算一次
 * 算法缓存代理
 * ajax异步请求数据缓存 如：分页数据
 */

/**********************计算乘积************************/
var mult=function(){
	var a=1;
	for (var i=0,l=arguments.length;i<l;i++) {
		a=a*arguments[i];
	};
	return a;
};

/**************计算加和*****************/
var plus=function(){
	var a=0;
	for (var i=0,l=arguments.length;i<l;i++) {
		a=a+arguments[i];
	};
	return a;
};

/******************创建缓存代理的工厂*****************/
var createProxyFactory=function(fn){
	var cache={};
	return function(){
		var args=Array.prototype.join.call(arguments,',');
		if(args in cache){
			return cache[args];
		}
		return cache[args]=fn.apply(this,arguments);
	}
};

var proxyMult=createProxyFactory(mult),
    proxyPlus=createProxyFactory(plus);
    
    console.log(proxyMult(1,2,3,4));
    console.log(proxyMult(1,2,3,4));
    console.log(proxyPlus(1,2,3,4));
    console.log(proxyPlus(1,2,3,4));

