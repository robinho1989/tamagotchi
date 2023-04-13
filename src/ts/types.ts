export interface MountProps {
  healthElement: string;
  hungerElement: string;
  energyElement: string;
  funElement: string;
}

export interface MountPropsWithImageSelector extends MountProps {
  imageSelector: string;
}

export interface ActionElements {
  feedingButton: string;
  sleepingButton: string;
  playingButton: string;
  animatedImage: string;
  playingButtons: string;
  resetButton: string;
}
