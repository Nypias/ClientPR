/**
 *  CE FICHIER N'EST PLUS UTILISÉ
 *  NE RESTEZ PAS DEUX HEURES COMME MOI À ESSAYER DE LE BIDOUILLER :
 *  Ça sert à rien ! =)
 *                                        - Stan
 * @see Game.js
 */

// Constantes du jeu
var RAQUETTE_WIDTH = 10;
var RAQUETTE_HEIGHT = 100;
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 350;
var DEPLACEMENT_RAQUETTE = 10;
var COULEUR_RAQUETTES = "rgba(255,255,255,0.5)";
var COULEUR_BALLE = "rgb(255,102,0)";
var DIMENSION_BALLE = 8;
var VITESSE_BALLE = 2;
var xRaquetteDroite = CANVAS_WIDTH-(CANVAS_WIDTH/20);
var xRaquetteGauche = CANVAS_WIDTH/20;

// Variables
var ctx;
var posYRaqGauche = (CANVAS_HEIGHT/2)-(RAQUETTE_HEIGHT/2);
var posYRaqDroite = posYRaqGauche;
var balleX = CANVAS_WIDTH/2;
var balleY = CANVAS_HEIGHT/2;
var dirBalleX = 1;
var dirBalleY = -1;
var boucleJeu;


// Se charge lorsqu'on recharge la page
window.addEventListener("load",function() {

  // On recupere le canvas et on le teste
  var canvas = document.getElementById('canvasPong');
  if (!canvas || !canvas.getContext) {
      return;	
  }

  // On recupere le contexte 2D
  ctx = canvas.getContext('2d');
  if (!ctx) {
      return;
  }

  // OK ... --> Initialisation de la plateforme
  initPlateFormePong(ctx, RAQUETTE_WIDTH, RAQUETTE_HEIGHT, CANVAS_WIDTH, posYRaqGauche, posYRaqDroite);

  // Rafraichissement du contexte 2D toutes les 10 ms
  boucleJeu = setInterval(refreshPong,10); // TODO: Implémenter ça avec la méthode [moz]AnimationRequest

  // Gestion des evenements
  window.document.onkeydown = gestionDeplacements;
  // TODO : Gestion des évenements pour que la raquette gauche puisse bouger
  // en même temps que la raquette droite...


}, false);

// Fonction qui initialise les deux raquettes
function initPlateFormePong(ctx, RAQUETTE_WIDTH, RAQUETTE_HEIGHT, CANVAS_WIDTH, posYRaqGauche, posYRaqDroite)
{
  ctx.fillStyle = COULEUR_RAQUETTES;  // Couleur des raquettes

  // Dessin de la raquette de gauche
  ctx.fillRect(CANVAS_WIDTH / 20, posYRaqGauche, RAQUETTE_WIDTH, RAQUETTE_HEIGHT);

  // Dessin de la raquette de droite
  ctx.fillRect(CANVAS_WIDTH - (CANVAS_WIDTH / 20), posYRaqDroite, RAQUETTE_WIDTH, RAQUETTE_HEIGHT);

  return 1;
}

// Fonction qui gere l'appui sur les touches
function gestionDeplacements(event)
{
  // Joueur Gauche : Touche Z : la raquette gauche monte
  if (event.keyCode == 90) 
  {
    // Evite la sortie de la raquette en haut
    if (posYRaqGauche - DEPLACEMENT_RAQUETTE >= 0)
      posYRaqGauche -= DEPLACEMENT_RAQUETTE;
  }
  // Joueur Gauche : Touche S : la raquette gauche descend
  else if (event.keyCode == 83)	
  {
    if (posYRaqGauche + DEPLACEMENT_RAQUETTE + RAQUETTE_HEIGHT <= CANVAS_HEIGHT)
      posYRaqGauche += DEPLACEMENT_RAQUETTE;
  }
  // Joueur Droite : Touche Haut : la raquette droite monte
  else if (event.keyCode == 38)
  {
    if (posYRaqDroite - DEPLACEMENT_RAQUETTE >= 0)
      posYRaqDroite -= DEPLACEMENT_RAQUETTE;
  }
  // Joueur Droite : Touche Bas : la raquette droite descend
  else if (event.keyCode == 40)	
  {
    if (posYRaqDroite + DEPLACEMENT_RAQUETTE + RAQUETTE_HEIGHT <= CANVAS_HEIGHT)
      posYRaqDroite += DEPLACEMENT_RAQUETTE;
  }
}

