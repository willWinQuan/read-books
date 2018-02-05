
Function.prototype.before=function(beforefn){
	var _self=this;
	return function(){
		if(beforefn.apply(this,arguments)===false){
			//beforefn返回false的情况直接return，不再执行后面的原函数
			return;
		};
		return _self.apply(this,arguments);
	};
};

var validata=function(){
	if(username.value===''){
		alert('用户名不能为空');
		return false;
	};
	if(password.value===''){
		alert('密码不能为空');
		return false;
	}
};

var formSubmit=function(){
	var param={
		username:username.value,
		password:password.value
	};
	var url=''
	ajax(url,param);
};

formSubmit=formSubmit.before(validata);

submitBtn.onclick=function(){
	formSubmit();
}
