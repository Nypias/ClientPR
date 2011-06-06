var DIMENSION_BALLE = 5;

// shim layer with setTimeout fallback  //STOLEN !!
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
        };
})();

/**
 * Gère le jeu, les mécaniques de jeu et la « boucle principale »
 * du jeu.
 * @see Network.js
 * @see Rectangle.js
 * @see Ball.js
 * @see Scene.js
 * @see Slider.js
 */
function Game(nomJoueur) {

    self = this;

  this.changePseudo = function(newPseudo)
  {    
    this.nomJ = newPseudo;  
  };

  this.gestionCollision = function(status)
  {
      //console.log(status);
      if (status == "MISS")
      {
         this.reInitialisationBalle();
      }
  };
  
  this.reInitialisationBalle = function()
  {
    // On arrete la trajectoire si elle a commence
         clearInterval(this.affichageBalle);
         
         // Et on remet la balle au milieu du terrain
         this.Gball.x = this.scene.getWidth()/2;
         this.Gball.y = this.scene.getHeight()/2;
         
         // On repositionne les anciens points de collision a null
         this.ancienCollisionX = null;
         this.ancienCollisionY = null;
         
         // On dessine la balle
      /*window.mozRequestAnimationFrame(function() {
	  self.scene.clear();
          self.scene.drawAll();
      });*/
  }

  /*
   * Ajoute un joueur au tableau de joueurs.
   * 
   * Cette méthode est appelée lors de la réception d'un GStat.
   * Si un nouveau joueur est présent, on le rajoute.
   * 
   * @param tabJoueursArg Le tableau des joueurs inclus dans 
   * le message du serveur.
   */
  this.setJoueurs = function(tabJoueursArg)
  {
    //console.log("Fonction setJoueurs appelée.");
    var longueurTab = 0;
    var longueurTabJoueurs = 0;
	
	document.getElementById("leftScore").innerHTML = "";
	document.getElementById("rightScore").innerHTML = "";
	
    for (key in tabJoueursArg){ 
        longueurTab++;
		var axeScore;
		if (tabJoueursArg[key]["axe"] == 0)
		{
			axeScore = "leftScore";
		}
		else
		{
			axeScore = "rightScore";
		}
		document.getElementById(axeScore).innerHTML = key + "<br />" + tabJoueursArg[key]['points'];
    }
    
    for (key in this.tabJoueurs)
    {
        longueurTabJoueurs++;
    }
    this.tabJoueurs.longueur = longueurTabJoueurs;
    
    //console.log("Taille Arg : " + longueurTab + "     Taille Tab Joueurs : " + longueurTabJoueurs);
      
    // Verifie s'il y a un nouveau joueur
    if (longueurTabJoueurs < longueurTab)
    {
        //console.log("Taille differente");
        var i=0;
        for (key in tabJoueursArg)
        {
        //console.log(key + " : " + tabJoueursArg[key]);
            if (!this.tabJoueurs[key])
            {   //console.log("Ajout Joueur sur l'axe " + tabJoueursArg[key].axe);
                // On regarde la valeur de axe dans tabJoueurs pour voir ou positionner la raquette
                //this.calculAncreJoueur(key,tabJoueursArg[key].axe);
                this.addJoueur(key,axe);
            }
        }
        //console.log("Affichage Joueurs Apres");
    }
    else if (longueurTabJoueurs > longueurTab)
    {   // On detruit un joueur        
        for (key in this.tabJoueurs)
        {
            if (!tabJoueursArg[key])
            {
                this.supprJoueur(key);
            }
        }
    }
  };

    // Ajoute un joueur
  this.addJoueur = function(nom, axe)
  {
    var sliderJ = new Slider(0,0,0,0,50,100);
    this.scene.add('S'+nom, sliderJ);
    this.tabJoueurs[nom] = {slider: sliderJ};	
    this.tabAxes[nom] = axe;
    this.reInitialisationBalle(); 
    //console.log("Add Joueur : " + nom);
  };
  
  this.setTerrain = function (tabAncres)
  {  
    this.tabTempAncres = tabAncres;
    for (key in this.tabJoueurs)
    {
      axe = this.tabAxes[key];
      this.tabJoueurs[nom].changeAncres(tabAncres["ancre"+axe], tabAncres[("ancre"+(axe+1)) % this.tabJoueurs.longueur]);
    }
    
    this.reInitialisationBalle();
  };
  
  this.preparationModifTerrain = function(tabAncres)
  {
    var tempsInitial = Date.getTime();
  
    this.nombrePointsCalculesMouvementSlide = 60;
    var axe = 0;
    for (key in this.tabJoueurs)
    {
      for (var i = 0; i < this.nombrePointsCalculesMouvementSlide; i++)
      {
        this.tabTempAncres[axe][i].x = (this.tabTempAncres["ancre"+this.tabAxes[key]].x - this.tabJoueurs[key].ancreDep.x)/(this.nombrePointsCalculesMouvementSlide-i) + this.tabJoueurs[key].ancreDep.x;
        this.tabTempAncres[axe][i].y = (this.tabTempAncres["ancre"+this.tabAxes[key]].y - this.tabJoueurs[key].ancreDep.y)/(this.nombrePointsCalculesMouvementSlide-i) + this.tabJoueurs[key].ancreDep.y;
      }
      axe++;
    }
    // We have everything !
    var tempsIci = Date.getTime();
    var tempsRestant = 1100 - (tempsIci - tempsInitial);
    
    var i = 0;
    try {
        this.affichageSliders = setInterval("game.modifTerrain(i) ; i++;",tempsRestant/this.nombrePointsCalculesMouvementSlide);
    }
    catch (err) {
        clearInterval(this.affichageSliders);
    }
   
  };
  
  this.modifTerrain = function(indice)
  {
    for (key in this.tabJoueurs)
    {
      axe = this.tabAxes[key];
      this.tabJoueurs[nom].changeAncres(this.tabTempAncres[axe][indice], this.tabTempAncres[(axe + 1) % this.tabJoueurs.longueur][indice]);
    }
  }

  // Supprime un joueur et son slider
  this.supprJoueur = function(nom)
  {
    delete this.tabJoueurs[nom];
    this.scene.suppr('S'+nom);
    this.reInitialisationBalle();    
  };
  
  this.roomsStats = function(roomsNumber)
  {
	document.getElementById("roomsStats").innerHTML = "Nombre de salles de jeu actuellement connectées : <em>" + roomsNumber + "</em>";
  }

    
  this.calculPositionBalle = function(posX, posY, collisionTime)
  {
    console.log("ENTREE COLLISION");
    var timeC = collisionTime-this.ancienTime;	

    /* Nombre de points a calculer*/
    //console.log(timeC);
    console.log("Ancien Time : " + this.ancienTime);
    if (this.ancienTime != 0) {
        var nombrePoints = Math.round((timeC*6)/240);
    }
    else {
        var nombrePoints = 60;
    }
    console.log("Nombre de points : " + nombrePoints);

    this.ancienTime = collisionTime;

    if (this.ancienCollisionX != null && this.ancienCollisionY != null){
      this.setBallXAndY(this.ancienCollisionX, this.ancienCollisionY);
    }
    
    //console.log('x : ' + this.ancienCollisionX + " y : " + this.ancienCollisionY);
    
    this.ancienCollisionX = (posX*this.scene.getWidth())/100;
    this.ancienCollisionY = (posY*this.scene.getHeight())/100;
    
    
    // Calcul du tableau de points
    this.calculPositionsBalle(posX,posY,nombrePoints);
    
    // Definition d'un objet Date pour calculer le timestamp actuel
    d = new Date();
    
    // Le temps qu'il nous reste avant la collision est egal au temps de collision - le temps actuel
    var difference = collisionTime - d.getTime();
    
    /* On affiche la balle toutes les "difference/nombrePoints" ms
       Le premier parametre en guillemet s'agit des fonctions qu'on va appeller toutes les "differences/nombrePoints" ms
       Le deuxieme parametre est le temps d'attente
       Dans le premier parametre, on appelle la fonction setBall avec l'abscisse et l'ordonnee des points calcules (fonction qui affiche la balle) et on incremente i         
       Un try catch est present pour prendre l'exception au cas ou on lit trop loin dans le tableau et que le point n'existe pas.
       Dans ce cas, on reset juste le setInterval.
    */
    i = 0;
    try {
        this.affichageBalle = setInterval("game.setBall(i) ; i++;",difference/nombrePoints);
    }
    catch (err) {
        clearInterval(this.affichageBalle);
    }
    /*finally {
    // A la fin de la methode, pour eviter les erreurs, on refixe la balle courante sur le point de collision
    this.Gball.x = posX;
    this.Gball.y = posY;
    }*/

	console.log("FIN COLLISION");

  };
  
  /*
    Objectif : this.nouveauPaquetTrajectoire a pour but de stopper l'affichage de la balle de la fonction calculPositionBalle
    lorsqu'un nouveau paquet est recu
    Strategie : Arrete la boucle setInterval
  */
  this.nouveauPaquetTrajectoire = function ()
  {
        clearInterval(this.affichageBalle);
  };

  /* 
    Permet de creer un objet coordonneesPoint caracterise par une abscisse (x) et une ordonnee (y)
  */
  function coordonneesPoint(x,y)
  {
    this.x = x;
    this.y = y;
  }

  /*
    Objectif : Calcule les coordonnees des "nbrPoints" entre la position courante de la balle et le point de collision
    Strategie : explicitee ci-dessous
    
    @param posX : abscisse du point de collision
    @param posY : ordonnee du point de collision
    @param nbrPoints : nombre de points a calculer
  */
  this.calculPositionsBalle = function(posX,posY,nbrPoints)
  {
    // Initialisation d'un nouveau tableau ou l'on va stocker les points
    this.tabPosBalle = new Array(nbrPoints);

    
    /* Calcul du vecteur allant du point courant de la balle vers le point de collision
      La position de la balle est normalise car donnee en parametre de la fonction en pourcentage.
      Or, this.Gball.x et .y sont en pixels. Donc on met toutes les coordonnees de la balle en pixels.
    */

    // Sauvegarde des points courants de la balle
    var xCourant = this.Gball.x;
    var yCourant = this.Gball.y;

    //console.log("pt collision serveur " + posX + "," + posY);

    //console.log("balle en " + xCourant + "," + yCourant);
    var vecteurX = ((posX * this.scene.getWidth())/100) - xCourant;
    var vecteurY = ((posY * this.scene.getHeight())/100) - yCourant;
    //console.log("vecteur " + vecteurX + "," + vecteurY);    
    /* Division de vecteurX et de vecteurY par le nombre de points
       pour avoir un vecteur dont la norme est reduite
    */
    var xAjout = vecteurX / nbrPoints;
    var yAjout = vecteurY / nbrPoints;
    //console.log("ajout" + xAjout+","+yAjout);
    
   
    // Stockage des points calcules dans le tableau
    for (var j=0; j < nbrPoints; j++)
    {
      // On increment x et y avec le vecteur calcule ci-dessus qui va vers le point de collision
      xCourant = xCourant + xAjout;
      yCourant = yCourant + yAjout;
      //console.log("courants " + xCourant + "," + yCourant);
      // On cree le point correspondant
      var point = new coordonneesPoint(xCourant,yCourant);
      
      // On enregistre le point
      this.tabPosBalle[j] = point;
      //alert("X : " + xCourant + "    Y : " + yCourant)
    }
    //console.log(this.tabPosBalle);
  };


  this.refreshGame = function ()
  {
        this.scene.clear();   
  };


  /*
  Calcule la position de la balle
  */
  this.setBall = function(k)
  {
  try {
    this.Gball.x = this.tabPosBalle[k].x;
    this.Gball.y = this.tabPosBalle[k].y;
  }
  catch (err) {}
  };
  
  this.setBallXAndY = function(x,y)
  {
    this.Gball.x = x;
    this.Gball.y = y;
  };
  
  this.moveSlider = function(slider, pos){	
    if (pos > 9 && pos < 91)
    {
        //console.log("Position : " + pos);
        slider.changePosition(pos);
        this.nw.sendBouge(pos);
    }
  };
    
  this.moveSliderServer = function(slider, pos){	
    if (pos > 9 && pos < 91)
    {
        slider.changePosition(pos); 
    }
  };
  
  this.connect = function()
  {
      this.nw.sendHello(this.nomJ);
  };

   this.animloop = function(){
       self.scene.clear();
       self.scene.drawAll();
      requestAnimFrame(self.animloop, $('body')[0]);
    };


  this.game = function()
  {
      // Joueurs
      this.tabJoueurs = new Array();	            // A CHANGER       
      this.tabAxes = new Array();
      
      this.nomJ = nomJoueur;
      
      this.ancienTime = 0;

      this.nw = new Network(this);
      this.scene = new Scene();
      this.scene.attachCanvas("GameZone");
      

      // Creation de la balle
      this.balle = { x : (this.scene.getWidth()/2), y : (this.scene.getHeight()/2), dX : 0, dY : 0};
      if(!this.Gball) {
        this.Gball = new Ball(DIMENSION_BALLE, this.balle.x, this.balle.y, true);
      }
      
      this.ancienCollisionX = null;
      this.ancienCollisionY = null;

      // On ajoute la balle a la scene
      this.scene.add("Balle",this.Gball);
     
      // Ajout d'un joueur
      //this.calculAncreJoueur(this.nomJ,0);  // A gauche

      // Connection au Serveur
      this.nw.connect();
    
      setTimeout(function() {}, 1000);
      // Envoi du message Hello : connexion d'un nouveau joueur
    
      // On dessine tout
      this.animloop();
    
  };
}	
