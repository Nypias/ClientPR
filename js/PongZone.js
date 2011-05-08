function PongZone(array){
  var couleurPZ = "rgba(255,255,255,0.5)";
  
  this.sides = array;

  this.draw = function(ctx){
    ctx.strokeStyle = couleurPZ;
    for (var i in this.sides){
      ctx.beginPath();
      ctx.moveTo(this.sides[i][0][0], this.sides[i][0][1]);
      ctx.lineTo(this.sides[i][1][0], this.sides[i][1][1]);
      ctx.stroke();
    }
  };

  this.setSides = function(array){
    this.sides = array;
  };
}