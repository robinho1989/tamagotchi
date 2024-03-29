import { ActionElements } from '../types';
import Tamagotchi from './tamagotchi';

export default class Abilities {
	private tamagotchi: Tamagotchi;
	private feedingButton: HTMLButtonElement | null;
	private sleepingButton: HTMLButtonElement | null;
	private playingButton: HTMLButtonElement | null;
	private animatedImage: HTMLImageElement | null;
	private feedingActionInterval: number | null;
	private sleepingActionInterval: number | null;
	private playingActionInterval: number | null;

	constructor(tamagotchi: Tamagotchi, actionElements: ActionElements) {
		this.tamagotchi = tamagotchi;
		this.feedingButton = document.querySelector(actionElements.feedingButton);
		this.sleepingButton = document.querySelector(actionElements.sleepingButton);
		this.playingButton = document.querySelector(actionElements.playingButton);
		this.animatedImage = document.querySelector(actionElements.animatedImage);
		this.feedingActionInterval = null;
		this.sleepingActionInterval = null;
		this.playingActionInterval = null;
		console.log('Abilities module initialized');
	}
	abilities = () => {
		if (
			this.feedingButton === null ||
			this.sleepingButton === null ||
			this.playingButton === null
		) {
			throw new Error('One of buttons not found');
		}
		this.feedingButton.addEventListener('mousedown', this.feedingValue);
		this.feedingButton.addEventListener('mouseup', this.resetFeedingValue);
		this.sleepingButton.addEventListener('mousedown', this.sleepingValue);
		this.sleepingButton.addEventListener('mouseup', this.resetSleepingValue);
		this.playingButton.addEventListener('mousedown', this.playingValue);
		this.playingButton.addEventListener('mouseup', this.resetPlayingValue);
	};

	feedingValue = () => {
		if (this.animatedImage === null) {
			throw new Error('An image not found');
		}
		this.tamagotchi.updateState = this.tamagotchi.states.eating.stateName;
		this.feedingActionInterval = setInterval(() => {
			this.tamagotchi.hunger.value += 3;
			if (this.tamagotchi.hunger.value > 10) {
				this.tamagotchi.hunger.value = 10;
				this.stopFeeding();
			}
		}, 1000);
		if (
			this.tamagotchi.currentState !== this.tamagotchi.states.dead.stateName
		) {
			this.animatedImage.classList.add('animatedState');
			this.animatedImage.classList.remove('sleepingState');
			this.animatedImage.classList.remove('playingState');
		} else if (this.tamagotchi.health.value === 0) {
			this.animatedImage.classList.remove('animatedState');
		}
	};
	sleepingValue = () => {
		if (this.animatedImage === null) {
			throw new Error('An image not found');
		}
		this.tamagotchi.updateState = this.tamagotchi.states.sleeping.stateName;
		this.sleepingActionInterval = setInterval(() => {
			if (this.tamagotchi.fun.value <= 0) {
				this.tamagotchi.energy.value += 2;
			} else {
				this.tamagotchi.energy.value += 3;
			}

			if (this.tamagotchi.energy.value > 10) {
				this.stopSleeping();
			}
		}, 1000);
		if (
			this.tamagotchi.currentState !== this.tamagotchi.states.dead.stateName
		) {
			this.animatedImage.classList.add('sleepingState');
			this.animatedImage.classList.remove('animatedState');
			this.animatedImage.classList.remove('playingState');
		} else if (this.tamagotchi.health.value === 0) {
			this.animatedImage.classList.remove('sleepingState');
		}
	};
	playingValue = () => {
		if (this.animatedImage === null) {
			throw new Error('An image not found');
		}
		this.tamagotchi.updateState = this.tamagotchi.states.playing.stateName;
		this.playingActionInterval = setInterval(() => {
			this.tamagotchi.fun.value += 3;
			this.tamagotchi.energy.value -= 1;
			if (this.tamagotchi.fun.value > 10) {
				this.stopPlaying();
			}
		}, 1000);
		if (
			this.tamagotchi.currentState !== this.tamagotchi.states.dead.stateName
		) {
			this.animatedImage.classList.add('playingState');
			this.animatedImage.classList.remove('sleepingState');
			this.animatedImage.classList.remove('animatedState');
		} else if (this.tamagotchi.health.value === 0) {
			this.animatedImage.classList.remove('playingState');
		}
	};
	resetFeedingValue = () => {
		if (this.animatedImage === null) {
			throw new Error('An image not found');
		}
		if (this.tamagotchi.hunger.element === null) {
			throw new Error('Hunger element not found');
		}
		this.tamagotchi.updateState = null;
		this.animatedImage.classList.remove('animatedState');
		this.tamagotchi.displayHunger(this.tamagotchi.hunger.element);
		this.stopFeeding();
	};
	resetSleepingValue = () => {
		if (this.animatedImage === null) {
			throw new Error('An image not found');
		}
		if (this.tamagotchi.energy.element === null) {
			throw new Error('Energy element not found');
		}
		this.tamagotchi.updateState = null;
		this.animatedImage.classList.remove('sleepingState');
		this.tamagotchi.displayEnergy(this.tamagotchi.energy.element);
		this.stopSleeping();
	};
	resetPlayingValue = () => {
		if (this.animatedImage === null) {
			throw new Error('An image not found');
		}
		this.tamagotchi.updateState = null;
		this.animatedImage.classList.remove('playingState');
		this.stopPlaying();
	};

	stopFeeding = () => {
		this.feedingActionInterval && clearInterval(this.feedingActionInterval);
	};

	stopSleeping = () => {
		this.sleepingActionInterval && clearInterval(this.sleepingActionInterval);
	};
	stopPlaying = () => {
		this.playingActionInterval && clearInterval(this.playingActionInterval);
	};
	resetGame = () => {
		if (this.tamagotchi.restartButton === null) {
			throw new Error('Restart button not found');
		}
		this.tamagotchi.restartButton.addEventListener('click', this.handleReset);
	};
	handleReset = () => {
		if (
			this.tamagotchi.gameButtons === null ||
			this.tamagotchi.restartButton === null
		) {
			throw new Error('One of action buttons not found');
		}
		if (
			this.tamagotchi.energy.element === null ||
			this.tamagotchi.hunger.element === null ||
			this.tamagotchi.health.element === null ||
			this.tamagotchi.fun.element === null
		) {
			throw new Error('One of elements not found');
		}
		this.tamagotchi.gameButtons.style.display = 'flex';
		this.tamagotchi.restartButton.style.display = 'none';
		this.tamagotchi.health.value = 10;
		this.tamagotchi.hunger.value = 10;
		this.tamagotchi.energy.value = 10;
		this.tamagotchi.fun.value = 10;
		this.tamagotchi.displayEnergy(this.tamagotchi.energy.element);
		this.tamagotchi.displayHunger(this.tamagotchi.hunger.element);
		this.tamagotchi.displayHealth(this.tamagotchi.health.element);
		this.tamagotchi.displayFun(this.tamagotchi.fun.element);
		this.feedingActionInterval = null;
		this.sleepingActionInterval = null;
		this.playingActionInterval = null;
		this.tamagotchi.activeState();
		this.tamagotchi.displayState();
		this.tamagotchi.energyDecrease();
		this.tamagotchi.hungerDecrease();
		this.tamagotchi.funDecrease();
		this.tamagotchi.healthDecrease();
	};
}
