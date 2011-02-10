function Game {

	this.tabJoueurs = {};
	this.ball = { x : 50, y : 50, dX : 0, dY : 0};
	this.nw = new Network();

	this.addJoueur = function(nom, ancre1, ancre2, pos)
	{
		this.tabJoueurs.nom = {ancreDep : ancre1,
								ancreArr : ancre2,
								position : pos};
	}
	
	this.supprJoueur = function(nom)
	{
		delete(this.tabJoueur.nom);
	}

	this.setBall = function(posX, posY, deltaX, deltaY )
	{
		this.ball.x = posX;
		this.ball.y = posY;
		this.ball.dX = deltaX;
		this.ball.dY = deltaY;
	}

	this.setJoueurs = function(tabJoueurs)
	{
		this.tabJoueurs = tabJoueurs;
	}


	nw.events.onSyncJ = this.setJoueurs;
	nw.events.onContact = this.setBall;
	nw.events.onSyncB = this.setBall;
}	
