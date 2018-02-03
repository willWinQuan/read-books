
/*
 * 不需要用户一个个的订阅，只需订阅中介
 */

var Event=(function(){
	var clientList={},
	    listen,
	    trigger,
	    remove;
	    
	    listen=function(key,fn){
	    	if(!clientList[key]){
	    		clientList[key]=[];
	    	}
	    	clientList[key].push(fn);
	    };
	    
	    trigger=function(){
	    	var key=Array.prototype.shift.call(arguments),
	    	    fns=clientList[key];
	    	    if(!fns || fns.length===0){
	    	    	return false;
	    	    };
	    	    for (var i=0,fn;fn=fns[i++];) {
	    	    	fn.apply(this,arguments);
	    	    }
	    };
	    
	    remove=function(key,fn){
	    	var fns=clientList[key];
	    	if(!fns){
	    		return false;
	    	}
	    	if(!fn){
	    		fns && (fns.length=0);
	    	}else{
	    		for (var l=fns.length-1;l>=0;l--) {
	    			var _fn=fns[l];
	    			if(_fn===fn){
	    				fns.splice(l,1);
	    			}
	    		}
	    	}
	    };
	    
	    return {
	    	listen:listen,
	    	trigger:trigger,
	    	remove:remove
	    }
	
})();

 Event.listen('squareMeter88',function(price){ //小红订阅消息
 	 console.log('价格='+price);   
 })

Event.trigger('squareMeter88',200000);  //售楼处发布消息