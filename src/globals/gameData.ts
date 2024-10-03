import { LeaderboardType, iDeckOfCardsType } from "../custom-types/types"
import cardBackPlaceholderURL from './cards-placeholder.png';
import cardFacePlaceholderURL from './cards-yuki.png';


// TODO: FEAT-Game-1: how we expose this data can be changed
// exposes the images public id for the faces and cover.
export const AvailableGameDecks: iDeckOfCardsType[] = [
  {
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
      faces: [
        { src: 'cards-blue_hair_uubbsf.png' },
        { src: 'cards-haku_oxsscv.png' },
        { src: 'cards-plant_me_thzzz5.png' },
        { src: 'cards-dragon_plfggm.png' },
        { src: 'cards-swirl_lady_gagxsr.png' },
        { src: 'cards-spiral_eye_ueslyj.png' },
        { src: 'cards-red_hair_f2hosm.png' },
        { src: 'cards-yuki_greig0.png' }
      ],
      cover: {
        alt: 'poker mixed with some old doodles',
        src: 'cards-cover_tusv76.png'
      },
    },
    size: 8,
    theme: 'poker ala doodles'
  },
  {
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
      alt: 'this is a memory card, no peaking',
      faces: [
        { src: 'cards-blue-fedora_aoiu1g.png' },
        { src: 'cards-blue-rabbit_pjom9x.png' },
        { src: 'cards-frog_vupmql.png' },
        { src: 'cards-jester_lpobfb.png' },
        { src: 'cards-red-fedora_tstayr.png' },
        { src: 'cards-top-hat_akfhle.png' },
        { src: 'cards-tricorn_bcqu31.png' },
        { src: 'cards-solar-system_potlda.png' }
      ],
      cover: {
        alt: 'amy sutton hat made of sinamey cubes of varying colours',
        src: 'cards-cover_jhcag3.png'
      },
    },
    size: 8,
    theme: 'Amy the hatter, hats collection'
  }
];

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