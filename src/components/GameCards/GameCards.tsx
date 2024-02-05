import { useState, useEffect } from "react";
import Card from "../Card/Card";
import { Cards, CardFaces } from '../../globals/types'


type Props = {
  cards: Cards;
  handleMatchFound: () => void;
}

interface LastCardFlip {
  id: number | undefined;
  pairID: number| undefined;
}

export default function GameCards({ cards, handleMatchFound }: Props): JSX.Element {
  const [cardDeck, setCardDeck] = useState<Cards | null>(null);
  const [lastCardFlip, setLastCardFlip] = useState<LastCardFlip>({ id: undefined, pairID: undefined });
  const { cover, alt, faces } = cards;

 /**
  * receives the id, pairID to find a match or store to be matched
  * @param {<{id: number, pairID: number}>} object - card values passed in
  * @returns 
  */
  function handleClick({ id, pairID }: { id: number, pairID: number }): void {
    // catch null states
    if (cardDeck === null) return;
  
    // are we looking to match previous card flip
    if (lastCardFlip.id === undefined) {
      const update: CardFaces[] = cardDeck.faces.map(face => {
        if (face.id === id) {
          return {
            ...face, 
            flipped: !face.flipped
          };
        }else{
          return face;
        }
      });

      // update the states
      setCardDeck(prevState => prevState === null ? prevState : { ...prevState, faces: update });
      setLastCardFlip(prevState => prevState === null ? prevState : { id, pairID });
    }else{
      let matchFound = false;

      // use state and passed in argument to check
      if (id !== lastCardFlip.id && pairID === lastCardFlip.pairID) {
        matchFound = true;
      }

      // create an update for the state depending on matchFound
      const update: CardFaces[] = cardDeck.faces.map((face) => {
        if (matchFound) {
          // flip the switch on latest flip
          if (face.id === id) {
            return {
              ...face,
              flipped: !face.flipped
            }
          }
          return face
        }else{
          // remove flipped switch from previous click
          if (face.id === lastCardFlip.id) {
            return {
              ...face,
              flipped: !face.flipped
            }
          }
          return face
        }
      });

      // update the states
      handleMatchFound(); // dealt by parent
      setCardDeck(prevState => prevState === null ? prevState : { ...prevState, faces: update });
      setLastCardFlip(prevState => prevState === null ? prevState : { id: undefined, pairID: undefined });
    }
  }

  /**
   * Shuffles the cards, augmenting them with flipped state and uniqueIDs
   * @param {CardFaces[]} cards - a set of cards to shuffle
   * @returns {CardFaces[]}
   */
  function shuffleCards(cards: CardFaces[]): CardFaces[] {
    const randSet: number[] = createRandomIDs(cards.length - 1);

    const shuffledCards: CardFaces[] = [];
    for (let i=0; i<cards.length; i++) {
      shuffledCards.push(cards[randSet[i]]);
    }

    return shuffledCards;
  }

  /**
   * create a random number, not already inside the list of random indices
   * @param {number} max - the upper limit of randomness, inclusive
   * @param {Array<number>} existingIndices - number list of existing indices
   * @returns {number}
   */
  function randomNumber(max: number, existingIndices: number[]): number {
    let randSearch = true;
    let index: number = 0;

    // get random number that does not match existing one from list
    while(randSearch) {
      index = Math.floor(Math.random() * (max + 1));
      if (!existingIndices.includes(index)) {
        randSearch = false;
      }
    }

    return index;
  }

  /**
   * Create a list of random IDs
   * @param {number} nOfIDs - the number of cards that need id
   * @returns {number[]}
   */
  function createRandomIDs(nOfIDs: number): number[] {
    // will store all the uniqueIDs for the cards
    let uniqueIDs: number[] = [];
    
    // deals with the creation of uniqueIDs
    let i = 0;
    while(i <= nOfIDs) {
      uniqueIDs.push(randomNumber(nOfIDs, uniqueIDs));
      i++;
    }
    
    return uniqueIDs;
  }

  /**
   * Add meta to each card to play the game
   */
  function addCardsMeta(): void {
    /*
     1. include random ids to identify each card
     2. include a matching pair id, to identify the pairs
     3. include flipped switch, tells if the card is flipped
    */
    // get random ids
    const randomIDs: number[] = createRandomIDs((faces.length * 2 ) - 1);

    // add the required meta to each card, while creating their double
    const cardsMeta:CardFaces[] = faces.reduce((prev: CardFaces[], curr: CardFaces, i: number) => {
      let meta:CardFaces = {
        ...curr,
        id: randomIDs.pop(),
        pairID: i,
        flipped: false
      }

      return [...prev, meta, { ...meta, id: randomIDs.pop() }];
    }, []);

    const shuffledCards: CardFaces[] = shuffleCards(cardsMeta);
    
    // update the component state with augmented/shuffled faces
    setCardDeck({ cover, alt, faces: shuffledCards });
  }
  
  // auto runs, for the initial render
  useEffect(() => {
    addCardsMeta();
  }, []);

  return (
    <div>
      <ul>
      {
        cardDeck !== null
        ?
        cardDeck.faces!.map((card, key)=> (
          <li key={key}>
            <Card cover={cover} card={card} alt={alt} handleClick={handleClick} />
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
