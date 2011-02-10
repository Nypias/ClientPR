function Scene() {

    var components = {};

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
	    tabComponent[i].draw();
	}
    }
}