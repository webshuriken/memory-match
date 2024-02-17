import Moves from "../Moves/Moves";
import Timer from "../Timer/Timer";
import ButtonChip from "../ButtonChip/ButtonChip";
import { useTimerDispatch } from "../../context/TimerContext";
import { useMovesDispatch } from "../../context/MovesContext";


export default function GameDash(): JSX.Element {
  const dispatchTimer = useTimerDispatch();
  const dispatchMoves = useMovesDispatch();

  // reset timer and moves
  function resetDash() {
    if (dispatchTimer !== null && dispatchMoves !== null ) {
      dispatchTimer({ type: 'reset' });
      dispatchMoves({ type: 'reset' });
    }
  }

  return (
    <>
      <div>
        <ButtonChip value='Reset' handleClick={resetDash} />
      </div>
      <section role="status">
        <Moves />
        <Timer />
      </section>
    </>
  );
}