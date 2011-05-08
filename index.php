<!DOCTYPE html>
<html>
  <head>
    <title>Pongroulette</title>
    <meta charset="utf-8" />
    <link href="pongroulette.css" rel="stylesheet" />
  </head>
  <body>
    <div id="jolilogo"><img src="ponglogo.png" alt="Pongroulette" /></div>
    <div id="enteryourname">
      <form action="pongroulette.php" method="POST">
        <h3>Bienvenue dans l'expérience <strong>Pong</strong>roulette</h3>
        <p><label for="nomdujoueur">Veuillez indiquer le nom du joueur :</label>
          <input placeholder="&lt;Nom du joueur&gt;" id="nomdujoueur" name="nomdujoueur" /></p>
        <p class="w-commencer"><input id="commencer" type="submit" value="Commencer le jeu" /></p>
      </form>
    </div>
  </body>
</html>