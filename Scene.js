function Scene() {
 
    this.components = {};

    this.add = function(name, comp)
    {
	if (comp.draw)
	    this.components[name] = comp;
	else
	    return;
    }

    this.drawAll = function()
    {
	for (var i in this.components)
	{
	    this.components[i].draw(this.ctx);
	}
    }

    this.clear = function(){
	alert(this.canvas.width +" "+ this.canvas.height);
	
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
    }

    this.rotate = function(x, y, angle){
	this.ctx.save();
	this.clear();
	this.ctx.translate(x, y);
	this.ctx.rotate(angle);
	this.drawAll();
	this.ctx.restore();
    }

    this.attachCanvas = function(name){
	this.canvas = document.getElementById(name);
	this.ctx = this.canvas.getContext('2d');
    }
}