// Fonction qui affiche un message "Perdu" lorsque la balle sort de l'espace de jeu.
// Desactive le rafraichissement du contexte 2D.
function perdu () {
    clearInterval(boucleJeu);
    alert("Perdu !")
}

// Fonction qui rafraichit le contexte 2D
// Suppression de toutes les images et recréation de tous les éléments du contexte 
// repaint ...
function refreshPong ()
{
  // On supprime le fond
  clearCtx();

  // Et on recree  
  // Raquettes
  ctx.fillStyle = COULEUR_RAQUETTES;	// Couleur des raquettes
  ctx.fillRect(CANVAS_WIDTH / 20, posYRaqGauche, RAQUETTE_WIDTH, RAQUETTE_HEIGHT); // Raquette Gauche
  ctx.fillRect(CANVAS_WIDTH - (CANVAS_WIDTH / 20), posYRaqDroite, RAQUETTE_WIDTH, RAQUETTE_HEIGHT); // Raquette Droite

  // Si rebond contre les murs haut et bas
  if ((balleX + dirBalleX * VITESSE_BALLE) > CANVAS_WIDTH) dirBalleX = -1;// Si la balle touche le mur d'en bas
  else if ((balleX + dirBalleX * VITESSE_BALLE) < 0) dirBalleX = 1;	// Si la balle touche le mur d'en haut

  if ((balleY + dirBalleY * VITESSE_BALLE) > CANVAS_HEIGHT) dirBalleY = -1;
  else {
    if ((balleY + dirBalleY * VITESSE_BALLE) < 0) dirBalleY = 1;
    // Rebond sur la raquette
    else {      
      // Raquette droite
      // Si l'abscisse suivante de la balle est inferieure a l'abscisse du cote gauche de la raquette droite
      if (((balleX + dirBalleX * VITESSE_BALLE) > xRaquetteDroite)
	// Si l'ordonnee suivante de la balle est superieure au sommet de la raquette droite 
	&& ((balleY + dirBalleY * VITESSE_BALLE) > posYRaqDroite)
	// Si l'ordonnee suivante de la balle est inferieure au bas de la raquette droite
	&& ((balleY + dirBalleY * VITESSE_BALLE) < (posYRaqDroite + RAQUETTE_HEIGHT)))
      {
	dirBalleX = -1;
	//dirBalleY = 1;		// TO DO : A changer
      }
      
      // Raquette gauche
      // Si l'abscisse suivante de la balle est inferieure a l'abscisse du cote droit de la raquette gauche
      if (((balleX + dirBalleX * VITESSE_BALLE) < (xRaquetteGauche + RAQUETTE_WIDTH))
	// Si l'ordonnee suivante de la balle est superieure au sommet de la raquette gauche
	&& ((balleY + dirBalleY * VITESSE_BALLE) > (posYRaqGauche))
	// Si l'ordonnee suivante de la balle est inferieure au bas de la raquette gauche
	&& ((balleY + dirBalleY * VITESSE_BALLE) < (posYRaqGauche + RAQUETTE_HEIGHT)))
	{
	  dirBalleX = 1;	// Alors on va de l'autre cote
	  //dirBalleY= -1;	// TO DO : A changer
	}
  }
  }

  // Mouvement de la balle
  balleX += dirBalleX * VITESSE_BALLE;
  balleY += dirBalleY * VITESSE_BALLE;
  
  // Balle
  ctx.fillStyle = COULEUR_BALLE;
  ctx.beginPath();
  ctx.arc(balleX, balleY, DIMENSION_BALLE, 0, Math.PI*2, true);
  ctx.fill();
  
  // Perdu
  if ((balleX < xRaquetteGauche) || (balleX > (xRaquetteDroite + RAQUETTE_WIDTH)))
    perdu();
}

// Fonction qui supprime le contexte 2D
// Cree un espace blanc dans tout le contexte 2D
function clearCtx ()
{
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

