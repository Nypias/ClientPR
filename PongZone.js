function PongZone(array){
    this.sides = array;

    this.draw = function(ctx){
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