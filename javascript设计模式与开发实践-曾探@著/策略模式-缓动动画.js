
/**
 * 算法接收4个参数
 * t:动画已消耗的时间
 * b:小球原始位置
 * c：小球目标位置
 * d:动画持续的总时间
 * 
 * 返回的值是动画元素应该处在的当前位置
 * ***/

var tween={
	linear:function(t,b,c,d){
		return c*t/d+b;
	},
	easeIn:function(t,b,c,d){
		return c*(t/=d)*t+b;
	},
	strongEaseIn:function(t,b,c,d){
		return c*(t/=d)*t*t*t*t+b;
	},
	strongEaseOut:function(t,b,c,d){
		return c*((t=t/d-1)*t*t*t*t+1)+b;
	},
	sineaseIn:function(t,b,c,d){
		return c*(t/=d)*t*t+b;
	},
	sineaseOut:function(t,b,c,d){
		return c*((t=t/d-1)*t*t+1)+b;
	}
};


/*
 * animate 类
 * 参数dom:即将运动起来的dom节点
 */

var Animate=function(dom){
	this.dom=dom;    //进行运动的dom节点
	this.startTime=0;  //动画开始时间
	this.startPos=0;   //动画开始时，dom节点的位置，即dom的初始位置
	this.endPos=0;     //动画结束时，dom节点的位置，即dom的目标位置
	this.propertyName=null; //dom节点需要被改变的css属性名
	this.easing=null;       //缓动算法
	this.duration=null;    //动画持续时间
};


/*
 * 动画启动
 * 参数：
 * propertyName:要改变的css属性名，比如'left'、'top'，分别表示左右移动和上下移动。
 * endPos:小球运动的目标位置
 * duration:动画持续时间。
 * easing:缓动算法。
 */

Animate.prototype.start=function(propertyName,endPos,duration,easing){
	this.startTime=+new Date;   //动画启动时间
	this.startPos=this.dom.getBoundingClientRect()[propertyName]; //dom节点初始位置
	this.propertyName=propertyName; //dom节点需要被改变的css属性名
	this.endPos=endPos;            //dom节点目标位置
	this.easing=tween[easing];     //缓动算法
	
	var self=this;
	var timeId=setInterval(function(){  //启动定时器，开始执行动画
		 if(self.step()===false){         //如果动画已结束，则清除定时器
		 	clearInterval(timeId);
		 }
	},19);
};


/*
 * 运动每一帧事件
 */
Animate.prototype.step=function(){
	var t=+new Date;  //取得当前时间
	if(t>=this.startTime+this.duration){  //(1)
		this.update(this.endPos);    //更新小球的css属性值
		return false;
	};
	var pos=this.easing(t-this.startTime,this.startPos,this.endPos-this.startPos,this.duration);//pos为小球当前位置
	this.update(pos); //更新小球的css属性值
};

/*
 * (1)  意思是：如果当前时间大于动画开始时间加上动画持续时间之和，说明动画已经结束，此时要修正小球的位置。
 * 因为在这一帧开始之后，小球的位置已经接近了目标位置，但很可能不完全等于目标位置。
 * 此时我们要主动修正小球的当前位置为最终的目标位置。
 */


/*
 * 更新小球css属性值
 * pos：小球当前位置
 */
Animate.prototype.update=function(pos){
	this.dom.style[this.propertyName]=pos+'px';
};


//test
	var div=document.getElementById('div');
	var animate=new Animate(div);
//	animate.start('left',500,1000,'strongEaseOut');
//	animate.start('left',500,1000,'strongEaseOut');
//	setTimeout(function(){
		animate.start('top',100,500,'strongEaseIn');
//	},3000)
	
	animate.step()
