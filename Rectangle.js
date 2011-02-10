function Rectangle(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.draw = function(ctx){
	ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
}