import Abilities from './modules/abilities.js';
import Tamagotchi from './modules/tamagotchi.js';

export default class Game {
	constructor() {
		this.tamagotchi = new Tamagotchi();
		this.abilities = new Abilities(this.tamagotchi);
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
	play = ({ actionButtons }) => {
		this.abilities.abilities({ actionButtons });
	};
}
