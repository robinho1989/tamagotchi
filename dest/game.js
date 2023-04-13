import Abilities from "./modules/abilities";
import Tamagotchi from "./modules/tamagotchi";
export default class Game {
    constructor(actionElements) {
        this.start = ({ healthElement, hungerElement, energyElement, funElement, }) => {
            this.tamagotchi.mount({
                healthElement,
                hungerElement,
                energyElement,
                funElement,
                imageSelector: "",
            });
        };
        this.play = () => {
            this.abilities.abilities();
        };
        this.reset = () => {
            this.abilities.resetGame();
        };
        this.tamagotchi = new Tamagotchi(actionElements);
        this.abilities = new Abilities(this.tamagotchi, actionElements);
    }
}
