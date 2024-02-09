export interface CardFaces {
  src: string;
  id?: number;
  pairID?: number;
  flipped?: boolean;
}

export interface Cards {
  alt: string;
  faces: CardFaces[];
  cover: {
    alt: string;
    src: string;
  };
}

export interface DeckOfCards {
  author: {
    name: string | string[];
    site: string | string[];
  }
  cards: Cards;
  size: number;
  theme: string;
}