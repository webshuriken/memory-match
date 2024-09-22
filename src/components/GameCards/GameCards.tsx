import { useState, useEffect, SetStateAction, Dispatch } from "react";
import Card from "../Card/Card";
import { DeckOfCards } from "../../globals/gameData";
import { createRandomIDs } from "../../utils";
import { iCardsType, iCardFacesType } from '../../custom-types/types'
import './GameCards.css';


type Props = {
  gameReady: boolean;
  setResetGame: Dispatch<SetStateAction<boolean>>;
  resetGame: boolean;
  handleCardClick: (matchFound: boolean, incrementMoves: boolean) => void;
}

type FlippedCardsType = {
  id: number;
  pairID?: number;
}[];

export default function GameCards({ gameReady, resetGame, setResetGame, handleCardClick }: Props): JSX.Element {
  // component state
  const [flippedCards, setFlippedCards] = useState<FlippedCardsType>([]);
  // we just need the face cards and the cover
  const [deckOfCards, setDeckOfCards] = useState<iCardsType | null>(null);

  /**
   * Takes the name of an image and returns the URL made available by Cloudinary
   * @param {string} imagePublicID - Cloudinary public ID for the image
   * @returns {string} url of the image
   */
    function fetchImageURL(imagePublicID: string): string {
      const folderName = 'memory-match-cards';
      const url = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/upload/${folderName}/${imagePublicID}`
      return url;
    }

  /**
   * 
   * @param cards <FlippedCardType[]> - an array of 1 card or 2 cards that have been flipped
   * @param stayFlipped boolean - lets us know if we should flip the card
   */
  function updateCardsFace(cards: FlippedCardsType, stayFlipped: boolean): void {
    // update the deckOfCards
    if (deckOfCards !== null) {
      let faces: iCardFacesType[];
      // only flip a single card
      if (cards.length === 1) {
        const [firstCard] = cards;
        faces = deckOfCards.faces.map(face => (face.id === firstCard.id) ? { ...face, flipped: stayFlipped } : face);
      }else{
        // we are flippin two card back or keeping them wide open
        const [firstCard, secondCard] = cards;
        faces = deckOfCards.faces.map(face => (face.id === firstCard.id || face.id === secondCard.id) ? { ...face, flipped: stayFlipped } : face);
      }
      // locally mutate a new deck
      const deck = {
        ...deckOfCards,
        faces: faces
      };
      // now update the state with local mutation
      setDeckOfCards(deck);
      // reset the flipped cards state
      if (cards.length === 2) {
        setFlippedCards([]);
      }
    }
  }

  /**
   * receives the id, pairID to find a match or store to be matched from a card click
   * @param {<{id: number, pairID: number}>} object - card values passed in
   */
  function handleClick({ id, pairID }: { id: number, pairID: number }): void {
    // ignore any further requests after two cards are flipped
    if (flippedCards.length === 2) {
      return;
    }
    
    // here for TS sakes
    if (deckOfCards !== null) {
      // update the deckOfCards
      updateCardsFace([{id, pairID}], true);
    }

    let matchFound = false;
    let bustaMove = false;

    // locally mutate for further use and state update
    let newFlippedCards: FlippedCardsType;
    if (flippedCards.length === 0 || flippedCards.length === 1 && flippedCards[0].id !== id) {
      newFlippedCards = [...flippedCards, { id, pairID }];
      bustaMove = true;
    }else{
      newFlippedCards = flippedCards;
    }
    // state update
    setFlippedCards(newFlippedCards);

    // with two cards facing  us we can check if they are a match
    if (newFlippedCards.length === 2) {
      // are they matching
      if (newFlippedCards[0].pairID === newFlippedCards[1].id) {
        matchFound = true;
        updateCardsFace(newFlippedCards, true);
      }else{
        setTimeout(() => {
          updateCardsFace(newFlippedCards, false);
        }, 600);
      }
    }

    handleCardClick(matchFound, bustaMove);
  }

  /**
   * Add meta to each card to play the game
   * @param cards <iCardFacesType[]> - the array of cards to augment
   * @returns <iCardFacesType[]>
   */
  function addCardsMeta(cards: iCardFacesType[]): iCardFacesType[] {
    // get random ids
    const randomIDs: number[] = createRandomIDs(cards.length * 2);

    // add the required meta to each card, while creating their double
    const cardsMeta:iCardFacesType[] = cards.reduce((prev: iCardFacesType[], curr: iCardFacesType, i: number) => {
      // grab two ids, one for each pair
      const idA = randomIDs.pop();
      const idB = randomIDs.pop();

      // meta for first card
      let meta:iCardFacesType = {
        src: fetchImageURL(curr.src),
        id: idA,
        pairID: idB,
        flipped: false
      }
      // meta for second card along side the first card
      return [...prev, meta, { ...meta, id: idB, pairID: idA }];
    }, []);
    
    // return the augmented face cards
    return cardsMeta;
  }

  /**
   * Shuffles the cards, adding uniqueIDs
   * @param {iCardFacesType[]} cards - a set of cards to shuffle
   * @returns {iCardFacesType[]}
   */
  function shuffleCards(cards: iCardFacesType[]): iCardFacesType[] {
    const randSet: number[] = createRandomIDs(cards.length - 1);

    const shuffledCards: iCardFacesType[] = [];
    for (let i=0; i<cards.length; i++) {
      shuffledCards.push(cards[randSet[i]]);
    }

    return shuffledCards;
  }
  
  useEffect(() => {
    if (deckOfCards === null && gameReady) {
      // augment the cards. no need to change unless loading a new deck
      let augmentedCards = addCardsMeta(DeckOfCards.cards.faces);
      // construct augmented deck and shuffle cards
      let augmentedDeck = { 
        alt: DeckOfCards.cards.alt,
        cover: {
          alt: DeckOfCards.cards.cover.alt,
          src: fetchImageURL(DeckOfCards.cards.cover.src)
        },
        faces: shuffleCards(augmentedCards)
      };
      setDeckOfCards(augmentedDeck);
    }
    // on game reset just shuffle the cards and flip them back
    if (deckOfCards !== null && resetGame) {
      const shuffledCards = {
        ...deckOfCards,
        faces: shuffleCards(deckOfCards.faces)
      }

      setDeckOfCards(shuffledCards)
      setResetGame(false);
    }
  }, [resetGame]);
  
  return (
    <div className="gamecards">
      <ul className="gamecards-list">
      {
        (deckOfCards !== null && gameReady)
        ?
        deckOfCards.faces.map((card, key)=> (
            <li key={key} className="gamecards-list__item">
              <Card cover={deckOfCards.cover} face={card} alt={deckOfCards.alt} handleClick={handleClick} />
            </li>
          ))
        :
          <li>
            <h3>No Deck of Cards to play with..</h3>
            <p>We shall be looking into this ^_^</p>
          </li>
      }
      </ul>
    </div>
  )
}
