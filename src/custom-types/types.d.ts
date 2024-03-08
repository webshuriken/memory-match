// INTERFACES
export interface iCardFacesType {
  src: string;
  id?: number;
  pairID?: number;
  flipped?: boolean;
}

export interface iCardsType {
  alt: string;
  faces: iCardFacesType[];
  cover: {
    alt: string;
    src: string;
  };
}

export interface iDeckOfCardsType {
  author: {
    name: string | string[];
    site: string | string[];
  }
  cards: iCardsType;
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

// Component: Timer
// The mins/secs are kept as number because they are easier to implement
// It is up to the ui to turn them into string if required
// ticking property is so the ui knows that the timer is active
export interface iTimerStateType {
  ticking: boolean;
  minutes: number;
  seconds: number;
  toString: () => string
}

// Component: Moves
export type MovesStateType = {
  counter: number;
}

export type MovesActionType = {
  type: 'add' | 'reset';
}

// GAME SETTINGS
export interface iGameContextType {
  game: {
    deckOfCards: iDeckOfCardsType;
    player: {
      moves: string;
      name: string;
      time: string;
    }
  }
  leaderboard: LeaderboardType[];
}