import Abilities from './modules/abilities.js';
import Tamagotchi from './modules/tamagotchi.js';

export default class Game {
	constructor(actionButtons) {
		this.tamagotchi = new Tamagotchi();
		this.abilities = new Abilities(this.tamagotchi, actionButtons);
	}

	start = ({
		healthElement,
		hungerElement,
		energyElement,
		funElement,
		imageSelector,
	}) => {
		this.tamagotchi.mount({
			healthElement,
			hungerElement,
			energyElement,
			funElement,
			// imageSelector,
		});
	};
	play = () => {
		this.abilities.abilities();
	};
}
