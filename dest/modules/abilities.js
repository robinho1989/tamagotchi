export default class Abilities {
    constructor(tamagotchi, actionElements) {
        this.abilities = () => {
            if (this.feedingButton === null ||
                this.sleepingButton === null ||
                this.playingButton === null) {
                throw new Error('One of buttons not found');
            }
            this.feedingButton.addEventListener('mousedown', this.feedingValue);
            this.feedingButton.addEventListener('mouseup', this.resetFeedingValue);
            this.sleepingButton.addEventListener('mousedown', this.sleepingValue);
            this.sleepingButton.addEventListener('mouseup', this.resetSleepingValue);
            this.playingButton.addEventListener('mousedown', this.playingValue);
            this.playingButton.addEventListener('mouseup', this.resetPlayingValue);
        };
        this.feedingValue = () => {
            if (this.animatedImage === null) {
                throw new Error('An image not found');
            }
            this.tamagotchi.updateState = this.tamagotchi.states.eating.stateName;
            this.tamagotchi.stopHungerDecrease();
            this.feedingActionInterval = setInterval(() => {
                if (this.tamagotchi.hunger.element === null) {
                    throw new Error('Hunger element not found');
                }
                this.tamagotchi.displayHunger(this.tamagotchi.hunger.element);
                if (this.tamagotchi.hunger.value < 9 &&
                    this.tamagotchi.health.value !== 0) {
                    this.tamagotchi.hunger.value += 2;
                }
                else if (this.tamagotchi.hunger.value === 9) {
                    this.tamagotchi.hunger.value += 1;
                }
                else {
                    this.tamagotchi.hunger.value = 10;
                    this.stopFeeding();
                }
            }, 1000);
            if (this.tamagotchi.currentState !== this.tamagotchi.states.dead.stateName) {
                this.animatedImage.classList.add('animatedState');
                this.animatedImage.classList.remove('sleepingState');
                this.animatedImage.classList.remove('playingState');
            }
        };
        this.sleepingValue = () => {
            if (this.animatedImage === null) {
                throw new Error('An image not found');
            }
            this.tamagotchi.updateState = this.tamagotchi.states.sleeping.stateName;
            this.tamagotchi.stopEnergyDecrease();
            this.sleepingActionInterval = setInterval(() => {
                if (this.tamagotchi.energy.element === null) {
                    throw new Error('Energy element not found');
                }
                this.tamagotchi.displayEnergy(this.tamagotchi.energy.element);
                if (this.tamagotchi.energy.value < 9 &&
                    this.tamagotchi.health.value !== 0) {
                    this.tamagotchi.energy.value += 2;
                }
                else if (this.tamagotchi.energy.value === 9) {
                    this.tamagotchi.energy.value += 1;
                }
                else {
                    this.tamagotchi.energy.value = 10;
                    this.stopSleeping();
                }
            }, 1000);
            if (this.tamagotchi.currentState !== this.tamagotchi.states.dead.stateName) {
                this.animatedImage.classList.add('sleepingState');
                this.animatedImage.classList.remove('animatedState');
                this.animatedImage.classList.remove('playingState');
            }
        };
        this.playingValue = () => {
            if (this.animatedImage === null) {
                throw new Error('An image not found');
            }
            this.tamagotchi.updateState = this.tamagotchi.states.playing.stateName;
            this.tamagotchi.stopFunDecrease();
            this.playingActionInterval = setInterval(() => {
                if (this.tamagotchi.fun.element === null) {
                    throw new Error('Fun element not found');
                }
                this.tamagotchi.displayFun(this.tamagotchi.fun.element);
                this.tamagotchi.energy.value -= 1;
                if (this.tamagotchi.fun.value < 9 && this.tamagotchi.health.value !== 0) {
                    this.tamagotchi.fun.value += 2;
                }
                else if (this.tamagotchi.fun.value === 9) {
                    this.tamagotchi.fun.value += 1;
                }
                else {
                    this.tamagotchi.fun.value = 10;
                    this.stopPlaying();
                }
            }, 1000);
            if (this.tamagotchi.currentState !== this.tamagotchi.states.dead.stateName) {
                this.animatedImage.classList.add('playingState');
                this.animatedImage.classList.remove('sleepingState');
                this.animatedImage.classList.remove('animatedState');
            }
        };
        this.resetFeedingValue = () => {
            if (this.animatedImage === null) {
                throw new Error('An image not found');
            }
            if (this.tamagotchi.hunger.element === null) {
                throw new Error('Hunger element not found');
            }
            this.tamagotchi.updateState = null;
            this.animatedImage.classList.remove('animatedState');
            this.animatedImage.classList.remove('sleepingState');
            this.animatedImage.classList.remove('playingState');
            this.tamagotchi.displayHunger(this.tamagotchi.hunger.element);
            this.tamagotchi.hungerDecrease();
            this.stopFeeding();
            this.stopPlaying();
            this.stopSleeping();
        };
        this.resetSleepingValue = () => {
            if (this.animatedImage === null) {
                throw new Error('An image not found');
            }
            if (this.tamagotchi.energy.element === null) {
                throw new Error('Energy element not found');
            }
            this.tamagotchi.updateState = null;
            this.animatedImage.classList.remove('sleepingState');
            this.animatedImage.classList.remove('animatedState');
            this.animatedImage.classList.remove('playingState');
            this.tamagotchi.energyDecrease();
            this.tamagotchi.displayEnergy(this.tamagotchi.energy.element);
            this.stopFeeding();
            this.stopPlaying();
            this.stopSleeping();
        };
        this.resetPlayingValue = () => {
            if (this.animatedImage === null) {
                throw new Error('An image not found');
            }
            if (this.tamagotchi.fun.element === null) {
                throw new Error('Fun element not found');
            }
            this.tamagotchi.updateState = null;
            this.animatedImage.classList.remove('playingState');
            this.animatedImage.classList.remove('animatedState');
            this.animatedImage.classList.remove('sleepingState');
            if (this.tamagotchi.health.value > 0) {
                this.tamagotchi.funDecrease();
            }
            this.tamagotchi.displayFun(this.tamagotchi.fun.element);
            this.stopFeeding();
            this.stopPlaying();
            this.stopSleeping();
        };
        this.stopFeeding = () => {
            this.feedingActionInterval && clearInterval(this.feedingActionInterval);
        };
        this.stopSleeping = () => {
            this.sleepingActionInterval && clearInterval(this.sleepingActionInterval);
        };
        this.stopPlaying = () => {
            this.playingActionInterval && clearInterval(this.playingActionInterval);
        };
        this.resetGame = () => {
            if (this.tamagotchi.restartButton === null) {
                throw new Error('Restart button not found');
            }
            this.tamagotchi.restartButton.addEventListener('click', this.handleReset);
        };
        this.handleReset = () => {
            location.reload();
        };
        this.tamagotchi = tamagotchi;
        this.feedingButton = document.querySelector(actionElements.feedingButton);
        this.sleepingButton = document.querySelector(actionElements.sleepingButton);
        this.playingButton = document.querySelector(actionElements.playingButton);
        this.animatedImage = document.querySelector(actionElements.animatedImage);
        this.feedingActionInterval = null;
        this.sleepingActionInterval = null;
        this.playingActionInterval = null;
        console.log('Abilities module initialized');
        console.log(this.tamagotchi.energy.value);
    }
}
