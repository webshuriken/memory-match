import { useState, useEffect } from "react";
import GameCards from "../GameCards/GameCards";
import GameDash from "../GameDash/GameDash";
import { useTimerDispatch, useTimerContext } from "../../context/TimerContext";
import { useMovesDispatch } from "../../context/MovesContext";
import { useGame } from "../../routes/App/App";
import './GamePlay.css';


// parent passing in function to update their own state
type Props = {
  gameReady: boolean;
  setGameReady: (value: boolean) => void;
}

// this component should be taking care of preping the whole game
export default function GamePlay({ gameReady, setGameReady }: Props): JSX.Element {
  const [matchesFound, setMatchesFound] = useState<number>(0);
  const [resetGame, setResetGame] = useState<boolean>(false);
  const { gameDeck } = useGame();

  // timer context
  const {ticking} = useTimerContext();
  const timerDispatch = useTimerDispatch();
  // moves context
  const movesDispatch = useMovesDispatch();

  /**
   * Handles all card clicks to track game
   * @param {boolean} matchFound - whether the second card flip matches the previous one
   * @param {boolean} incrementMoves - shall we increment moves counter
   * @param {iCardFacesType[]} cardFacesUpdate
   */
  function handleCardClick(matchFound: boolean, incrementMoves: boolean): void {
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
    if (gameDeck.size === (matchesFound + 1)) {
      console.log("GAME: all matches found, ending game")
      // inform Game component the game has finished
      setTimeout(() => {
        setGameReady(false);
      }, 600);
    }else{
      console.log("GAME: match found!")
      // increment by 2 because we are removing a pair of cards from play
      setMatchesFound(prevState => prevState + 1);
    }
  }

  useEffect(() => {
    // lets reset the matches found baby
    if (resetGame) {
      setMatchesFound(0);
    }
  }, [resetGame])

  return (
    <section className="gameplay">
      <aside className="gamedash">
        <GameDash setResetGame={setResetGame} />
      </aside>
      <GameCards gameReady={gameReady} resetGame={resetGame} setResetGame={setResetGame}  handleCardClick={handleCardClick} />
    </section>
  )
}