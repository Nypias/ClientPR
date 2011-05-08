function Network (game){
  this.connected = false;
  
  var ws;
  
    this.events = {
    onConnect: function(){},
    onDisconnect: function(){},
    onError: function(){},
    onGStat: function(gameStatus){},
    onContact: function(x, y, offset){},
    onSyncJ: function(joueurs){},
    onCollision: function(){}
  };
  
  this.parseMsg = function(message,events){
    var data = JSON.parse(message);

    if(data.msg == "Gstat")        // Nombre de joueurs et score
      game.setJoueurs(data.players);
    else if(data.msg == "SyncJ"){    // Position des raquettes
        console.log("Dans SyncJ "  + data.raquettes["Thomas"]);
        for (key in data.raquettes){     
            //console.log(data.raquettes[key]);
            game.moveSliderServer(game.tabJoueurs[key].slider, data.raquettes[key])
        }
    }
    else if(data.msg == "Collision")
      events.onCollision();        // TO DO : A coder
    else if (data.msg == "Trajectoire")
      game.calculPositionBalle(data.point[0][0],data.point[0][1],data.point[1]);
    else
    {
        //alert("Type : " + data.type);
    	this.not_supported = true;
    }
  };
  
  this.connect = function(){
    ws = new WebSocket("ws://localhost:8080/game");
    
    var parseMsg = this.parseMsg;
    var events = this.events;

    ws.onopen = function() {
      this.connected = true;
      game.connect();
      console.log("ws connected");
      events.onConnect();
    };
    ws.onclose = function() {
      this.connected = false;
      events.onDisconnect();
    };
    ws.onmessage = function(e) {
      parseMsg(e.data,events);
    };
    ws.onerror = function() {
      events.onError();
    };
  };
  
  this.broadcast = function(msg){
    console.log(JSON.stringify(msg));
    if (ws.readyState == 1)
        ws.send(JSON.stringify(msg));
    else
        console.log(ws.readyState);
  };
  
  
   this.disconnect = function(){
    	this.connected = false;  
  };
  
  this.sendHello = function(nameJ){
  	    var date = new Date();  // On recupere le timestamp
	    var hello = {   "msg":"Hello",
	                    "pseudo":nameJ,
	                    "time":date.getTime()};
	    this.broadcast(hello);
  };
  
  this.sendBouge = function(pos){
        var date = new Date();  // On recupere le timestamp
	    var bouge = {   "msg":"Bouge",
	                    "raquette":pos,
	                    "time":date.getTime()};
	    this.broadcast(bouge);
  };
  
}
