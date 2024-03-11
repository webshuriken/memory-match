import { createContext, useReducer, Dispatch, useContext } from "react";
import { iTimerStateType } from "../custom-types/types";


type Props = {
  children: React.ReactNode;
}

// the start, pause, reset types are for the user to tell the system what to do
// tick type is for internal use, so the system knows if to keep counting
export type TimerActionType = {
  type: 'tick' | 'pause' | 'start' | 'reset';
}

// we need the initial values for the context
const TimerInitValue: iTimerStateType = {
  ticking: false,
  minutes: 0,
  seconds: 0,
  timeToString: function() {
    const m = this.minutes < 9 ? '0' + String(this.minutes) : this.minutes;
    const s = this.seconds < 9 ? '0' + String(this.seconds) : this.seconds;
    return `${m}:${s}`;
  }
}

export const TimerContext = createContext<iTimerStateType>(TimerInitValue);
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

// TODO: ISSUE FOUND HERE, THE OBJECT RETURNED DOES NOT CONTRAIN THE toString method!!! after dispatch
export function useTimerContext() {
  return useContext(TimerContext);
}

export function useTimerDispatch() {
  return useContext(TimerDispatchContext);
}

function TimerReducer(state: iTimerStateType, action: TimerActionType) {
  let { minutes, seconds } = state;

  switch(action.type) {
    case 'tick':
      let timer = (seconds === 59) ? {minutes: minutes + 1, seconds: 0} : {minutes, seconds: seconds + 1};      
      return {
        ...state,
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
      return TimerInitValue
    default:
      return state;
  }
}
