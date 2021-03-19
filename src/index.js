const View = require("./ttt-view")
const Game = require("../solution/game.js")

  $(() => {
    // Your code here
    const game = new Game;
    new View(game,$("figure"));
  });
