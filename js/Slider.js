function Slider(ax, ay, bx, by, positionR, tailleSlider)
// position correspond a la position du bord gauche de la raquette en pourcentage
{
  var couleurSlider = 'rgb(255,255,255)';
  this.position = positionR;
  this.positionPixels = {};
  this.ancreDep = {};
  this.ancreArr = {};
  this.ratio = 5;
  this.taille = tailleSlider;
  this.tailleRaqDep = 0.4;
  this.tailleRaqArr = 0.6;

  this.ancreDep.x = ax;
  this.ancreDep.y = ay;
  this.ancreArr.x = bx;
  this.ancreArr.y = by;
  this.longueur = Math.sqrt(Math.pow((this.ancreArr.x - this.ancreDep.x)*this.tailleRaqArr - (this.ancreArr.x - this.ancreDep.x)*this.tailleRaqDep, 2) +
           Math.pow((this.ancreArr.y - this.ancreDep.y)*this.tailleRaqArr - (this.ancreArr.y - this.ancreDep.y)*this.tailleRaqDep, 2));
  this.positionPixels.x = (((this.ancreArr.x - this.ancreDep.x)*(this.position - 10))/100)+this.ancreDep.x;
  this.positionPixels.y = (((this.ancreArr.y - this.ancreDep.y)*(this.position - 10))/100)+this.ancreDep.y;

  this.h = 7;
  //this.angle = /*Math.abs(Math.acos((this.ancreArr.y - this.ancreDep.y) / this.longueur)) +*/ Math.PI/2 ;
  this.angle = Math.acos((this.ancreArr.y - this.ancreDep.y) / Math.sqrt(( Math.pow(this.ancreArr.x - this.ancreDep.x, 2) + Math.pow(this.ancreArr.y - this.ancreDep.y, 2) )));

  this.draw = function(ctx){
    ctx.fillStyle = couleurSlider;
    ctx.save();
    ctx.translate(this.positionPixels.x, this.positionPixels.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.lineTo(0, this.longueur);
    ctx.lineTo(this.h, this.longueur);
    ctx.lineTo(this.h, 0);
    ctx.lineTo(0, 0);
    ctx.fill();
    ctx.restore();
  };
  
  this.changePosition = function (pos)
  {
    this.position = pos;
    this.positionPixels.x = (((this.ancreArr.x - this.ancreDep.x)*(this.position - 10))/100)+this.ancreDep.x;
    this.positionPixels.y = (((this.ancreArr.y - this.ancreDep.y)*(this.position - 10))/100)+this.ancreDep.y;
  };

  this.moveTo = function(ax, ay){
    this.position.x = ax;
    this.position.y = ay;
  };
  
  this.changeAncres = function (ancreDepart, ancreArrivee)
  {
    this.ancreDep = ancreDepart;
    this.ancreArr = ancreArrivee;
  };

}
