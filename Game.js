var DIMENSION_BALLE = 5;

function Game() {

	this.setJoueurs = function(tabJoueurs)
	{
		alert("SetJoueur");
		this.tabJoueurs = tabJoueurs;
	};

	this.addJoueur = function(nom, ancre1, ancre2, pos)
	{
		this.tabJoueurs.nom = {ancreDep : ancre1,
				       ancreArr : ancre2,
				       position : pos};
	};
	
	this.supprJoueur = function(nom)
	{
		delete(this.tabJoueur.nom);
	};

	this.setBall = function(posX, posY, deltaX, deltaY)
	{
		this.Gball.x = (posX * this.scene.getWidth())/100;
		this.Gball.y = (posY * this.scene.getHeight())/100;
				       
		this.scene.clear();
		this.scene.components['Balle'].draw(this.scene.getCtx());
	};
	
	this.game = function()
	{
		if(!this.Gball) {
			this.Gball = new Ball(DIMENSION_BALLE, balle.x, balle.y, true);
		}
			
		this.ancres = [];
		var i=0;
		for (i=0; i < this.tabJoueurs.length; i++)
		{
			ancres[i][0][0] = this.tabJoueurs.nom[i].ancre1.x * this.scene.getWidth();
			ancres[i][0][1] = this.tabJoueurs.nom[i].ancre1.y * this.scene.getHeight();
			ancres[i][1][0] = this.tabJoueurs.nom[i].ancre2.x * this.scene.getWidth();
			ancres[i][1][1] = this.tabJoueurs.nom[i].ancre2.y * this.scene.getHeight();
			
			ax = ((this.tabJoueurs.nom[i].ancre2.x - this.tabJoueurs.nom[i].ancre1.x) * this.tabJoueurs.nom[i].pos / 100 + this.tabJoueurs.nom[i].ancre1.x) * this.scene.getWidth();
			ay = ((this.tabJoueurs.nom[i].ancre2.y - this.tabJoueurs.nom[i].ancre1.y) * this.tabJoueurs.nom[i].pos / 100 + this.tabJoueurs.nom[i].ancre1.y) * this.scene.getHeight();
			bx = Math.sqrt(Math.pow(ax + ancres[i][0][0] - ancres[i][1][0], 2)) * 0.10;
			by = Math.sqrt(Math.pow(ay + ancres[i][0][1] - ancres[i][1][1], 2)) * 0.10;
			
			if (!this.tabJoueurs[i].slider) {
				this.tabJoueurs[i].slider = Slider(ax, ay, bx, by);
			}
		}
		if(this.Gpongzone) {
			this.Gpongzone = PongZone(ancres);
		}
			
		this.scene.drawAll();
	};
		        
        // Joueurs
        this.tabJoueurs = {};	                

	this.nw = new Network(this);
	this.scene = new Scene();
	
	this.scene.attachCanvas("GameZone");
	
	// Balle
        this.balle = { x : 50, y : 50, dX : 0, dY : 0};
        if (!this.Gball) {
            this.Gball = new Ball(DIMENSION_BALLE, this.balle.x, this.balle.y, true);
        }
        this.scene.add("Balle",this.Gball);
	
	this.nw.connect();

}	
