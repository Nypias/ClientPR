var DIMENSION_BALLE = 5;

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
    console.log("Fonction setJoueurs appelée.");
    
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
          ancreDepart.x = 0.01*this.scene.getWidth();
          ancreDepart.y = 0.3*this.scene.getHeight();
          ancreArrivee.x = ancreDepart.x;
          ancreArrivee.y = this.scene.getHeight() - ancreDepart.y;
          this.addJoueur(nom,ancreDepart,ancreArrivee,50);	
      }
      else if (axe === 1)
      {
            // Raquette a droite
            ancreDepart.x = 0.99*this.scene.getWidth()-7;
            ancreDepart.y = 0.3*this.scene.getHeight();
            ancreArrivee.x = ancreDepart.x;
            ancreArrivee.y = this.scene.getHeight() - ancreDepart.y;
            this.addJoueur(nom,ancreDepart,ancreArrivee,50);
      }
  };

    // Ajoute un joueur
  this.addJoueur = function(nom, ancre1, ancre2, pos)
  {
    var sliderJ = new Slider(ancre1.x, ancre1.y, ancre2.x, ancre2.y);
    this.scene.add('S'+nom, sliderJ);
    this.tabJoueurs[nom] = {ancreDep : ancre1,
                ancreArr : ancre2,
                position : pos,
                slider: sliderJ};	    
  };

  // Supprime un joueur
  this.supprJoueur = function(nom)
  {
    delete(this.tabJoueurs.nom);
  };

    
  this.calculPositionBalle = function(posX,posY,collisionTime)
  {
    //alert(collisionTime-this.ancienTime);
    //this.ancienTime = collisionTime;
        
    /* Nombre de points a calculer
       Initialise au depart par 20
       C'est a dire que 20 points seront calcules sur la droite qui va du point actuel de la balle
          au point de collision
    */
    var nombrePoints = 20;
    
    // Calcul du tableau de points
    this.calculPositionsBalle(posX,posY,nombrePoints);
    
    // Definition d'un objet Date pour calculer le timestamp actuel
    d = new Date();
    
    // Le temps qu'il nous reste avant la collision est egal au temps de collision - le temps actuel
    var difference = collisionTime - d.getTime();
    
    /* On affiche la balle toutes les "difference/nombrePoints" ms
       Le premier parametre en guillemet s'agit des fonctions qu'on va appeller toutes les "differences/nombrePoints" ms
       Le deuxieme parametre est le temps d'attente
       Dans le premier parametre, on appelle la fonction setBall avec l'abscisse et l'ordonnee des points calcules (fonction 
       qui affiche la balle) et on incremente i         
       Un try catch est present pour prendre l'exception au cas ou on lit trop loin dans le tableau et que le point n'existe pas.
       Dans ce cas, on reset juste le setInterval.
    */
    i = 0;
    try {
        affichageBalle = setInterval("this.setBall(this.tabPosBalle[i].x, this.tabPosBalle[i].y) ; i++;",difference/nombrePoints);
    }
    catch (err) {
        clearInterval(affichageBalle);
    }
    
    // A la fin de la methode, pour eviter les erreurs, on refixe la balle courante sur le point de collision
    this.Gball.x = posX;
    this.Gball.y = posY;
  };
  
  /*
    Objectif : this.nouveauPaquetTrajectoire a pour but de stopper l'affichage de la balle de la fonction calculPositionBalle
    lorsqu'un nouveau paquet est recu
    Strategie : Arrete la boucle setInterval
  */
  this.nouveauPaquetTrajectoire = function ()
  {
        clearInterval(affichageBalle);
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
    this.tabPosBalle = new Array;
    
    /* Calcul du vecteur allant du point courant de la balle vers le point de collision
      La position de la balle est normalise car donnee en parametre de la fonction en pourcentage.
      Or, this.Gball.x et .y sont en pixels. Donc on met toutes les coordonnees de la balle en pixels.
    */
    var vecteurX = ((posX * this.scene.getWidth())/100) - this.Gball.x;
    var vecteurY = ((posY * this.scene.getHeight())/100) - this.Gball.y;
    
    /* Division de vecteurX et de vecteurY par le nombre de points
       pour avoir un vecteur dont la norme est reduite
    */
    var xAjout = vecteurX / nbrPoints;
    var yAjout = vecteurY / nbrPoints;
    
    // Sauvegarde des points courants de la balle
    var xCourant = this.Gball.x;
    var yCourant = this.Gball.y;
    
    // Stockage des points calcules dans le tableau
    for (i=0; i < nbrPoints; i++)
    {
      // On increment x et y avec le vecteur calcule ci-dessus qui va vers le point de collision
      xCourant = xCourant + xAjout;
      yCourant = yCourant + yAjout;
      
      // On cree le point correspondant
      var point = new coordonneesPoint(xCourant,yCourant);
      
      // On enregistre le point
      this.tabPosBalle[i] = point;
      //alert("X : " + xCourant + "    Y : " + yCourant)
    }
  };


  this.refreshGame = function ()
  {
        this.scene.clear();   
  };

  /*
  Calcule la position de la balle, efface la scene, et redessine la balle
  */
  this.setBall = function(posX, posY)
  {
    this.Gball.x = (posX * this.scene.getWidth())/100;
    this.Gball.y = (posY * this.scene.getHeight())/100;
              
    // Display of the ball
    this.scene.clear();
    this.scene.drawAll();
  };


  this.moveSlider = function(slider, pos){	
    console.log('Avant : ' +slider.a.y + ' ' + pos + ' ' + slider.l);
    
    ay = (pos/100) * this.scene.getHeight() - (slider.l/2);
    
    if (ay > 0 && (ay + slider.l) < this.scene.getHeight())
    {
        slider.a.y = ay;
        this.tabJoueurs[this.nomJ].position = pos;    
        this.nw.sendBouge(pos);
    }
    
    console.log('apres : ' +slider.a.y);
    this.scene.clear();
    this.scene.drawAll();
  };
    
  this.moveSliderServer = function(slider, pos){	
    ay = (pos/100) * this.scene.getHeight() - (slider.l/2);
    
    if (ay > 0 && (ay + slider.l) < this.scene.getHeight())
    {
        slider.a.y = ay;
        this.tabJoueurs[this.nomJ].position = pos;    
    }
    
    this.scene.clear();
    this.scene.drawAll();
  };
  
  this.connect = function()
  {
      this.nw.sendHello(this.nomJ);
  };
   
	
  this.game = function()
  {
      // Joueurs
      this.tabJoueurs = new Array(1);	            // A CHANGER       
      
      this.nomJ = nomJoueur;
      
      this.ancienTime = 0;

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
      this.calculAncreJoueur(this.nomJ,0);  // A gauche
      //this.calculAncreJoueur("Mathieu",1);

      // Connection au Serveur
      this.nw.connect();
    
      setTimeout(function() {}, 1000); 
      // Envoi du message Hello : connexion d'un nouveau joueur


      /*this.ancres = new Array;       // Ancres des slides
      this.createSlides();    // On cree les slides en fonction des joueurs
      this.setSlides();       // On les dessine*/
      

      if(this.Gpongzone) {
        this.Gpongzone = PongZone(this.ancres);
      }
    
      // On dessine tout
      this.scene.drawAll();
  };
}	
