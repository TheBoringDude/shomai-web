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

export type { SIMPLEBLENDS, SIMPLESWAPS };
