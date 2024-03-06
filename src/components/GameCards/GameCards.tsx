import { useState, useEffect } from "react";
import Card from "../Card/Card";
import { iCardsType, iCardFacesType } from '../../custom-types/types'
import { useTimerDispatch, useTimerContext } from "../../context/TimerContext";


type Props = {
  deckOfCards: iCardsType;
  handleMatchFound: () => void;
}

type LastCardFlipType = {
  id: number | undefined;
  pairID: number| undefined;
}

export default function GameCards({ deckOfCards, handleMatchFound }: Props): JSX.Element {
  // timer context
  const {ticking} = useTimerContext();
  const timerDispatch = useTimerDispatch();
  // component state
  const [lastCardFlip, setLastCardFlip] = useState<LastCardFlipType>({ id: undefined, pairID: undefined });
  const {alt, cover, faces} = deckOfCards;

  /**
   * receives the id, pairID to find a match or store to be matched from a card click
   * @param {<{id: number, pairID: number}>} object - card values passed in
   */
  function handleClick({ id, pairID }: { id: number, pairID: number }): void {
    // when clock is not ticking, is ready to go and user clicked a card, start timer
    if (!ticking && timerDispatch !== null) { timerDispatch({ type: 'start' }); }
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
