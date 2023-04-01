export default class Abilities {
	constructor(tamagotchi, actionButtons) {
		this.tamagotchi = tamagotchi;
		// this.activeState = tamagotchi.activeState();
		this.updateState = tamagotchi.updateState;
		this.feedingButton = document.querySelector(actionButtons.feedingButton);
		this.sleepingButton = document.querySelector(actionButtons.sleepingButton);
		this.playingButton = document.querySelector(actionButtons.playingButton);
		console.log('Abilities module initialized');
	}
	abilities = () => {
		// this.activeState;

		this.feedingButton.addEventListener('mousedown', this.feedingValue);
		this.feedingButton.addEventListener('mouseup', this.resetValue);
		this.sleepingButton.addEventListener('mousedown', this.sleepingValue);
		this.sleepingButton.addEventListener('mouseup', this.resetValue);
		this.playingButton.addEventListener('mousedown', this.playingValue);
		this.playingButton.addEventListener('mouseup', this.resetValue);
	};
	feedingValue = () => {
		this.tamagotchi.updateState = this.tamagotchi.states.eating.stateName;
	};
	sleepingValue = () => {
		this.tamagotchi.updateState = this.tamagotchi.states.sleeping.stateName;
	};
	playingValue = () => {
		this.tamagotchi.updateState = this.tamagotchi.states.playing.stateName;
	};
	resetValue = () => {
		this.tamagotchi.updateState = null;
	};
}
