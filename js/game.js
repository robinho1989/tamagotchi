import Tamagotchi from './modules/tamagotchi.js';

export default class Game {
	constructor() {
		this.tamagotchi = new Tamagotchi();
	}

	start = ({
		feedingButton,
		sleepingButton,
		playingButton,
		healthElement,
		hungerElement,
		energyElement,
		funElement,
		imageSelector,
	}) => {
		this.tamagotchi.mount({
			feedingButton,
			sleepingButton,
			playingButton,
			healthElement,
			hungerElement,
			energyElement,
			funElement,
			imageSelector,
		});
	};
}
