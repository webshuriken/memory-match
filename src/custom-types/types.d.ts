// DECK OF CARDS TYPES
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

// Component: Timer
// The mins/secs are kept as number because they are easier to implement
// builtin function to turn timer numbers into string
// ticking property is so the ui knows that the timer is active
export interface iTimerStateType {
  ticking: boolean;
  minutes: number;
  seconds: number;
  timeToString: () => string
}

// Component: Moves
export type MovesStateType = {
  counter: number;
}

export type MovesActionType = {
  type: 'add' | 'reset';
}

// LEADERBOARD TYPES
export type LeaderboardType = {
  id: string;
  name: string;
  time: string;
  moves: number;
  position: number;
}

// GAME SETTINGS
export interface iGameSettingsType {
  deckOfCards: iDeckOfCardsType;
}

// player stats
export interface iPlayerGameStats {
  moves: string;
  name: string;
  time: string;
}

// GAME CONTEXT use with react router
export interface iGameContextType extends iGameSettingsType {
  theGame: iGameSettingsType;
  theLeaderboard: LeaderboardType[];
}