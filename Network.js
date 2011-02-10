function Network (){
  this.connected = false;
  
  var this.ws;
  
  this.connect = function(){
    ws = new WebSocket("ws://localhost:10081/");

    ws.onopen = function() {
      this.connected = true;
      this.events.onConnect();
    };
    ws.onmessage = function(e) {
      this.parseMsg(e.data);
    };
    ws.onclose = function() {
      this.connected = false;
      this.events.onDisconnect();
    };
    ws.onerror = function() {
      this.events.onError();
    };
  }
  
  this.broadcast = function(msg){
    ws.send(JSON.stringify(msg));
  };
  
  this.parseMsg = function(msg){
    var data = JSON.parse(msg);
    if(data.type == "syncb")
      this.events.onSyncB(data.x, data.y, data.dx, data.dy);
    else if(data.type == "gstat")
      this.events.onGStats(data.gameStatus);
    else if(data.type == "contact")
      this.events.onContact(data.x, data.y, data.dx, data.dy);
    else if(data.type == "syncj")
      this.events.onSyncJ(joueurs);
  };
  
  this.disconnect = function(){
    this.connected = false;
    
  };
  
  this.events = {
    onConnect: function(){},
    onDisconnect: function(){},
    onError: function(){},
    onSyncB: function(x, y, dx, dy){},
    onGStat: function(gameStatus){},
    onContact: function(x, y, dx, dy) {},
    onSyncJ: function(joueurs) {}
  };
}
