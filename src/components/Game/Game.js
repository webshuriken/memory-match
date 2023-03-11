import React, {useState} from "react";
import GameSidePanel from '../GameSidePanel/GameSidePanel.js';
import GameCards from '../GameCards/GameCards.js';


/**
 * Each deck of cards will have:
 * theme name, size of deck, cover image for the pack, cards with images and author details.
 * active property controls the card flip with a boolean.
 */
const deckOfCards = {
  theme: 'poker',
  coverDesign: {
    src: '',
    alt: ''
  },
  cards: [
    {
      name: 'a',
      src: '',
      alt: 'DOG'
    },
    {
      name: 'b',
      src: '',
      alt: 'HORSE'
    }
  ],
  authors: [
    {
      name: '',
      site: '',
    }
  ]
};

function Game() {
  console.log("LOADING GAME");
  const [gameMoves, setGameMoves] = useState(0);

  return (
    <section>
      <GameSidePanel moves={gameMoves} />
      <GameCards cards={deckOfCards.cards} setGameMoves={setGameMoves} />
    </section>
  )
}

export default Game;