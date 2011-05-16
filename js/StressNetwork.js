/**
 * Gère la partie réseau (connexions) du client.
 * @param game L'objet Game qui gère le jeu actuel.
 */
function Network (game){
  this.connected = false;
  
  var ws;
  
  this.events = {
    onConnect: function(){},
    onDisconnect: function(){},
    onError: function(){},
  };
  
  
  /**
   * Se connecte au serveur et initialise le Websocket utilisé pour 
   * les échanges avec le serveur.
   */  
  this.connect = function(){
    ws = new WebSocket("ws://localhost:8080/game");
    
    var events = this.events;

    ws.onopen = function() {
      this.connected = true;
      game.connect();
      console.log("ws connected " + game.numero);
      events.onConnect();
    };
    ws.onclose = function() {
      this.connected = false;
      events.onDisconnect();
    };
    ws.onmessage = function(e) {
	  //console.log("message : " + e.data);
    };
    ws.onerror = function() {
      events.onError();
    };
  };
  
  this.broadcast = function(msg){
    //console.log(JSON.stringify(msg));
    if (ws.readyState == 1)
        ws.send(JSON.stringify(msg));
    //else
        //console.log(ws.readyState);
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
	//console.log("go");
        var date = new Date();  // On recupere le timestamp
	    var bouge = {   "msg":"Bouge",
	                    "raquette":pos,
	                    "time":date.getTime()};
	    this.broadcast(bouge);
  };
  
}
