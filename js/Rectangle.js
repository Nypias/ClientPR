function Rectangle(x, y, w, h){
  var couleurRect = "rgb(255,255,255)";
  
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.draw = function(ctx){
    ctx.fillStyle = couleurRect;
    ctx.strokeRect(this.x, this.y, this.w, this.h);
  }
}