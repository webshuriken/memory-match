import { useState } from "react";
import GameCards from "../GameCards/GameCards";
import GameDash from "../GameDash/GameDash";
import { CardsIntfc } from "../../globals/types";


type Props = {
  cards: CardsIntfc;
  setGameReady: (value: boolean) => void;
}

export default function GamePlay({ cards, setGameReady }: Props): JSX.Element {
  const [matchesFound, setMatchesFound] = useState<number>(0);

  /**
   * Takes care when a matching pair is found
   */
  function handleMatchFound(): void {
    if (cards.faces.length === matchesFound) {
      setGameReady(false)
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