export default class Tamagotchi {
	constructor() {
		this.health = { value: 10, importance: 1 };
		this.hunger = { value: 10, importance: 3 };
		this.energy = { value: 10, importance: 2 };
		this.fun = { value: 10, importance: 4 };
		console.log('Tamagotchi initialized');
		this.healthDecrease = setInterval(() => {
			this.health.value -= 1;
			if (this.health.value <= 0) {
				clearInterval(this.healthDecrease);
			}
			// this.displayHealth();
			
		}, 1000);
		this.energyDecrease = setInterval(() => {
			this.energy.value -= 1;
			if (this.energy.value <= 0) {
				clearInterval(this.energyDecrease);
			}
			this.displayEnergy()
		}, 2000);
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
