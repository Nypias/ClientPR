var DIMENSION_BALLE = 5;

function Game() {

	this.setJoueurs = function(tabJoueurs)
	{
		alert("SetJoueur")
		this.tabJoueurs = tabJoueurs;
	}

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

	this.setBall = function(posX, posY, deltaX, deltaY)
	{
		//alert("setBall")
		this.ball.x = posX;
		this.ball.y = posY;
		this.ball.dX = deltaX;
		this.ball.dY = deltaY;
	}
	
	this.game = function()
	{
		if(!this.Gball)
			this.Gball = Ball(DIMENSION_BALLE, this.ball.x, this.ball.y, true);
			
		this.ancres = [];
		
		for (var i in this.tabJoueurs.nom)
		{
			ancres[i][0][0] = this.tabJoueurs.nom[i].ancre1.x * this.scene.getWidth();
			ancres[i][0][1] = this.tabJoueurs.nom[i].ancre1.y * this.scene.getHeight();
			ancres[i][1][0] = this.tabJoueurs.nom[i].ancre2.x * this.scene.getWidth();
			ancres[i][1][1] = this.tabJoueurs.nom[i].ancre2.y * this.scene.getHeight();
			
			ax = ((this.tabJoueurs.nom[i].ancre2.x - this.tabJoueurs.nom[i].ancre1.x) * this.tabJoueurs.nom[i].pos / 100 + this.tabJoueurs.nom[i].ancre1.x) * this.scene.getWidth();
			ay = ((this.tabJoueurs.nom[i].ancre2.y - this.tabJoueurs.nom[i].ancre1.y) * this.tabJoueurs.nom[i].pos / 100 + this.tabJoueurs.nom[i].ancre1.y) * this.scene.getHeight();
			bx = Math.sqrt(Math.pow(ax + ancres[i][0][0] - ancres[i][1][0], 2)) * 0.10;
			by = Math.sqrt(Math.pow(ay + ancres[i][0][1] - ancres[i][1][1], 2)) * 0.10;
			
			if (!this.tabJoueurs[i].slider)
				this.tabJoueurs[i].slider = Slider(ax, ay, bx, by);
		}
		if(this.Gpongzone)
			this.Gpongzone = PongZone(ancres);
			
		this.scene.drawAll();
	}
	
	
	
	this.tabJoueurs = {};
	this.ball = { x : 50, y : 50, dX : 0, dY : 0};
	this.nw = new Network();
	this.scene = new Scene();
	
	this.scene.attachCanvas("GameZone");
	
	this.nw.events.onSyncJ = this.setJoueurs;
	this.nw.events.onContact = this.setBall;
	
	this.nw.connect();

}	
