export default class Tamagotchi {
	constructor() {
		this.health = { value: 10, importance: 1 };
		this.hunger = { value: 10, importance: 3 };
		this.energy = { value: 10, importance: 2 };
		this.fun = { value: 10, importance: 4 };
		console.log('Tamagotchi initialized');

		const energyValue = '.energy';
		const hungerValue = '.hunger';
		const funValue = '.fun';
		const healthValue = '.health';

		this.energyDecrease = setInterval(() => {
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
				clearInterval(this.energyDecrease);
			}
			this.displayEnergy(energyValue);
		}, 2000);
		this.hungerDecrease = setInterval(() => {
			this.hunger.value -= 1;
			if (this.hunger.value <= 0) {
				clearInterval(this.hungerDecrease);
			}
			this.displayHunger(hungerValue);
		}, 1000);
		this.funDecrease = setInterval(() => {
			this.fun.value -= 1;
			if (this.fun.value <= 0) {
				clearInterval(this.funDecrease);
			}
			this.displayFun(funValue);
		}, 1000);
		this.healthDecrease = setInterval(() => {
			if (this.energy.value <= 0 || this.hunger.value <= 0) {
				this.health.value -= 1;
				console.log(this.health.value);
				this.displayHealth(healthValue);
				if (this.health.value <= 0) {
					clearInterval(this.healthDecrease);
				}
			}
		}, 1000);
	}

	displayHealth = (elementSelector) => {
		const displayElement = document.querySelector(elementSelector);
		displayElement.innerText = this.energy.value;
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

	mount = ({ healthElement, hungerElement, energyElement, funElement }) => {
		this.displayHealth(healthElement);
		this.displayHunger(hungerElement);
		this.displayEnergy(energyElement);
		this.displayFun(funElement);
	};
}
