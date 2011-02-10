function Scene() {
 
    this.components = {};

    this.add = function(comp, name)
    {
	if (comp.draw)
	    tabComponent[name] = comp;
	else
	    return;
    }

    this.drawAll = function()
    {
	for (var i in tabComponent)
	{
	    tabComponent[i].draw(this.ctx);
	}
    }

    this.attachCanvas = function(name){
	this.ctx = document.getElementById(name).getContext('2d');
    }
}