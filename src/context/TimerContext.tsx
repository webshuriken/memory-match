import { createContext, useReducer, Dispatch, useContext } from "react";


type Props = {
  children: React.ReactNode;
}

// the start, pause, reset types are for the user to tell the system what to do
// tick type is for internal use, so the system knows if to keep counting
export type TimerActionType = {
  type: 'tick' | 'pause' | 'start' | 'reset';
}

// The mins/secs are kept as number because they are easier to implement
// It is up to the ui to turn them into string if required
// ticking property is so the ui knows that the timer is active
interface TimerStateInterface {
  ticking: boolean;
  minutes: number;
  seconds: number;
}

// we need the initial values for the context
const TimerInitValue: TimerStateInterface = {
  ticking: false,
  minutes: 0,
  seconds: 0
}

export const TimerContext = createContext<TimerStateInterface>(TimerInitValue);
export const TimerDispatchContext = createContext<Dispatch<TimerActionType> | null>(null);

export function TimerProvider({ children }: Props): JSX.Element {
  const [state, dispatch] = useReducer(TimerReducer, TimerInitValue);

  return (
    <TimerContext.Provider value={state}>
      <TimerDispatchContext.Provider value={dispatch}>
        <>
        { children }
        </>
      </TimerDispatchContext.Provider>
    </TimerContext.Provider>
  );
}

export function useTimerContext() {
  return useContext(TimerContext);
}

export function useTimerDispatch() {
  return useContext(TimerDispatchContext);
}

function TimerReducer(state: TimerStateInterface, action: TimerActionType) {
  let { minutes, seconds } = state;

  switch(action.type) {
    case 'tick':
      let timer = (seconds === 59) ? {minutes: minutes + 1, seconds: 0} : {minutes, seconds: seconds + 1};      
      return {
        ticking: true,
        ...timer
      }
    case 'pause':
      return {
        ...state,
        ticking: false
      }
    case 'start':
      return {
        ...state,
        ticking: true
      }
    case 'reset':
      return {
        ticking: false,
        minutes: 0,
        seconds: 0
      }
    default:
      return state;
  }
}
