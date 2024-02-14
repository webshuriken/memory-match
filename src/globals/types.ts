// INTERFACES
export interface CardFacesIntfc {
  src: string;
  id?: number;
  pairID?: number;
  flipped?: boolean;
}

export interface CardsIntfc {
  alt: string;
  faces: CardFacesIntfc[];
  cover: {
    alt: string;
    src: string;
  };
}

export interface DeckOfCardsIntfc {
  author: {
    name: string | string[];
    site: string | string[];
  }
  cards: CardsIntfc;
  size: number;
  theme: string;
}

// TYPES
export type LeaderboardType = {
  id: string;
  name: string;
  time: string;
  moves: number;
  position: number;
}