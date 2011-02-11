function Ball(radius, x, y){
    this.radius = radius;
    this.x = x;
    this.y = y;

    this.draw = function(ctx){
	ctx.beginPath();
	ctx.arc(this.x, this.y, radius, 0, Math.PI*2, true);
	ctx.fill();
    };

    this.moveTo = function(x, y){
	this.x = x;
	this.y = y;
    };
}