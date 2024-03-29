export default class Tamagotchi {
    constructor(actionElements) {
        this.displayNewState = () => {
            return this.updateState;
        };
        this.displayHealth = (elementSelector) => {
            const displayElement = document.querySelector(elementSelector);
            displayElement.innerText = this.health.value;
        };
        this.displayHunger = (elementSelector) => {
            const displayElement = document.querySelector(elementSelector);
            displayElement.innerText = this.hunger.value;
        };
        this.displayEnergy = (elementSelector) => {
            const displayElement = document.querySelector(elementSelector);
            displayElement.innerText = this.energy.value;
        };
        this.displayFun = (elementSelector) => {
            const displayElement = document.querySelector(elementSelector);
            displayElement.innerText = this.fun.value;
        };
        this.displayParagraph = (textContent) => {
            const paragraph = document.querySelector('.tamagotchiStates');
            paragraph.textContent = textContent;
        };
        this.activeState = () => {
            if (this.health.value <= 0) {
                this.currentState = this.states.dead.stateName;
                this.gameButtons.style.display = 'none';
                this.restartButton.style.display = 'inline-flex';
                return this.currentState;
            }
            else if (this.updateState !== null) {
                this.currentState = this.updateState;
                return this.currentState;
            }
            else if (this.energy.value <= 6) {
                this.currentState = this.states.sad.stateName;
                return this.currentState;
            }
            else if (this.hunger.value <= 6) {
                this.currentState = this.states.hungry.stateName;
                return this.currentState;
            }
            else if (this.fun.value <= 6) {
                this.currentState = this.states.sleepy.stateName;
                return this.currentState;
            }
            else if (this.energy.value >= 7 &&
                this.health.value >= 7 &&
                this.fun.value >= 7 &&
                this.hunger.value >= 7) {
                this.currentState = this.states.happy.stateName;
                return this.currentState;
            }
        };
        this.displayState = () => {
            this.activeState();
            switch (this.currentState) {
                case this.states.happy.stateName:
                    this.image.src = this.states.happy.path;
                    this.displayParagraph(this.states.happy.stateName);
                    this.container.classList.remove('playingImageSize');
                    this.container.classList.remove('imageSize');
                    break;
                case this.states.sad.stateName:
                    this.image.src = this.states.sad.path;
                    this.displayParagraph(this.states.sad.stateName);
                    this.container.classList.remove('playingImageSize');
                    this.container.classList.remove('imageSize');
                    break;
                case this.states.hungry.stateName:
                    this.image.src = this.states.hungry.path;
                    this.displayParagraph(this.states.hungry.stateName);
                    this.container.classList.remove('playingImageSize');
                    this.container.classList.remove('imageSize');
                    break;
                case this.states.sleepy.stateName:
                    this.image.src = this.states.sleepy.stateName;
                    this.displayParagraph(this.states.sleepy.stateName);
                    this.container.classList.remove('playingImageSize');
                    this.container.classList.remove('imageSize');
                    break;
                case this.states.dead.stateName:
                    this.image.src = this.states.dead.path;
                    this.displayParagraph(this.states.dead.stateName);
                    this.container.classList.remove('playingImageSize');
                    this.container.classList.remove('imageSize');
                    break;
                case this.states.eating.stateName:
                    this.image.src = this.states.eating.path;
                    this.displayParagraph(this.states.eating.stateName);
                    this.container.classList.add('imageSize');
                    this.container.classList.remove('playingImageSize');
                    this.container.classList.remove('standardSize');
                    break;
                case this.states.sleeping.stateName:
                    this.image.src = this.states.sleeping.path;
                    this.displayParagraph(this.states.sleeping.stateName);
                    this.container.classList.add('imageSize');
                    this.container.classList.remove('playingImageSize');
                    this.container.classList.remove('standardSize');
                    break;
                case this.states.playing.stateName:
                    this.image.src = this.states.playing.path;
                    this.displayParagraph(this.states.playing.stateName);
                    this.container.classList.add('playingImageSize');
                    this.container.classList.remove('imageSize');
            }
        };
        this.energyDecrease = () => {
            const decreaseValue = setInterval(() => {
                let newDecrementValue = 2;
                if (this.fun.value <= 0) {
                    this.energy.value -= newDecrementValue;
                    if (this.energy.value <= 0) {
                        this.energy.value = 0;
                    }
                }
                else {
                    this.energy.value -= 1;
                }
                if (this.energy.value <= 0) {
                    this.energy.value = 0;
                }
                if (this.health.value <= 0) {
                    clearInterval(decreaseValue);
                }
                this.displayEnergy(this.energy.element);
                this.displayState();
            }, 2000);
        };
        this.hungerDecrease = () => {
            const decreaseValue = setInterval(() => {
                this.hunger.value -= 1;
                if (this.hunger.value <= 0) {
                    this.hunger.value = 0;
                }
                if (this.health.value <= 0) {
                    clearInterval(decreaseValue);
                }
                this.displayHunger(this.hunger.element);
                this.displayState();
            }, 1000);
        };
        this.funDecrease = () => {
            const decreaseValue = setInterval(() => {
                this.fun.value -= 1;
                if (this.fun.value <= 0) {
                    this.fun.value = 0;
                }
                if (this.energy.value <= 0) {
                    this.energy.value = 0;
                }
                if (this.health.value <= 0) {
                    clearInterval(decreaseValue);
                }
                this.displayFun(this.fun.element);
                this.displayState();
            }, 1000);
        };
        this.healthDecrease = () => {
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
        this.mount = ({ healthElement, hungerElement, energyElement, funElement, imageSelector, }) => {
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
                path: './images/spritesheets/spritesheet-playing4.png',
            },
            sleeping: {
                stateName: 'sleeping',
                element: null,
                path: './images/spritesheets/spritesheet-sleeping.png',
            },
        };
        this.currentState = this.states.happy.stateName;
        this.container = document.querySelector('.imageContainer');
        this.image = document.querySelector('.tamagotchiImage');
        this.gameButtons = document.querySelector(actionElements.playingButtons);
        this.restartButton = document.querySelector(actionElements.resetButton);
        this.image.src = this.states.happy.path;
        this.hungerDecreaseId = null;
        console.log('Tamagotchi initialized');
        this.healthDecrease();
        this.energyDecrease();
        this.hungerDecrease();
        this.funDecrease();
        console.log('click');
    }
}
