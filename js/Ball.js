/**
 * S'occupe de garder en mémoire l'état d'une balle à l'écran,
 * et permet de la tracer.
 * @param radius Le rayon de la balle.
 * @param x L'abscisse initiale de la balle.
 * @param y L'ordonnée initiale de la balle.
 */
function Ball(radius, x, y, full){
  var couleurBall = 'rgb(255,102,0)';
  
  this.radius = radius;
  this.x = x;
  this.y = y;

  /**
   * Trace la balle sur le contexte donné à ses coordonnées actuelles.
   * @param ctx Le contexte surlequel tracer la balle.
   */
  this.draw = function(ctx){
    ctx.fillStyle = couleurBall;
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, Math.PI*2, true);
    if (full)  {
      ctx.fill();
    }
    else {
      ctx.stroke();
    }
  };

  /**
   * Modifie les coordonnées de la balle.
   * @param x La nouvelle abscisse de la balle.
   * @param y La nouvelle ordonnée de la balle.
   */
  this.moveTo = function(x, y){
    this.x = x;
    this.y = y;
  };
}
