import { useEffect, useRef } from "react";
import { useTimerContext, useTimerDispatch } from "../../context/TimerContext";


export default function Timer(): JSX.Element {
  const {ticking, minutes, seconds} = useTimerContext();
  const dispatch = useTimerDispatch();
  const timerIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // the useEffect will depend on the ticking<boolean> to know when to start or stop counter
  useEffect(() => {
    function startTimer() {
      timerIdRef.current = setInterval(() => {
        // options tick, pause, reset
        if (dispatch !== null) {
          dispatch({ type: 'tick' });
        }
      }, 1000);
    }
    
    if (ticking) { startTimer(); }
  
    // clear the interval, when the counter resets or is paused
    return () => {
      if (timerIdRef.current !== null) {
        return clearInterval(timerIdRef.current);
      }
    };
  }, [ticking]);

  // prep the minutes and seconds to be visually pleasing = 00:00
  const mins: string = minutes > 9 ? `${minutes}` : `0${minutes}`;
  const secs: string = seconds > 9 ? `${seconds}` : `0${seconds}`;

  return (
    <article>
      <p>Timer</p>
      <div role="timer">
        <span>{mins}</span>:<span>{secs}</span>
      </div>
    </article>
  )
}
