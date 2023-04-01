import Game from './js/game.js';

document.addEventListener('DOMContentLoaded', () => {
	const game = new Game({
		feedingButton: '.feedingButton',
		sleepingButton: '.sleepingButton',
		playingButton: '.playingButton',
		animatedImage: '.tamagotchiImage',
	});

	// Start game
	game.start({
		healthElement: '.health',
		hungerElement: '.hunger',
		energyElement: '.energy',
		funElement: '.fun',
	});
	game.play();
});
