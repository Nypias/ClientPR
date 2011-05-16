


function Game(nomJoueur, numero) {
	
  this.connect = function()
  {
      this.nw.sendHello(this.nomJ);
  };
  
  this.bouge = function()
  {
	//console.log("bouge");
	this.nw.sendBouge(50);
	}
	
  this.game = function()
  {
      // Joueurs
      this.tabJoueurs = new Array();	            // A CHANGER       
      
	  this.nomJ = "clem";
	  
	  this.numero = numero;
	  
      this.nw = new Network(this);

      // Connection au Serveur
      this.nw.connect();
    
      
  };
}	
