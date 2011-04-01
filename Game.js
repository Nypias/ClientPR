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
	
	this.game = function()
	{
		Ball(DIMENSION_BALLE, this.ball.x, this.ball.y, true);
		this.ancres = array;
		
		for (var i in this.tabJoueurs.nom)
		{
			ancres[i][0][0] = this.tabJoueurs.nom[i].ancre1.x * CANVAS_WIDTH;
			ancres[i][0][1] = this.tabJoueurs.nom[i].ancre1.y * CANVAS_HEIGHT;
			ancres[i][1][0] = this.tabJoueurs.nom[i].ancre2.x * CANVAS_WIDTH;
			ancres[i][1][1] = this.tabJoueurs.nom[i].ancre2.y * CANVAS_HEIGHT;
			
			ax = ((this.tabJoueurs.nom[i].ancre2.x - this.tabJoueurs.nom[i].ancre1.x) * this.tabJoueurs.nom[i].pos / 100 + this.tabJoueurs.nom[i].ancre1.x) * CANVAS_WIDTH;
			ay = ((this.tabJoueurs.nom[i].ancre2.y - this.tabJoueurs.nom[i].ancre1.y) * this.tabJoueurs.nom[i].pos / 100 + this.tabJoueurs.nom[i].ancre1.y) * CANVAS_HEIGHT;
			bx = Math.sqrt(Math.pow(ax + ancres[i][0][0] - ancres[i][1][0], 2)) * 0.10;
			by = Math.sqrt(Math.pow(ay + ancres[i][0][1] - ancres[i][1][1], 2)) * 0.10;
			
			Slider(ax, ay, bx, by);
		}
		
		PongZone(ancres);
	}


	nw.events.onSyncJ = this.setJoueurs;
	nw.events.onContact = this.setBall;
	nw.events.onSyncB = this.setBall;
}	
