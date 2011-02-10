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

    this.attachCanvas = function(name){
	this.ctx = document.getElementById(name).getContext('2d');
    }
}