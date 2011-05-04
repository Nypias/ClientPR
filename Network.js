function Network (){
  this.connected = false;
  
  var ws;
  
   this.events = {
    onConnect: function(){},
    onDisconnect: function(){},
    onError: function(){},
    onSyncB: function(x, y, dx, dy){},
    onGStat: function(gameStatus){},
    onContact: function(x, y, dx, dy) {},
    onSyncJ: function(joueurs) {}
  };
  
  this.parseMsg = function(message){
    var data = JSON.parse(message);
	
    if(data.msg == "syncb")
      this.events.onSyncB(data.x, data.y, data.dx, data.dy);
    else if(data.msg == "gstat")
      this.events.onGStats(data.gameStatus);
    else if(data.msg == "contact")
      this.events.onContact(data.x, data.y, data.dx, data.dy);
    else if(data.msg == "syncj")
      this.events.onSyncJ(joueurs);
    else
    {
        //alert(data.type);
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
