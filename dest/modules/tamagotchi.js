var TamagoStates;
(function (TamagoStates) {
    TamagoStates["happy"] = "happy";
    TamagoStates["dead"] = "dead";
    TamagoStates["sad"] = "sad";
    TamagoStates["hungry"] = "hungry";
    TamagoStates["sleepy"] = "sleepy";
    TamagoStates["eating"] = "eating";
    TamagoStates["playing"] = "playing";
    TamagoStates["sleeping"] = "sleeping";
})(TamagoStates || (TamagoStates = {}));
export default class Tamagotchi {
    constructor(actionElements) {
        this.displayNewState = () => {
            return this.updateState;
        };
        this.displayHealth = (elementSelector) => {
            const displayElement = document.querySelector(elementSelector);
            if (displayElement === null) {
                throw new Error('Health paragraph not found');
            }
            displayElement.innerText = String(this.health.value);
        };
        this.displayHunger = (elementSelector) => {
            const displayElement = document.querySelector(elementSelector);
            if (displayElement === null) {
                throw new Error('Hunger paragraph not found');
            }
            displayElement.innerText = String(this.hunger.value);
        };
        this.displayEnergy = (elementSelector) => {
            const displayElement = document.querySelector(elementSelector);
            if (displayElement === null) {
                throw new Error('Energy paragraph not found');
            }
            displayElement.innerText = String(this.energy.value);
        };
        this.displayFun = (elementSelector) => {
            const displayElement = document.querySelector(elementSelector);
            if (displayElement === null) {
                throw new Error('Fun paragraph not found');
            }
            displayElement.innerText = String(this.fun.value);
        };
        this.displayParagraph = (textContent) => {
            const paragraph = document.querySelector('.tamagotchiStates');
            if (paragraph === null) {
                throw new Error('State paragraph not found');
            }
            paragraph.textContent = textContent;
        };
        this.activeState = () => {
            if (this.gameButtons === null || this.restartButton === null) {
                throw new Error('Buttons not found');
            }
            if (this.image === null) {
                throw new Error('Image not found');
            }
            if (this.health.value <= 0) {
                this.currentState = this.states.dead.stateName;
                this.gameButtons.style.display = 'none';
                this.restartButton.style.display = 'inline-flex';
                this.image.classList.remove('playingState');
                this.image.classList.remove('animatedState');
                this.image.classList.remove('sleepingState');
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
            if (this.image === null || this.container === null) {
                throw new Error('Image or image container not found');
            }
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
            this.energyDecreaseId = setInterval(() => {
                if (this.energyDecreaseId === null) {
                    throw new Error('Energy interval is not set');
                }
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
                    clearInterval(this.energyDecreaseId);
                }
                if (this.energy.element === null) {
                    throw new Error('Energy element not found');
                }
                this.displayEnergy(this.energy.element);
                this.displayState();
            }, 2000);
        };
        this.hungerDecrease = () => {
            this.hungerDecreaseId = setInterval(() => {
                if (this.hungerDecreaseId === null) {
                    throw new Error('Hunger interval is not set');
                }
                this.hunger.value -= 1;
                if (this.hunger.value <= 0) {
                    this.hunger.value = 0;
                }
                if (this.health.value <= 0) {
                    clearInterval(this.hungerDecreaseId);
                }
                if (this.hunger.element === null) {
                    throw new Error('Hunger element not found');
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
                if (this.fun.element === null) {
                    throw new Error('Fun element not found');
                }
                this.displayFun(this.fun.element);
                this.displayState();
            }, 1000);
        };
        this.healthDecrease = () => {
            const decreaseValue = setInterval(() => {
                if (this.energy.value <= 0 || this.hunger.value <= 0) {
                    this.health.value -= 1;
                    if (this.health.element === null) {
                        throw new Error('Health element not found');
                    }
                    this.displayHealth(this.health.element);
                    if (this.health.value <= 0) {
                        clearInterval(decreaseValue);
                    }
                    this.displayState();
                }
            }, 1000);
        };
        this.mount = ({ healthElement, hungerElement, energyElement, funElement, }) => {
            this.health.element = healthElement;
            this.hunger.element = hungerElement;
            this.energy.element = energyElement;
            this.fun.element = funElement;
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
                stateName: TamagoStates.happy,
                element: null,
                path: './images/spritesheets/happyTamatgochi.png',
            },
            dead: {
                stateName: TamagoStates.dead,
                element: null,
                path: './images/spritesheets/spritesheet-dead.png',
            },
            sad: {
                stateName: TamagoStates.sad,
                element: null,
                path: './images/spritesheets/spritesheet-sitting.png',
            },
            hungry: {
                stateName: TamagoStates.hungry,
                element: null,
                path: './images/spritesheets/spritesheet-hungry.png',
            },
            sleepy: {
                stateName: TamagoStates.sleepy,
                element: null,
                path: './images/spritesheets/spritesheet-sleepy.png',
            },
            eating: {
                stateName: TamagoStates.eating,
                element: null,
                path: './images/spritesheets/spritesheet-eating.png',
            },
            playing: {
                stateName: TamagoStates.playing,
                element: null,
                path: './images/spritesheets/spritesheet-playing4.png',
            },
            sleeping: {
                stateName: TamagoStates.sleeping,
                element: null,
                path: './images/spritesheets/spritesheet-sleeping.png',
            },
        };
        this.currentState = this.states.happy.stateName;
        this.container = document.querySelector('.imageContainer');
        this.image = document.querySelector('.tamagotchiImage');
        this.gameButtons = document.querySelector(actionElements.playingButtons);
        this.restartButton = document.querySelector(actionElements.resetButton);
        this.hungerDecreaseId = null;
        this.energyDecreaseId = null;
        this.funDecreaseId = null;
        console.log('Tamagotchi initialized');
        this.healthDecrease();
        this.energyDecrease();
        this.hungerDecrease();
        this.funDecrease();
    }
    stopHungerDecrease() {
        if (this.hungerDecreaseId !== null)
            clearInterval(this.hungerDecreaseId);
    }
    stopEnergyDecrease() {
        if (this.energyDecreaseId !== null)
            clearInterval(this.energyDecreaseId);
    }
}
