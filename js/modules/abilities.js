export default class Abilities {
	constructor(tamagotchi, actionElements) {
		this.tamagotchi = tamagotchi;
		this.feedingButton = document.querySelector(actionElements.feedingButton);
		this.sleepingButton = document.querySelector(actionElements.sleepingButton);
		this.playingButton = document.querySelector(actionElements.playingButton);
		this.animatedImage = document.querySelector(actionElements.animatedImage);
		console.log('Abilities module initialized');
	}
	abilities = () => {
		this.feedingButton.addEventListener('mousedown', this.feedingValue);
		this.feedingButton.addEventListener('mouseup', this.resetValue);
		this.sleepingButton.addEventListener('mousedown', this.sleepingValue);
		this.sleepingButton.addEventListener('mouseup', this.resetValue);
		this.playingButton.addEventListener('mousedown', this.playingValue);
		this.playingButton.addEventListener('mouseup', this.resetPlayingValue);
	};
	feedingValue = () => {
		this.tamagotchi.updateState = this.tamagotchi.states.eating.stateName;
		if (
			this.tamagotchi.currentState !== this.tamagotchi.states.dead.stateName
		) {
			this.animatedImage.classList.add('animatedState');
		} else if (this.tamagotchi.health.value === 0) {
			this.animatedImage.classList.remove('animatedState');
		}
	};
	sleepingValue = () => {
		this.tamagotchi.updateState = this.tamagotchi.states.sleeping.stateName;
		if (
			this.tamagotchi.currentState !== this.tamagotchi.states.dead.stateName
		) {
			this.animatedImage.classList.add('animatedState');
		} else if (this.tamagotchi.health.value === 0) {
			this.animatedImage.classList.remove('animatedState');
		}
	};
	playingValue = () => {
		this.tamagotchi.updateState = this.tamagotchi.states.playing.stateName;
		if (
			this.tamagotchi.currentState !== this.tamagotchi.states.dead.stateName
		) {
			this.animatedImage.classList.add('playingState');
		} else if (this.tamagotchi.health.value === 0) {
			this.animatedImage.classList.remove('playingState');
		}
	};
	resetValue = () => {
		this.tamagotchi.updateState = null;
		this.animatedImage.classList.remove('animatedState');
	};
	resetPlayingValue = () => {
		this.tamagotchi.updateState = null;
		this.animatedImage.classList.remove('playingState');
	};
}
