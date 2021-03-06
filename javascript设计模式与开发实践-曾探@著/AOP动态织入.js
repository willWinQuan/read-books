Function.prototype.before=function(beforefn){
	var _self=this;//保存原函数的引用
	return function(){//返回包含了原函数和新函数的‘代理’函数
		beforefn.apply(this,arguments);//执行新函数，修正this
		return _self.apply(this,arguments);//执行原函数
	}
};

Function.prototype.after=function(afterfn){
	var _self=this;//保存原函数的引用
	return function(){//返回包含了原函数和新函数的‘代理’函数
		var ret=_self.apply(this,arguments);
		afterfn.apply(this,arguments);//执行新函数，修正this
		return ret;
	}
};

var func=function(){
	console.log(2)
}

func=func.before(function(){
	console.log(1)
}).after(function(){
	console.log(3)
})

func();