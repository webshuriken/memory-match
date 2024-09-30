import Moves from "../Moves/Moves";
import Timer from "../Timer/Timer";
import ButtonChip from "../ButtonChip/ButtonChip";
import { useTimerDispatch } from "../../context/TimerContext";
import { useMovesDispatch } from "../../context/MovesContext";
import './GameDash.css';
import { SetStateAction, Dispatch } from "react";


type Props = {
  setResetGame: Dispatch<SetStateAction<boolean>>;
}

export default function GameDash({ setResetGame }: Props): JSX.Element {
  const dispatchTimer = useTimerDispatch();
  const dispatchMoves = useMovesDispatch();

  // reset timer, moves, and cards
  function resetDash() {
    if (dispatchTimer !== null && dispatchMoves !== null ) {
      dispatchTimer({ type: 'reset' });
      dispatchMoves({ type: 'reset' });
      // signal card shuffle
      setResetGame(true);
    }
  }

  return (
    <>
      <div className="gamedash-button">
        <ButtonChip value='Reset' handleClick={resetDash} />
      </div>
      <section role="status" className="gamedash-tracking">
        <Moves />
        <Timer />
      </section>
    </>
  );
}