import { useState, useEffect } from "react";
import Card from "../Card/Card";
import { DeckOfCards, CloudinaryCardsList } from "../../globals/gameData";
import { createRandomIDs } from "../../utils";
import { iCardsType, iCardFacesType } from '../../custom-types/types'
import './GameCards.css';


type Props = {
  handleCardClick: (matchFound: boolean, incrementMoves: boolean) => void;
}

type FlippedCardsType = {
  id: number;
  pairID?: number;
}[]

export default function GameCards({ handleCardClick }: Props): JSX.Element {
  // component state
  const [flippedCards, setFlippedCards] = useState<FlippedCardsType>([]);
  // we just need the face cards and the cover
  const [deckOfCards, setDeckOfCards] = useState<iCardsType | null>(null);
  console.log("DECK: ", deckOfCards)

  /*
   * TODO: LOGIC FOR THE CARDS FLIPPIN
   * ===========
   * use a function to update the deck of cards to flip cards when required
   * 1. will flip the card if lastcardflip === undefine
   * 2. if lastcardflip set then check that this card is not the one already flipped and flip it, otherwise do nothing
   * 3. allow for multiple cards to be flipped back (like a reset if there is no match)
   * ===========
   * 1. if lastcardflip === undefined, 
   *  - update lastcardflip to this id and its pairID
   *  - increment moves
   * 2. if current flip id is not lastcardflip id then
   *  - increment moves
   *  - check if the cards are pair
   *   - if the cards are not pairs, reset the cards by flipping them back
   *   - if they are pairs then matchFound = true and dont flip the cards
   *    - MAKE SURE TO DISABLE THEIR CLICK ABILITIES
   */


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
   * @param reveal boolean - whether to reveal the card or hide it
   * @param card <iCardFacesType> - takes in a card to flip
   */
  function updateCardsFace(cards: FlippedCardsType, stayFlipped: boolean): void {

    // update the deckOfCards
    if (deckOfCards !== null) {
      let faces: iCardFacesType[];
      if (cards.length === 1) {
        const [firstCard] = cards;
        faces = deckOfCards.faces.map(face => (face.id === firstCard.id) ? { ...face, flipped: stayFlipped } : face);
      }else{
        const [firstCard, secondCard] = cards;
        faces = deckOfCards.faces.map(face => (face.id === firstCard.id || face.id === secondCard.id) ? { ...face, flipped: stayFlipped } : face);
      }
      const deck = {
        ...deckOfCards,
        faces: faces
      };
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
    
    if (deckOfCards !== null) {
      // update the deckOfCards
      updateCardsFace([{id, pairID}], true);
    }

    const newFlippedCards = [...flippedCards, { id, pairID }];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      checkForMatch(newFlippedCards);
    }

    // TODO: games need to be able to reset
    // TODO: activate timer
    // TODO: count moves
    // TODO: parent to deal with other updates
    // handleCardClick(matchFound, incrementMoves);
  }

  function checkForMatch(flippedCards: FlippedCardsType): void {
    let matchFound = false;

    if (flippedCards[0].pairID === flippedCards[1].id) {
      matchFound = true;
      updateCardsFace(flippedCards, true);
    }else{
      setTimeout(() => {
        updateCardsFace(flippedCards, false);
      }, 600);
    }
  }


  /**
   * Add meta to each card to play the game
   */
  function addCardsMeta(cards: iCardFacesType[]): iCardFacesType[] {
    // TODO: UNCOMMENT THE CODE SO WE CAN FETCH IMAGES AGAIN
    // get the url for the faces images
    // const faces:FacesURLType = CloudinaryCardsList.faces.map(imagePublicID => {
    //   const eminem = fetchImageURL(imagePublicID);
    //   return {
    //     src: eminem
    //   }
    // });
    // now grab the url for cover card
    //cover.src = fetchImageURL(CloudinaryCardsList.cover);
    // get random ids
    const randomIDs: number[] = createRandomIDs(cards.length * 2);

    // add the required meta to each card, while creating their double
    const cardsMeta:iCardFacesType[] = cards.reduce((prev: iCardFacesType[], curr: iCardFacesType, i: number) => {
      // grab two ids, one for each pair
      const idA = randomIDs.pop();
      const idB = randomIDs.pop();
      // meta for first card
      let meta:iCardFacesType = {
        ...curr,
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
    // augment the cards. no need to change unless loading a new deck
    let augmentedCards = addCardsMeta(DeckOfCards.cards.faces);
    // shuffle
    let augmentedDeck = { 
      alt: DeckOfCards.cards.alt,
      cover: DeckOfCards.cards.cover,
      faces: shuffleCards(augmentedCards)
    };
    setDeckOfCards(augmentedDeck)
  }, []);
  
  return (
    <div className="gamecards">
      <ul className="gamecards-list">
      {
        (deckOfCards !== null)
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
