import { LeaderboardType, iDeckOfCardsType } from "./types"
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
    },{
      src: cardPlaceholderURL
    },{
      src: cardPlaceholderURL
    },{
      src: cardPlaceholderURL
    },{
      src: cardPlaceholderURL
    },{
      src: cardPlaceholderURL
    },{
      src: cardPlaceholderURL
    },{
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
export const InitLeaderboard: LeaderboardType[] = [{
  id: 'r33r',
  name: 'Pretender',
  time: '02:44',
  moves: 28,
  position: 1,
},{
  id: 'sc24x',
  name: 'Cerebellum',
  time: '01:28',
  moves: 26,
  position: 3,
},{
  id: 'dfs2',
  name: 'Lindsey',
  time: '00:55',
  moves: 22,
  position: 5,
},{
  id: 'gf2s',
  name: 'Pineapple',
  time: '01:11',
  moves: 0,
  position: 2,
},{
  id: 'jhg56',
  name: '',
  time: '03:33',
  moves: 0,
  position: 4,
},];