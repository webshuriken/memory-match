import { LeaderboardType, iDeckOfCardsType } from "../custom-types/types"
import cardPlaceholderURL from './cards-placeholder.png';


// TODO: FEAT-Game-1: how we expose this data can be changed
// exposes the images public id for the faces and cover.
export const CloudinaryCardsList: { faces: string[]; cover: string } = {
  faces: [
    'cards-blue_hair_uubbsf.png',
    'cards-haku_oxsscv.png',
    'cards-plant_me_thzzz5.png',
    'cards-dragon_plfggm.png',
    'cards-swirl_lady_gagxsr.png',
    'cards-spiral_eye_ueslyj.png',
    'cards-red_hair_f2hosm.png',
    'cards-yuki_greig0.png'
  ],
  cover: 'cards-cover_tusv76.png'
}

// exposes a deck of cards
export const DeckOfCards: iDeckOfCardsType = {
  author: {
    name: [
      'Amy L Sutton',
      'Carlos E Alford'
    ],
    site: [
      'https://amythehatter.com/',
      'https://carlosealford.com/'
    ]
  },
  cards: {
    alt: 'this is a memory card so, no peaking',
    faces: [{
      src: cardPlaceholderURL
    }],
    cover: {
      alt: 'poker mixed with some old doodles',
      src: cardPlaceholderURL
    },
  },
  size: 8,
  theme: 'poker ala doodles'
}

// exposes game data until we setup a proper backend
export const InitLeaderboard: LeaderboardType[] = [
  {
    id: 'dfs2',
    name: 'Lindsey',
    time: '00:55',
    moves: 22,
    position: 1,
  },
  {
    id: 'gf2s',
    name: 'Pineapple',
    time: '01:11',
    moves: 21,
    position: 2,
  },
  {
    id: 'sc24x',
    name: 'Cerebellum',
    time: '01:28',
    moves: 26,
    position: 3,
  },
  {
    id: 'r33r',
    name: 'Pretender',
    time: '01:44',
    moves: 28,
    position: 4,
  },
  {
    id: 'jhg56',
    name: 'Suavemente',
    time: '02:33',
    moves: 44,
    position: 5,
  }
];