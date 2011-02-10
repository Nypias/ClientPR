function Scene {

    var tabComponent = [];

    add = function (comp)
    {
	if (comp.draw || comp.in)
	    tabComponent += comp;
	else
	    return;
    }

    drawAll = function()
    {
	for (i=0; i < tabComponent.length; i++)
	{
	    if (comp.draw)
		tabComponent[i].draw();
	}
    }

}