function Scene {

    var tabComponent = [];

    add = function (comp)
    {
	if (comp.draw || comp.in)
	    tabComponent += comp;
	else
	    return;
    }

}