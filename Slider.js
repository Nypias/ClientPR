function Slider(ax, ay, bx, by){
    this.a = {};
    this.b = {};
 
    this.a.x = ax;
    this.a.y = ay;
    this.b.x = bx;
    this.b.y = by;
    this.l = Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2));
    this.h = (this.l / 100) * 10;

    this.draw = function(ctx){
	ctx.save();
	ctx.translate(this.a.x, this.a.y);
	ctx.rotate(Math.abs(Math.asin((this.a.y - this.b.y) / this.l)) + Math.PI);
	ctx.beginPath();
	ctx.lineTo(-this.l, 0);
	ctx.lineTo(-this.l, this.h);
	ctx.lineTo(0, this.h);
	ctx.lineTo(0, 0);
	ctx.fill();
	ctx.restore();
    };
}