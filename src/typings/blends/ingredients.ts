type SimpleIngredients = {
  collection: string;
  schema: string;
  template: string;
  image: string;
};

type SimpleAssetIngredient = {
  assetid: number;
  template: number;
};

interface SlotIngredients {
  collection: string;
  schema: string;
  schema_only: boolean;
  from: number;
  anyof: boolean;
  attributes: SlotIngredientAttributes[];
  display_text: string;
}

type SlotIngredientAttributes = {
  attrib: string;
  values: string[];
};

export type { SimpleIngredients, SimpleAssetIngredient, SlotIngredients, SlotIngredientAttributes };
