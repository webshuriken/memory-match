import { useState, useEffect } from "react";
import Card from "../Card/Card";
import { iCardsType, iCardFacesType } from '../../custom-types/types'


type Props = {
  deckOfCards: iCardsType;
  handleCardClick: (matchFound: boolean, incrementMoves: boolean) => void;
}

type LastCardFlipType = {
  id: number | undefined;
  pairID: number| undefined;
}

export default function GameCards({ deckOfCards, handleCardClick }: Props): JSX.Element {
  // component state
  const [lastCardFlip, setLastCardFlip] = useState<LastCardFlipType>({ id: undefined, pairID: undefined });
  const {alt, cover, faces} = deckOfCards;

  /**
   * receives the id, pairID to find a match or store to be matched from a card click
   * @param {<{id: number, pairID: number}>} object - card values passed in
   */
  function handleClick({ id, pairID }: { id: number, pairID: number }): void {
    // we use it tell parent when we find a match and whether to increment moves counter
    let matchFound = false;
    let incrementMoves = false;
    // is this a new card flip
    if (lastCardFlip.id === undefined) {
      const update: iCardFacesType[] = faces.map(face => {
        if (face.id === id) {
          return {
            ...face, 
            flipped: !face.flipped
          };
        }else{
          return face;
        }
      });
      // tracking the last card flipped
      setLastCardFlip(prevState => prevState === null ? prevState : { id, pairID });
    }else{
      incrementMoves = true;
      // use state and passed in fn() argument to check for match
      if (id !== lastCardFlip.id && pairID === lastCardFlip.pairID) {
        matchFound = true;
      }

      // create an update for the state depending on matchFound
      const update: iCardFacesType[] = faces.map((face) => {
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
      // reset local state
      setLastCardFlip({ id: undefined, pairID: undefined });
    }
    // parent to deal with other updates
    handleCardClick(matchFound, incrementMoves);
  }
  
  return (
    <div>
      <ul>
      {
        (faces !== null)
        ?
          faces.map((card, key)=> (
            <li key={key}>
              <Card cover={cover} face={card} alt={alt} handleClick={handleClick} />
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
