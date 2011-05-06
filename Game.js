var DIMENSION_BALLE = 5;

function Game() {

    /*
    Ajoute un joueur au tableau de joueurs.
    Appele lors de la reception d'un GStat.
    Si un nouveau joueur est present, le rajoute.    
    */
	this.setJoueurs = function(tabJoueursArg)
	{
		alert("SetJoueur");
		
		// Verifie s'il y a un nouveau joueur
		if (this.tabJoueurs.length !== tabJoueursArg.players.length)
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
	
	/*
	Calcule la position des ancres de la raquette d'un joueur en fonction de l'axe donne par le serveur.
	Ajoute ensuite le joueur a la liste des joueurs.
	Exemple : Si l'axe est de 0, alors la raquette sera a gauche.
	Si l'axe est de 1, alors la raquette sera a droite.	
	*/
	this.calculAncreJoueur = function(nom,axe)
	{
	var ancreDepart = {x:0, y:0};
	var ancreArrivee = {x:0, y:0};
	    if (axe === 0)
		{
		                // Raquette a gauche
		                ancreDepart.x = 0.1*this.scene.getWidth();
		                ancreDepart.y = 0.1*this.scene.getHeight();
		                ancreArrivee.x = ancreDepart.x;
		                ancreArrivee.y = this.scene.getHeight() - ancreDepart.y;
		                this.addJoueur(nom,ancreDepart,ancreArrivee,0);
		}
		else if (axe === 1)
		{
		                // Raquette a droite
		                ancreDepart.x = 0.9*this.scene.getWidth();
		                ancreDepart.y = 0.9*this.scene.getHeight();
		                ancreArrivee.x = ancreDepart.x;
		                ancreArrivee.y = this.scene.getHeight() - ancreDepart.y;
		                this.addJoueur(nom,ancreDepart,ancreArrivee,1);
		}
	};

    // Ajoute un joueur
	this.addJoueur = function(nom, ancre1, ancre2, pos)
	{
		this.tabJoueurs[nom] = {ancreDep : ancre1,
				       ancreArr : ancre2,
				       position : pos};
	};
	
	// Supprime un joueur
	this.supprJoueur = function(nom)
	{
		delete(this.tabJoueurs.nom);
	};

    /*
    Calcule la position de la balle, efface la scene, et redessine la balle
    
    */
	this.setBall = function(posX, posY, deltaX, deltaY)
	{
		this.Gball.x = (posX * this.scene.getWidth())/100;
		this.Gball.y = (posY * this.scene.getHeight())/100;
				      
	    // Display of the ball
		//this.scene.clear();
		this.scene.components['Balle'].draw(this.scene.getCtx());
	};
	
	/*
	Appelee lorsque le client recoit de la part du serveur un RSync : 
	repositionnement des raquettes des autres joueurs	
	*/
	this.setSlides = function(positionRaq)
	{
	    var i=0;
	    for (i=0; i < this.tabJoueurs.length; i++)
	    {
	        // TO DO : Positionner les raquettes en fonction des pourcentages de positionRaq
	        this.scene.components['Slider'+i].draw(this.scene.getCtx());
	    }
	};
	
	this.createSlides = function()
	{
		var i=0;
		for (i=0; i < this.tabJoueurs.length; i++)
		{
			this.ancres[i].ancreDepart.x = this.tabJoueurs.nom[i].ancre1.x * this.scene.getWidth();
			this.ancres[i].ancreDepart.y = this.tabJoueurs.nom[i].ancre1.y * this.scene.getHeight();
			this.ancres[i].ancreArrivee.x = this.tabJoueurs.nom[i].ancre2.x * this.scene.getWidth();
			this.ancres[i]ancreArrivee.y = this.tabJoueurs.nom[i].ancre2.y * this.scene.getHeight();
			
			ax = ((this.tabJoueurs.nom[i].ancre2.x - this.tabJoueurs.nom[i].ancre1.x) * this.tabJoueurs.nom[i].pos / 100 + this.tabJoueurs.nom[i].ancre1.x) * this.scene.getWidth();
			ay = ((this.tabJoueurs.nom[i].ancre2.y - this.tabJoueurs.nom[i].ancre1.y) * this.tabJoueurs.nom[i].pos / 100 + this.tabJoueurs.nom[i].ancre1.y) * this.scene.getHeight();
			bx = Math.sqrt(Math.pow(ax + this.ancres[i].ancreDepart.x - this.ancres[i].ancreArrivee.y, 2)) * 0.10;
			by = Math.sqrt(Math.pow(ay + this.ancres[i].ancreDepart.y - this.ancres[i]ancreArrivee.y, 2)) * 0.10;
			
			if (!this.tabJoueurs[i].slider) {
				this.tabJoueurs[i].slider = new Slider(ax, ay, bx, by);
				this.scene.add("Slider"+i,this.tabJoueurs[i].slider);
			}
		}
	};
	
	this.game = function()
	{
	    // Joueurs
        this.tabJoueurs = new Array(1);	            // A CHANGER       

	    this.nw = new Network(this);
	    this.scene = new Scene();
	    this.scene.attachCanvas("GameZone");
	
	    // Creation de la balle
        this.balle = { x : 50, y : 50, dX : 0, dY : 0};
        if(!this.Gball) {
		    this.Gball = new Ball(DIMENSION_BALLE, this.balle.x, this.balle.y, true);
	    }

        // On ajoute la balle a la scene
        this.scene.add("Balle",this.Gball);
        
        // Ajout d'un joueur
        this.calculAncreJoueur("Thomas",0);  // A gauche
	
	    // Connection au Serveur
	    this.nw.connect();
	
	    // Envoi du message Hello : connexion d'un nouveau joueur
	    var date = new Date();  // On recupere le timestamp
	    var hello = {   "msg":"Hello",
	                    "pseudo":"Thomas",
	                    "time":+date.getTime()};
	                    alert(hello);
	    this.nw.broadcast(hello);

			
		    this.ancres = new Array();       // Ancres des slides
		    this.createSlides();    // On cree les slides en fonction des joueurs
		    this.setSlides();       // On les dessine

		    if(this.Gpongzone) {
			    this.Gpongzone = PongZone(this.ancres);
		    }
			
		    // On dessine tout
		    this.scene.drawAll();
	};
		        
    

}	
