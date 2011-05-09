<!DOCTYPE html>
<html>
  <head>
    <title>Pongroulette</title>
    <meta charset="utf-8" />
    <link href="pongroulette.css" rel="stylesheet" />
    <style>
    #GameZone
    {
      border:3px solid black;
      margin:0 auto;
    }
    </style>
    <script src="js/Game.js" type="text/javascript"></script> 
    <script src="js/PongZone.js" type="text/javascript"></script> 
    <script src="js/Network.js" type="text/javascript"></script> 
    <script src="js/Scene.js" type="text/javascript"></script> 
    <script src="js/Slider.js" type="text/javascript"></script> 
    <script src="js/Rectangle.js" type="text/javascript"></script> 
    <script src="js/Ball.js" type="text/javascript"></script> 
    <script src="js/jquery-1.6.min.js" type="text/javascript"></script> 
    <script src="js/jquery.jkey-1.1.js" type="text/javascript"></script> 
    <script type="text/javascript">
      var game = null;
      $(document).ready(function(){
        game = new Game(); 
        game.game();
        $(window).jkey('up, down, left, right', function(key){
          console.log(key);
          if (key == 'up'){
              //alert(game.tabJoueurs['Thomas'].position);
              game.moveSlider(game.tabJoueurs['Thomas'].slider, game.tabJoueurs['Thomas'].position - 4);
          }
          else if (key == 'down'){
              //alert(game.tabJoueurs['Thomas'].position);
              game.moveSlider(game.tabJoueurs['Thomas'].slider, game.tabJoueurs['Thomas'].position + 4);
          
          }
        });
      });
    </script>
  </head>
  <body>
    <h2>PongRoulette</h1>
    <div id="playground">
      <canvas id="GameZone" width="800" height="350">
        Navigateur ne supporte pas le HTML5 Canvas.
      </canvas>
      <p class="instructions">
        Le joueur contrôle sa raquette avec les flèches "Haut" et "Bas" du clavier.
      </p>
    </div>
  </body>
</html>
