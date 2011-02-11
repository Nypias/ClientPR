function Ball(radius, x, y, full){
    this.radius = radius;
    this.x = x;
    this.y = y;

    this.draw = function(ctx){
	ctx.beginPath();
	ctx.arc(this.x, this.y, radius, 0, Math.PI*2, true);
	if (full)
	    ctx.fill();
	else
	    ctx.stroke();
    };

    this.moveTo = function(x, y){
	this.x = x;
	this.y = y;
    };
}