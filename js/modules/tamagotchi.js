export default class Tamagotchi {
	constructor() {
		this.health = { value: 10, importance: 1, element: null };
		this.hunger = { value: 10, importance: 3, element: null };
		this.energy = { value: 10, importance: 2, element: null };
		this.fun = { value: 10, importance: 4, element: null };

		this.happy = {
			class: 'happy',
			state: 'HAPPY',
			element: null,
			path: './images/spritesheets/happyTamatgochi.png',
		};
		this.dead = {
			class: 'dead',
			state: 'DEAD',
			element: null,
			path: './images/spritesheets/spritesheet-dead.png',
		};
		console.log('Tamagotchi initialized');

		this.healthDecrease();
		this.energyDecrease();
		this.hungerDecrease();
		this.funDecrease();
	}

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
			this.displayImage(this.happy.element);
		}, 2000);
	};
	hungerDecrease = () => {
		const decreaseValue = setInterval(() => {
			this.hunger.value -= 1;
			if (this.hunger.value <= 0) {
				clearInterval(decreaseValue);
			}
			this.displayHunger(this.hunger.element);
			this.displayImage(this.happy.element);
		}, 1000);
	};
	funDecrease = () => {
		const decreaseValue = setInterval(() => {
			this.fun.value -= 1;
			if (this.fun.value <= 0) {
				clearInterval(decreaseValue);
			}
			this.displayFun(this.fun.element);
			this.displayImage(this.happy.element);
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
				this.displayImage(this.happy.element);
			}
		}, 1000);
	};
	displayImage = (elementSelector) => {
		const image = document.querySelector(elementSelector);

		if (
			this.energy.value &&
			this.health.element &&
			this.fun.value &&
			this.hunger.value >= 7
		) {
			image.src = this.happy.path;
		}
		if (this.fun.value <= 6) {
			image.src = this.dead.path;
		}
	};
	mount = ({
		healthElement,
		hungerElement,
		energyElement,
		funElement,
		imageElement,
	}) => {
		this.health.element = healthElement;
		this.hunger.element = hungerElement;
		this.energy.element = energyElement;
		this.fun.element = funElement;
		this.happy.element = imageElement;
		this.displayHealth(healthElement);
		this.displayHunger(hungerElement);
		this.displayEnergy(energyElement);
		this.displayFun(funElement);
		this.displayImage(imageElement);
	};
}
