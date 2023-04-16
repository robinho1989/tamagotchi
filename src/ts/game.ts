import Abilities from './modules/abilities';
import Tamagotchi from './modules/tamagotchi';
import { MountProps, ActionElements } from './types';
export default class Game {
	tamagotchi: Tamagotchi;
	abilities: Abilities;
	constructor(actionElements: ActionElements) {
		this.tamagotchi = new Tamagotchi(actionElements);
		this.abilities = new Abilities(this.tamagotchi, actionElements);
	}

	start = ({
		healthElement,
		hungerElement,
		energyElement,
		funElement,
	}: MountProps) => {
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
