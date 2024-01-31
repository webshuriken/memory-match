import { createContext, useReducer, useContext, Dispatch } from "react";


type Props = {
  children: React.ReactNode;
}

export type MovesActionType = {
  type: 'add' | 'reset';
}

interface MovesStateInterface {
  counter: number;
}

export const MovesContext = createContext<number>(0);
export const MovesDispatchContext = createContext<Dispatch<MovesActionType> | null>(null);

/**
 * Allows all children access to the moves values and a way to reset it or increment it
 * @param param Children 
 * @returns JSX element wrapped with the moves context
 */
export function MovesProvider({ children }: Props): JSX.Element {
  const [moves, dispatch] = useReducer(movesReducer, { counter: 0 });

  return (
    <MovesContext.Provider value={moves.counter}>
      <MovesDispatchContext.Provider value={dispatch}>
        <>
          {children}
        </>
      </MovesDispatchContext.Provider>
    </MovesContext.Provider>
  )
}

export function useMovesContext() {
  return useContext(MovesContext);
}

export function useMovesDispatch() {
  return useContext(MovesDispatchContext);
}

function movesReducer(state: MovesStateInterface, action: MovesActionType) {
  switch (action.type) {
    case 'add':
      return { counter: state.counter + 1 };
    case 'reset':
      return state = { counter: 0 }
    default:
      return state;
  }
}