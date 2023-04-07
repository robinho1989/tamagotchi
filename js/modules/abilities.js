export default class Abilities {
	constructor(tamagotchi, actionElements) {
		this.tamagotchi = tamagotchi;
		this.feedingButton = document.querySelector(actionElements.feedingButton);
		this.sleepingButton = document.querySelector(actionElements.sleepingButton);
		this.playingButton = document.querySelector(actionElements.playingButton);
		this.animatedImage = document.querySelector(actionElements.animatedImage);
		this.feedingActionInterval = null;
		this.sleepingActionInterval = null;
		console.log('Abilities module initialized');
	}
	abilities = () => {
		this.feedingButton.addEventListener('mousedown', this.feedingValue);
		this.feedingButton.addEventListener('mouseup', this.resetFeedingValue);
		this.sleepingButton.addEventListener('mousedown', this.sleepingValue);
		this.sleepingButton.addEventListener('mouseup', this.resetSleepingValue);
		this.playingButton.addEventListener('mousedown', this.playingValue);
		this.playingButton.addEventListener('mouseup', this.resetPlayingValue);
	};

	feedingValue = () => {
		this.tamagotchi.updateState = this.tamagotchi.states.eating.stateName;
		this.feedingActionInterval = setInterval(() => {
			this.tamagotchi.hunger.value += 3;
			if (this.tamagotchi.hunger.value > 10) {
				this.stopFeeding();
			}
		}, 1000);
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
		this.sleepingActionInterval = setInterval(() => {
			if (this.tamagotchi.fun.value <= 0) {
				this.tamagotchi.energy.value += 2;
			} else {
				this.tamagotchi.energy.value += 3;
			}

			if (this.tamagotchi.energy.value > 10) {
				this.tamagotchi.energy.value = 10;
				this.stopSleeping();
			}
		}, 1000);
		if (
			this.tamagotchi.currentState !== this.tamagotchi.states.dead.stateName
		) {
			this.animatedImage.classList.add('sleepingState');
		} else if (this.tamagotchi.health.value === 0) {
			this.animatedImage.classList.remove('sleepingState');
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
	resetFeedingValue = () => {
		this.tamagotchi.updateState = null;
		this.animatedImage.classList.remove('animatedState');
		this.tamagotchi.displayHunger(this.tamagotchi.hunger.element);
		this.stopFeeding();
	};
	resetSleepingValue = () => {
		this.tamagotchi.updateState = null;
		this.animatedImage.classList.remove('sleepingState');
		this.tamagotchi.displayEnergy(this.tamagotchi.energy.element);
		this.stopSleeping();
	};
	resetPlayingValue = () => {
		this.tamagotchi.updateState = null;
		this.animatedImage.classList.remove('playingState');
	};

	stopFeeding = () => {
		this.feedingActionInterval && clearInterval(this.feedingActionInterval);
	};

	stopSleeping = () => {
		this.sleepingActionInterval && clearInterval(this.sleepingActionInterval);
	};
}
