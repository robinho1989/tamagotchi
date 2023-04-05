import Abilities from './modules/abilities.js';
import Tamagotchi from './modules/tamagotchi.js';

export default class Game {
	constructor(actionElements) {
		this.tamagotchi = new Tamagotchi();
		this.abilities = new Abilities(this.tamagotchi, actionElements);
	}

	start = ({ healthElement, hungerElement, energyElement, funElement }) => {
		this.tamagotchi.mount({
			healthElement,
			hungerElement,
			energyElement,
			funElement,
		});
	};
	play = () => {
		this.abilities.abilities();
	};
}
