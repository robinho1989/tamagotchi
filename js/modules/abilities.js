export default class Abilities {
  constructor(tamagotchi, actionButtons) {
    this.tamagotchi = tamagotchi;
    this.feedingButton = document.querySelector(actionButtons.feedingButton);
    this.eatingActionInterval = null;
    console.log("Abilities module initialized");
  }

  abilities = () => {
    // I have no idea have what buttons do I get here
    this.feedingButton.addEventListener("click", () => {
      console.log(`ab ${this.tamagotchi.activeState()}`);

      this.tamagotchi.currentState = this.tamagotchi.states.eating.stateName;
      this.eatingActionInterval = setInterval(() => {
        this.tamagotchi.hunger.value = this.tamagotchi.hunger.value + 3;

        if (this.tamagotchi.hunger.value > 10) {
          this.stopEating();
        }
      }, 1000);
    });
  };

  stopEating = () => {
    this.eatingActionInterval && clearInterval(this.eatingActionInterval);
  };
}
