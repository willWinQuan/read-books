
  var colorSelect=document.getElementById('colorSelect'),
      numberInput=document.getElementById('numberInput'),
      memorySelect=document.getElementById('memorySelect'),
      colorInfo=document.getElementById('colorInfo'),
      numberInfo=document.getElementById('numberInfo'),
      memoryInfo=document.getElementById('memoryInfo'),
      nextBtn=document.getElementById('nextBtn');
      
  var goods={
  	'red|32G':3,
  	'red|16G':0,
  	'blue|32G':1,
  	'bule|16G':6
  };
  
  var mediator=(function(){
  	return {
  		changed:function(obj){
  			var color=colorSelect.value,  //颜色
  			    memory=memorySelect.value, //内存
  			    number=numberInput.value,  //数量
  			    stock=goods[color+'|'+memory]; //颜色和内存对应的手机库存数量
  			
//			if(obj===colorSelect){  //如果改变的是选择颜色下拉框
//				
//			}else if(obj===memorySelect){
//				memorySelect.innerHTML=memory;
//			}else 
  			
  			switch (obj){
  				case colorSelect:colorInfo.innerHTML=color break; //如果改变的是选择颜色下拉框
  				case memorySelect:memorySelect.innerHTML=memory break; 
  				case numberInput:numberInfo.innerHTML=number break;
  			};
  			
  			if(!color){
  				nextBtn.disabled=true;
  				nextBtn.innerHTML='请选择内存大小';
  				return;
  			};
  			
  			if(!memory){
  				nextBtn.disabled=true;
  				nextBtn.innerHTML='请选择内存大小';
  				return;
  			};
  			
  			if(Number.isInteger(number-0) && number>0){ //输入购买数量是否为正整数
  				nextBtn.disabled=true;
  				nextBtn.innerHTML='请输入正确的购买数量';
  				return;
  			};
  			
  			nextBtn.disabled=false;
  			nextBtn.innerHTML='放入购物车';
  			
  		}
  	}
  })();
  
  //事件函数：
  colorSelect.onchange=function(){
  	   mediator.changed(this); 
  };
  memorySelect.onchange=function(){
  	   mediator.changed(this);
  };
  numberInput.oninput=function(){
  	  mediator.changed(this);
  };
  
  
