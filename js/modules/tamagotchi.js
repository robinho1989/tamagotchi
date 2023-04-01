export default class Tamagotchi {
	constructor() {
		this.health = { value: 10, importance: 1, element: null };
		this.hunger = { value: 10, importance: 3, element: null };
		this.energy = { value: 10, importance: 2, element: null };
		this.fun = { value: 10, importance: 4, element: null };
		this.updateState = null;
		this.states = {
			happy: {
				stateName: 'happy',
				element: null,
				path: './images/spritesheets/happyTamatgochi.png',
			},
			dead: {
				stateName: 'dead',
				element: null,
				path: './images/spritesheets/spritesheet-dead.png',
			},
			sad: {
				stateName: 'sad',
				element: null,
				path: './images/spritesheets/spritesheet-sitting.png',
			},
			hungry: {
				stateName: 'hungry',
				element: null,
				path: './images/spritesheets/spritesheet-hungry.png',
			},
			sleepy: {
				stateName: 'sleepy',
				element: null,
				path: './images/spritesheets/spritesheet-sleepy.png',
			},
			eating: {
				stateName: 'eating',
				element: null,
				path: './images/spritesheets/spritesheet-eating.png',
			},
			playing: {
				stateName: 'playing',
				element: null,
				path: './images/spritesheets/spritesheet-playing.png',
			},
			sleeping: {
				stateName: 'sleeping',
				element: null,
				path: './images/spritesheets/spritesheet-sleeping.png',
			},
		};
		this.currentState = this.states.happy.stateName;

		console.log('Tamagotchi initialized');

		this.healthDecrease();
		this.energyDecrease();
		this.hungerDecrease();
		this.funDecrease();
	}
	displayNewState = () => {
		return this.updateState;
	};
	displayHealth = (elementSelector) => {
		const displayElement = document.querySelector(elementSelector);
		displayElement.innerText = this.health.value;
	};
	displayHunger = (elementSelector) => {
		const displayElement = document.querySelector(elementSelector);
		displayElement.innerText = this.hunger.value;
	};
	displayEnergy = (elementSelector) => {
		const displayElement = document.querySelector(elementSelector);
		displayElement.innerText = this.energy.value;
	};
	displayFun = (elementSelector) => {
		const displayElement = document.querySelector(elementSelector);
		displayElement.innerText = this.fun.value;
	};
	displayParagraph = (textContent) => {
		const paragraph = document.querySelector('.tamagotchiStates');
		paragraph.textContent = textContent;
	};
	activeState = () => {
		if (this.health.value <= 0) {
			this.currentState = this.states.dead.stateName;
			return this.currentState;
		} else if (this.updateState !== null) {
			this.currentState = this.updateState;
			return this.currentState;
		} else if (
			this.energy.value <= 6 ||
			this.hunger.value <= 6 ||
			this.fun.value <= 6
		) {
			if (
				this.energy.importance === 4 ||
				this.hunger.importance === 4 ||
				this.fun.importance === 4
			) {
				this.currentState = this.states.sad.stateName;
				return this.currentState;
			} else if (
				this.energy.importance === 3 ||
				this.hunger.importance === 3 ||
				this.fun.importance === 3
			) {
				this.currentState = this.states.hungry.stateName;
				return this.currentState;
			} else if (
				this.energy.importance === 2 ||
				this.hunger.importance === 2 ||
				this.fun.importance === 2
			) {
				this.currentState = this.states.sleepy.stateName;
				return this.currentState;
			}
		} else if (
			this.energy.value >= 7 &&
			this.health.value >= 7 &&
			this.fun.value >= 7 &&
			this.hunger.value >= 7
		) {
			this.currentState = this.states.happy.stateName;
			return this.currentState;
		}
	};
	displayState = () => {
		const image = document.querySelector('.tamagotchiImage');
		this.activeState();
		switch (this.currentState) {
			case this.states.happy.stateName:
				image.src = this.states.happy.path;
				this.displayParagraph(this.states.happy.stateName);
				break;
			case this.states.sad.stateName:
				image.src = this.states.sad.path;
				this.displayParagraph(this.states.sad.stateName);
				break;
			case this.states.hungry.stateName:
				image.src = this.states.hungry.path;
				this.displayParagraph(this.states.hungry.stateName);
				break;
			case this.states.sleepy.stateName:
				image.src = this.states.sleepy.stateName;
				this.displayParagraph(this.states.sleepy.stateName);
				break;
			case this.states.dead.stateName:
				image.src = this.states.dead.path;
				this.displayParagraph(this.states.dead.stateName);
				break;
			case this.states.eating.stateName:
				image.src = this.states.eating.path;
				this.displayParagraph(this.states.eating.stateName);
				break;
			case this.states.sleeping.stateName:
				image.src = this.states.sleeping.path;
				this.displayParagraph(this.states.sleeping.stateName);
				break;
			case this.states.playing.stateName:
				image.src = this.states.playing.path;
				this.displayParagraph(this.states.playing.stateName);
		}
	};
	energyDecrease = () => {
		const decreaseValue = setInterval(() => {
			let newDecrementValue = 2;
			if (this.fun.value <= 0) {
				this.energy.value -= newDecrementValue;
				if (this.energy.value <= 0) {
					this.energy.value = 0;
				}
			} else {
				this.energy.value -= 1;
			}
			if (this.energy.value <= 0) {
				clearInterval(decreaseValue);
			}
			this.displayEnergy(this.energy.element);
			this.displayState();
		}, 2000);
	};

	hungerDecrease = () => {
		const decreaseValue = setInterval(() => {
			this.hunger.value -= 1;
			if (this.hunger.value <= 0) {
				clearInterval(decreaseValue);
			}
			this.displayHunger(this.hunger.element);
			this.displayState();
		}, 1000);
	};

	funDecrease = () => {
		const decreaseValue = setInterval(() => {
			this.fun.value -= 1;
			if (this.fun.value <= 0) {
				clearInterval(decreaseValue);
			}
			this.displayFun(this.fun.element);
			this.displayState();
		}, 1000);
	};

	healthDecrease = () => {
		const decreaseValue = setInterval(() => {
			if (this.energy.value <= 0 || this.hunger.value <= 0) {
				this.health.value -= 1;
				this.displayHealth(this.health.element);
				if (this.health.value <= 0) {
					clearInterval(decreaseValue);
				}
				this.displayState();
			}
		}, 1000);
	};

	mount = ({
		healthElement,
		hungerElement,
		energyElement,
		funElement,
		imageSelector,
	}) => {
		this.health.element = healthElement;
		this.hunger.element = hungerElement;
		this.energy.element = energyElement;
		this.fun.element = funElement;
		this.states.happy.element = imageSelector;

		this.displayHealth(healthElement);
		this.displayHunger(hungerElement);
		this.displayEnergy(energyElement);
		this.displayFun(funElement);
	};
}
