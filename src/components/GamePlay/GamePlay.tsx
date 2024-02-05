import { useState } from "react";
import GameCards from "../GameCards/GameCards";
import GameDash from "../GameDash/GameDash";
import { Cards } from "../../globals/types";


type Props = {
  cards: Cards;
  gameInProgress: (value: boolean) => void;
}

export default function GamePlay({ cards, gameInProgress }: Props): JSX.Element {
  const [matchesFound, setMatchesFound] = useState<number>(0);

  /**
   * Takes care when a matching pair is found
   */
  function handleMatchFound() {
    // when we have found all matches, make parent aware
    if (cards.faces.length === matchesFound) {
      gameInProgress(true)
    }else{
      setMatchesFound(prevState => prevState + 1);
    }
  }

  return (
    <>
      <aside role="complementary">
        <GameDash />
      </aside>
      <GameCards cards={cards} handleMatchFound={handleMatchFound} />
    </>
  )
}