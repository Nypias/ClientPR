function Network (){
  this.connected = false;
  
  var ws;
  
   this.events = {
    onConnect: function(){},
    onDisconnect: function(){},
    onError: function(){},
    onGStat: function(gameStatus){},
    onContact: function(x, y, dx, dy) {},
    onSyncJ: function(joueurs) {},
    
    onCollision: function(){}
  };
  
  this.parseMsg = function(message){
    var data = JSON.parse(message);
	
    if(data.msg == "Gstat")        // Nombre de joueurs et score
      this.events.onGStats(data.gameStatus);// TO DO : A coder
    else if(data.msg == "SyncJ")
      this.events.onSyncJ(joueurs);     
    else if(data.msg == "Collision")
      this.events.onCollision();        // TO DO : A coder
    else if (data.msg == "Trajectoire")
    {
        this.events.onContact(data.point[0][0],data.point[0][1],0,0);
    }
    else
    {
        alert(data.type);
    	this.not_supported = true;
    }
  };
  
  this.connect = function(){
    ws = new WebSocket("ws://localhost:8080/game");
    
    var parseMsg = this.parseMsg;
    var events = this.events;

    ws.onopen = function() {
      this.connected = true;
      events.onConnect();
    };
    ws.onclose = function() {
      this.connected = false;
      events.onDisconnect();
    };
    ws.onmessage = function(e) {
      parseMsg(e.data);
    };
    ws.onerror = function() {
      events.onError();
    };
  }
  
  this.broadcast = function(msg){
    ws.send(JSON.stringify(msg));
  };
  
  
   this.disconnect = function(){
    	this.connected = false;  
  };
  
}
