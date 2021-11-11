import { SlotAnotherIngredients, SlotIngredients } from './ingredients';

interface SIMPLEBLENDS {
  blenderid: number;
  author: string;
  collection: string;
  target: number;
  ingredients: number[];
}

interface SIMPLESWAPS {
  blenderid: number;
  author: string;
  collection: string;
  target: number;
  ingredient: number;
}

interface SLOTBLENDS {
  blenderid: number;
  author: string;
  collection: string;
  ingredients: SlotIngredients[];
  title: string;
}

interface SLOTBLENDSFROM_ {
  blenderid: number;
  author: string;
  collection: string;
  ingredients: SlotAnotherIngredients[];
  title: string;
}

interface SLOTBLENDS_TARGET {
  blenderid: number;
  collection: string;
  targets: {
    odds: number;
    templateid: number;
  }[];
}

export type { SIMPLEBLENDS, SIMPLESWAPS, SLOTBLENDS, SLOTBLENDS_TARGET, SLOTBLENDSFROM_ };
