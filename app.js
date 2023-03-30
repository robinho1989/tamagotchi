import Game from "./js/game.js";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game({
    feedingButton: ".feedingButton",
    sleepingButton: ".sleepingButton",
    playingButton: ".playingButton",
  });

  // Start game
  game.start({
    healthElement: ".health",
    hungerElement: ".hunger",
    energyElement: ".energy",
    funElement: ".fun",
    imageSelector: ".tamagotchiImage",
  });
  game.play({ actionButtons: ".gameButton" });
});
