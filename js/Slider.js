function Slider(ax, ay, bx, by){
  var couleurSlider = 'rgb(255,255,255)';
  this.a = {};
  this.b = {};
  this.ratio = 5;

  this.a.x = ax;
  this.a.y = ay;
  this.l = Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2));
  //this.h = (this.l / 100) * this.ratio;
  //alert(this.h);
  this.h = 7;
  this.angle = Math.abs(Math.asin((this.a.y - by) / this.l)) + Math.PI;

  this.draw = function(ctx){
    ctx.fillStyle = couleurSlider;
    ctx.save();
    ctx.translate(this.a.x, this.a.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.lineTo(-this.l, 0);
    ctx.lineTo(-this.l, this.h);
    ctx.lineTo(0, this.h);
    ctx.lineTo(0, 0);
    ctx.fill();
    ctx.restore();
  };

  this.moveTo = function(ax, ay){
    this.a.x = ax;
    this.a.y = ay;
  };
  
  this.slide = function(distance){

  };
}
