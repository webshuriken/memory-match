import { useState, useEffect } from "react";
import GameCards from "../GameCards/GameCards";
import GameDash from "../GameDash/GameDash";
import { iCardsType, iCardFacesType } from "../../custom-types/types";
import { DeckOfCards, CloudinaryCardsList } from "../../globals/gameData";
import { createRandomIDs } from "../../utils";
import { useTimerDispatch, useTimerContext } from "../../context/TimerContext";
import { useMovesDispatch } from "../../context/MovesContext";
import './GamePlay.css';


// parent passing in function to update their own state
type Props = {
  setGameReady: (value: boolean) => void;
}

type FacesURLType = {
  src: string
}[];

// this component should be taking care of preping the whole game
export default function GamePlay({ setGameReady }: Props): JSX.Element {
  const [matchesFound, setMatchesFound] = useState<number>(0);
  // we just need the face cards and the cover
  const [deckOfCards, setDeckOfCards] = useState<iCardsType | null>(null);
  // timer context
  const {ticking} = useTimerContext();
  const timerDispatch = useTimerDispatch();
  // moves context
  const movesDispatch = useMovesDispatch();

  /**
   * Handles all card clicks to track game
   * @param {boolean} matchFound - whether the second card flip matches the previous one
   * @param {boolean} incrementMoves - shall we increment moves counter
   */
  function handleCardClick(matchFound: boolean, incrementMoves: boolean) {
    // when clock is not ticking, is ready to go and user clicked a card, start timer
    if (!ticking && timerDispatch !== null) { timerDispatch({ type: 'start' }); }

    // two flips counts as a move, on second flip increment moves counter
    if ( movesDispatch !== null && incrementMoves ) { movesDispatch({ type: 'add' }); }

    // do we have a match
    if (matchFound) { handleMatchFound() }
  }

  /**
   * Takes care when a matching pair is found
   */
  function handleMatchFound(): void {
    if (deckOfCards?.faces.length === (matchesFound + 2)) {
      console.log("ALL MATCHES FOUND, ENDING GAME")
      // inform Game component the game has finished
      setGameReady(false)
    }else{
      console.log("FOUND A MATCH")
      // increment by 2 because we are removing a pair of cards from play
      setMatchesFound(prevState => prevState + 2);
    }
  }

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
    <section className="gameplay">
      <aside role="complementary" className="gamedash">
        <GameDash />
      </aside>
      {
        deckOfCards !== null
        ?
          <GameCards deckOfCards={deckOfCards} handleCardClick={handleCardClick} />
        :
          <p>Cards are loading..</p>
      }
    </section>
  )
}