import Game from './js/game.js';

document.addEventListener('DOMContentLoaded', () => {
	const game = new Game();

	// Start game
	game.start({
		feedingButton: '.feedingButton',
		sleepingButton: '.sleepingButton',
		playingButton: '.playingButton',
		healthElement: '.health',
		hungerElement: '.hunger',
		energyElement: '.energy',
		funElement: '.fun',
		imageSelector: '.tamagotchiImage',
	});
	game.play({ actionButtons: '.gameButton' });
});
