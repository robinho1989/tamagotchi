import Abilities from './modules/abilities';
import Tamagotchi from './modules/tamagotchi';

export default class Game {
	constructor(actionElements) {
		this.tamagotchi = new Tamagotchi(actionElements);
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
	reset = () => {
		this.abilities.resetGame();
	};
}
