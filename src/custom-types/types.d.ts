/* --|| DECK OF CARDS TYPES ||-- */

// when dealing the memory cards each of the face cards
// will have these properties added for game play purposes
export interface iCardFacesType {
  src: string;
  id?: number;
  pairID?: number;
  flipped?: boolean;
}

// the cards for each deck consists of:
// alt: which is the message for each face card. As this is a memory game we cant be descriptive here.
// faces: are the main memory cards made of the iCardFacesType
// cover: is the cover image with its own alt as this one can describe the cards theme
export interface iCardsType {
  alt: string;
  faces: iCardFacesType[];
  cover: {
    alt: string;
    src: string;
  };
}

// Each deck of cards will have these properties to describe them.
export interface iDeckOfCardsType {
  author: {
    name: string[];
    site: string[];
  }
  cards: iCardsType;
  size: number;
  theme: string;
}

/* --|| Component: Timer ||-- */

// The mins/secs are kept as number because they are easier to implement
// builtin function to turn timer numbers into string
// ticking property is so the ui knows that the timer is active or idle
export interface iTimerStateType {
  ticking: boolean;
  minutes: number;
  seconds: number;
  timeToString: () => string
}

// dispatch options available: start, pause, reset
// tick type is for internal use, telling the system to keep going
export type TimerActionType = {
  type: 'tick' | 'pause' | 'start' | 'reset';
}

/* --|| Component: Moves ||-- */

export type MovesStateType = {
  counter: number;
}

// dispatch options available: add, reset
export type MovesActionType = {
  type: 'add' | 'reset';
}

/* --|| Component GameEnd ||-- */
// player stats
export interface iPlayerGameStats {
  moves: string;
  name: string;
  time: string;
}

/* --|| LEADERBOARD TYPES ||-- */

// how we store each players past game stats
export type LeaderboardType = {
  id: string;
  name: string;
  time: string;
  moves: number;
  position: number;
}

export type LastGameStatsType = {
  playerStats: LeaderboardType;
  inLeaderboard: boolean;
}

/* --|| GAME SETTINGS ||-- */

// the type for the settings available in the game
// any new settings types can be added here
export interface iGameSettingsType {
  availableDecks: iDeckOfCardsType[];
  activeDeckIndex: number;
}

// GAME CONTEXT use with react router
// It implements the Game settings and theLeaderboard
export interface iGameContextType {
  settings: [
    settings: iGameSettingsType,
    setSettings: (state) => iGameSettingsType
  ];
  leaderboard: [
    theLeaderboard: LeaderboardType[],
    setTheLeaderboard: (state) => LeaderboardType[],
  ];
}