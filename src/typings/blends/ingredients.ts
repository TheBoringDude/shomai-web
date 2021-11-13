type SimpleIngredients = {
  collection: string;
  schema: string;
  template: string;
  image: string;
};

type SimpleAssetIngredient = {
  assetid: number;
  mint: number;
  template: number;
};

interface SlotAssetIngredient {
  collection: string;
  assetid: number;
  template: number;
  image: string;
  name: string;
  mint: number;
}

interface SlotBlendSchemaIngredientProps {
  type: 0;
  collection: string;
  amount: number;
  props: {
    schema: string;
  };
}

interface SlotBlendTemplateIngredientProps {
  type: 1;
  collection: string;
  amount: number;
  props: {
    templates: number[];
  };
}

interface SlotBlendAttribIngredientProps {
  type: 2;
  collection: string;
  amount: number;
  props: {
    schema: string;
    require_all_attribs: boolean;
    attributes: SlotIngredientAttributes[];
  };
}

interface SlotBlendAllIngredientProps {
  type: 0 | 1 | 2 | null;
  collection: string;
  amount: number;
  schema: string;
  templates: number[];
  require_all_attribs: boolean;
  attributes: SlotIngredientAttributes[];
}
type SlotIngredients =
  | SlotBlendSchemaIngredientProps
  | SlotBlendTemplateIngredientProps
  | SlotBlendAttribIngredientProps;

type SlotXIngredients = [
  string,
  (
    | {
        schema: string;
        require_all_attribs: boolean;
        attributes: SlotIngredientAttributes[];
      }
    | {
        templates: number[];
      }
    | {
        schema: string;
      }
  )
];

interface SlotAnotherIngredients {
  type: 0 | 1 | 2 | null;
  collection: string;
  amount: number;
  props: SlotXIngredients;
}

type SlotIngredientAttributes = {
  key: string;
  allowed_values: string[];
};

export type {
  SimpleIngredients,
  SimpleAssetIngredient,
  SlotIngredients,
  SlotIngredientAttributes,
  SlotAssetIngredient,
  SlotBlendAttribIngredientProps,
  SlotBlendSchemaIngredientProps,
  SlotBlendTemplateIngredientProps,
  SlotBlendAllIngredientProps,
  SlotXIngredients,
  SlotAnotherIngredients
};
