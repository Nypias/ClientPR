var DIMENSION_BALLE = 5;

function Game() {

	this.setJoueurs = function(tabJoueursArg)
	{
		alert("SetJoueur");
		
		// Verifie s'il y a un nouveau joueur
		if (this.tabJoueurs.length != tabJoueursArg.players.length)
		{
		    var i=0;
		    for (i=0; i < tabJoueursArg.players.length; i++)
		    {
		        if (!this.tabJoueurs[tabJoueursArg.players[i]])
		        {   // On cree le nouveau joueur
		            // On regarde la valeur de axe dans tabJoueurs pour voir ou positionner la raquette
                    this.calculAncreJoueur(tabJoueursArg[i],this.tabJoueursArg.players[i].axe);
		        }
		    }
		}
		//this.tabJoueurs = tabJoueursArg;
	};
	
	this.calculAncreJoueur = function(nom,axe)
	{
	    if (axe == 0)
		{
		                // Raquette a gauche
		                var ancreDepart.x = 0.1*this.scene.getWidth();
		                var ancreDepart.y = 0.1*this.scene.getHeight();
		                var ancreArrivee.x = ancreDepart.x;
		                var ancreArrivee.y = this.scene.getHeight() - ancreDepart.y;
		                this.addJoueur(nom,ancreDepart,ancreArrivee,0);
		}
		else if (axe == 1)
		{
		                // Raquette a droite
		                var ancreDepart.x = 0.9*this.scene.getWidth();
		                var ancreDepart.y = 0.9*this.scene.getHeight();
		                var ancreArrivee.x = ancreDepart.x;
		                var ancreArrivee.y = this.scene.getHeight() - ancreDepart.y;
		                this.addJoueur(nom,ancreDepart,ancreArrivee,1);
		}
	};

	this.addJoueur = function(nom, ancre1, ancre2, pos)
	{
		this.tabJoueurs.nom = {ancreDep : ancre1,
				       ancreArr : ancre2,
				       position : pos};
	};
	
	this.supprJoueur = function(nom)
	{
		delete(this.tabJoueurs.nom);
	};

	this.setBall = function(posX, posY, deltaX, deltaY)
	{
		this.Gball.x = (posX * this.scene.getWidth())/100;
		this.Gball.y = (posY * this.scene.getHeight())/100;
				      
	    // Display of the ball
		this.scene.clear();
		this.scene.components['Balle'].draw(this.scene.getCtx());
	};
	
	this.setSlides = function(positionRaq)
	{
	    var i=0;
	    for (i=0; i < this.tabJoueurs.length; i++)
	    {
	        alert(i);
	        this.scene.components['Slider'+i].draw(this.scene.getCtx());
	    }
	}
	
	this.createSlides = function()
	{
		var i=0;
		for (i=0; i < this.tabJoueurs.length; i++)
		{
			this.ancres[i][0][0] = this.tabJoueurs.nom[i].ancre1.x * this.scene.getWidth();
			this.ancres[i][0][1] = this.tabJoueurs.nom[i].ancre1.y * this.scene.getHeight();
			this.ancres[i][1][0] = this.tabJoueurs.nom[i].ancre2.x * this.scene.getWidth();
			this.ancres[i][1][1] = this.tabJoueurs.nom[i].ancre2.y * this.scene.getHeight();
			
			ax = ((this.tabJoueurs.nom[i].ancre2.x - this.tabJoueurs.nom[i].ancre1.x) * this.tabJoueurs.nom[i].pos / 100 + this.tabJoueurs.nom[i].ancre1.x) * this.scene.getWidth();
			ay = ((this.tabJoueurs.nom[i].ancre2.y - this.tabJoueurs.nom[i].ancre1.y) * this.tabJoueurs.nom[i].pos / 100 + this.tabJoueurs.nom[i].ancre1.y) * this.scene.getHeight();
			bx = Math.sqrt(Math.pow(ax + ancres[i][0][0] - ancres[i][1][0], 2)) * 0.10;
			by = Math.sqrt(Math.pow(ay + ancres[i][0][1] - ancres[i][1][1], 2)) * 0.10;
			
			if (!this.tabJoueurs[i].slider) {
				this.tabJoueurs[i].slider = new Slider(ax, ay, bx, by);
				this.scene.add("Slider"+i,this.tabJoueurs[i].slider);
			}
		}
	}
	
	this.game = function()
	{
		if(!this.Gball) {
			this.Gball = new Ball(DIMENSION_BALLE, balle.x, balle.y, true);
		}
			
		this.ancres = [];
		this.createSlides();
		this.setSlides();

		if(this.Gpongzone) {
			this.Gpongzone = PongZone(this.ancres);
		}
			
		this.scene.drawAll();
	};
		        
    // Joueurs
    this.tabJoueurs = {};	                

	this.nw = new Network(this);
	this.scene = new Scene();
	
	this.scene.attachCanvas("GameZone");
	
	// Creation de la balle
    this.balle = { x : 50, y : 50, dX : 0, dY : 0};
    if (!this.Gball) {
        this.Gball = new Ball(DIMENSION_BALLE, this.balle.x, this.balle.y, true);
    }
    this.scene.add("Balle",this.Gball);
    
    // Ajout d'un joueur
    this.calculAncreJoueur("Alexandre",0);  // A gauche
	
	this.nw.connect();
	
	// Envoi du message Hello
	var hello = "{msg:'Hello',pseudo:'Alexandre',time:"+Date.getTime()+"}";
	this.nw.broadcast(hello);

}	
