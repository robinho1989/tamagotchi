export default class Abilities {
	constructor(tamagotchi) {
		this.tamagotchi = tamagotchi;

		console.log('Abilities module initialized');
	}
	abilities = ({ actionButtons }) => {
		const buttons = document.querySelectorAll(actionButtons);

		buttons.forEach((button) => {
			button.addEventListener('mousedown', () => {
				console.log(` ab ${this.tamagotchi.activeState()}`);
				if (button.classList.contains('feedingButton')) {
					this.tamagotchi.currentState =
						this.tamagotchi.states.eating.stateName;
				}
			});
		});
	};
}
