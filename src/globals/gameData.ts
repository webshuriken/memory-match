import { LeaderboardType, DeckOfCardsIntfc } from "./types"
import cardPlaceholderURL from './cards-placeholder.png';


// exposes a deck of cards
export const DeckOfCards: DeckOfCardsIntfc = {
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

// TODO : FIGURE A WAY TO WORK OUT THE SCORE
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