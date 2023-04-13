import {
  ActionElements,
  MountProps,
  MountPropsWithImageSelector,
} from "../types";

interface LifeParameter {
  importance: number;
  value: number;
  element: null | string;
}

enum TamagoStates {
  happy = "happy",
  dead = "dead",
  sad = "sad",
  hungry = "hungry",
  sleepy = "sleepy",
  eating = "eating",
  playing = "playing",
  sleeping = "sleeping",
}

interface SingleState {
  path: string;
  stateName: TamagoStates;
  element: null | string;
}

type States = {
  [key in TamagoStates]: SingleState;
};

export default class Tamagotchi {
  health: LifeParameter;
  hunger: LifeParameter;
  energy: LifeParameter;
  fun: LifeParameter;
  currentState: TamagoStates;
  updateState: null | TamagoStates;
  states: States;
  container: HTMLDivElement | null;
  image: HTMLImageElement | null;
  gameButtons: HTMLDivElement | null;
  restartButton: HTMLButtonElement | null;
  hungerDecreaseId: null;

  constructor(actionElements: ActionElements) {
    this.health = { value: 10, importance: 1, element: null };
    this.hunger = { value: 10, importance: 3, element: null };
    this.energy = { value: 10, importance: 2, element: null };
    this.fun = { value: 10, importance: 4, element: null };
    this.states = {
      happy: {
        stateName: TamagoStates.happy,
        element: null,
        path: "./images/spritesheets/happyTamatgochi.png",
      },
      dead: {
        stateName: TamagoStates.dead,
        element: null,
        path: "./images/spritesheets/spritesheet-dead.png",
      },
      sad: {
        stateName: TamagoStates.sad,
        element: null,
        path: "./images/spritesheets/spritesheet-sitting.png",
      },
      hungry: {
        stateName: TamagoStates.hungry,
        element: null,
        path: "./images/spritesheets/spritesheet-hungry.png",
      },
      sleepy: {
        stateName: TamagoStates.sleepy,
        element: null,
        path: "./images/spritesheets/spritesheet-sleepy.png",
      },
      eating: {
        stateName: TamagoStates.eating,
        element: null,
        path: "./images/spritesheets/spritesheet-eating.png",
      },
      playing: {
        stateName: TamagoStates.playing,
        element: null,
        path: "./images/spritesheets/spritesheet-playing4.png",
      },
      sleeping: {
        stateName: TamagoStates.sleeping,
        element: null,
        path: "./images/spritesheets/spritesheet-sleeping.png",
      },
    };
    this.currentState = this.states.happy.stateName;
    this.updateState = null;
    this.container = document.querySelector(".imageContainer");
    this.image = document.querySelector(".tamagotchiImage");
    this.gameButtons = document.querySelector(actionElements.playingButtons);
    this.restartButton = document.querySelector(actionElements.resetButton);
    this.hungerDecreaseId = null;
    console.log("Tamagotchi initialized");
    this.healthDecrease();
    this.energyDecrease();
    this.hungerDecrease();
    this.funDecrease();
    console.log("click");
  }
  displayNewState = () => {
    return this.updateState;
  };
  displayHealth = (elementSelector: string) => {
    const displayElement: HTMLDivElement | null =
      document.querySelector(elementSelector);
    if (!displayElement) {
      throw Error("Element not found");
    }
    displayElement.innerText = String(this.health.value);
  };
  displayHunger = (elementSelector: string) => {
    const displayElement: HTMLDivElement | null =
      document.querySelector(elementSelector);
    if (!displayElement) {
      throw Error("Element not found");
    }
    displayElement.innerText = String(this.hunger.value);
  };
  displayEnergy = (elementSelector: string) => {
    const displayElement: HTMLDivElement | null =
      document.querySelector(elementSelector);
    if (!displayElement) {
      throw Error("Element not found");
    }
    displayElement.innerText = String(this.energy.value);
  };
  displayFun = (elementSelector: string) => {
    const displayElement: HTMLDivElement | null =
      document.querySelector(elementSelector);
    if (!displayElement) {
      throw Error("Element not found");
    }
    displayElement.innerText = String(this.fun.value);
  };
  displayParagraph = (textContent: string) => {
    const paragraph = document.querySelector(".tamagotchiStates");
    if (!!paragraph) {
      paragraph.textContent = textContent;
    } else {
      console.warn("paragraph not found");
    }
  };
  activeState = () => {
    if (!this.gameButtons || !this.restartButton) {
      throw Error("No action buttons found");
    }
    if (this.health.value <= 0) {
      this.currentState = this.states.dead.stateName;
      this.gameButtons.style.display = "none";
      this.restartButton.style.display = "inline-flex";
      return this.currentState;
    } else if (this.updateState !== null) {
      this.currentState = this.updateState;
      return this.currentState;
    } else if (this.energy.value <= 6) {
      this.currentState = this.states.sad.stateName;
      return this.currentState;
    } else if (this.hunger.value <= 6) {
      this.currentState = this.states.hungry.stateName;
      return this.currentState;
    } else if (this.fun.value <= 6) {
      this.currentState = this.states.sleepy.stateName;
      return this.currentState;
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
    if (!this.container || !this.image) {
      throw Error("No container or image found!");
    }

    this.activeState();
    switch (this.currentState) {
      case this.states.happy.stateName:
        this.image.src = this.states.happy.path;
        this.displayParagraph(this.states.happy.stateName);
        this.container.classList.remove("playingImageSize");
        this.container.classList.remove("imageSize");
        break;
      case this.states.sad.stateName:
        this.image.src = this.states.sad.path;
        this.displayParagraph(this.states.sad.stateName);
        this.container.classList.remove("playingImageSize");
        this.container.classList.remove("imageSize");
        break;
      case this.states.hungry.stateName:
        this.image.src = this.states.hungry.path;
        this.displayParagraph(this.states.hungry.stateName);
        this.container.classList.remove("playingImageSize");
        this.container.classList.remove("imageSize");
        break;
      case this.states.sleepy.stateName:
        this.image.src = this.states.sleepy.stateName;
        this.displayParagraph(this.states.sleepy.stateName);
        this.container.classList.remove("playingImageSize");
        this.container.classList.remove("imageSize");
        break;
      case this.states.dead.stateName:
        this.image.src = this.states.dead.path;
        this.displayParagraph(this.states.dead.stateName);
        this.container.classList.remove("playingImageSize");
        this.container.classList.remove("imageSize");
        break;
      case this.states.eating.stateName:
        this.image.src = this.states.eating.path;
        this.displayParagraph(this.states.eating.stateName);
        this.container.classList.add("imageSize");
        this.container.classList.remove("playingImageSize");
        this.container.classList.remove("standardSize");
        break;
      case this.states.sleeping.stateName:
        this.image.src = this.states.sleeping.path;
        this.displayParagraph(this.states.sleeping.stateName);
        this.container.classList.add("imageSize");
        this.container.classList.remove("playingImageSize");
        this.container.classList.remove("standardSize");
        break;
      case this.states.playing.stateName:
        this.image.src = this.states.playing.path;
        this.displayParagraph(this.states.playing.stateName);
        this.container.classList.add("playingImageSize");
        this.container.classList.remove("imageSize");
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
        this.energy.value = 0;
      }
      if (this.health.value <= 0) {
        clearInterval(decreaseValue);
      }
      if (!this.energy.element) {
        throw Error("Energy element not found");
      }
      this.displayEnergy(this.energy.element);
      this.displayState();
    }, 2000);
  };

  hungerDecrease = () => {
    const decreaseValue = setInterval(() => {
      this.hunger.value -= 1;
      if (this.hunger.value <= 0) {
        this.hunger.value = 0;
      }
      if (this.health.value <= 0) {
        clearInterval(decreaseValue);
      }
      if (!this.hunger.element) {
        throw Error("Hunger element not found");
      }
      this.displayHunger(this.hunger.element);
      this.displayState();
    }, 1000);
  };

  funDecrease = () => {
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
      if (!this.fun.element) {
        throw Error("Fun element not found");
      }
      this.displayFun(this.fun.element);
      this.displayState();
    }, 1000);
  };

  healthDecrease = () => {
    const decreaseValue = setInterval(() => {
      if (this.energy.value <= 0 || this.hunger.value <= 0) {
        this.health.value -= 1;
        if (!this.health.element) {
          throw Error("Health element not found");
        }
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
  }: MountPropsWithImageSelector) => {
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
