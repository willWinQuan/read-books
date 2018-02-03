
function Player(name,teamColor){
	this.name=name; //角色名字
	this.teamColor=teamColor; //队伍颜色
	this.state='alive';  //玩家生存状态
}

Player.prototype.win=function(){
	console.log(this.name+'won');
};

Player.prototype.lose=function(){
	console.log(this.name+'lost');
};


/**************玩家死亡******************/
Player.prototype.die=function(){
	this.state='dead';
	playerDirector.ReceiveMessage('playerDead',this); //给中介者发送消息，玩家死亡。
};

/***************移除玩家*****************/
Player.prototype.remove=function(){
	playerDirector.ReceiveMessage('removePlayer',this); //给中介者发送消息，移除一个玩家
};

/**************玩家换队****************/
Player.prototype.changeTeam=function(){
	playerDirector.ReceiveMessage('changeTeam',this,color); //给中介者发送消息，玩家换队
};

var playerFactory=function(name,teamColor){
	var newPlayer=new Player(name,teamColor);  //创造一个新的玩家对象
	playerDirector.ReceiveMessage('addPlayer',newPlayer); //给中介者发送消息，新增玩家
	
	return newPlayer;
};

var playerDirector=(function(){
	var players={}, //保存所有玩家
	    operations={};  //中介者可以执行的操作
	    
	/**************新增一个玩家**************/
	operations.addPlayer=function(player){
		var teamColor=player.teamColor; //玩家的队伍颜色
		players[teamColor]=players[teamColor] || []; //如果该颜色的玩家还没有成立队伍，则新成立一个队伍
		
		players[teamColor].push(player); //添加玩家进队伍
	};
	    
	/**************移除一个玩家**************/
	operations.removePlayer=function(player){
		var teamColor=player.teamColor,  //玩家的队伍颜色
		    teamPlayers=players[teamColor] || []; //该队伍所有成员
		    
		for(var i=teamPlayers.length-1;i>=0;i--){  //遍历删除
			if(teamPlayers[i]===player){
				teamPlayers.splice(i,1);
			}
		}	    
	};
	
})
