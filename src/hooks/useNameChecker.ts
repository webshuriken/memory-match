import { useMovesContext } from "../context/MovesContext";
import { useTimerContext } from "../context/TimerContext";


type NameError = {
  short?: string;
  profanity?: string;
  continue: boolean;
}


export async function useNameChecker(value:string) {
  console.log("PERFORMING END OF GAME ACTION: ", value)
  // context
  // const moves = useMovesContext();
  // const time = useTimerContext();
  // const leaderboard = useLeaderboard();
  const error:NameError = { continue: false };

  console.log("E: ", error)

  // // in case someone tries to enter an empty string
  // if (name.length === 0) return error;

  // // create filter of badwords
  // const filter = new Filter({ list: BadWordsArray, useRegex: true });
  
  // // is it long enough
  // if (name.length < 4) {
  //   error.short = 'Your name has to be between 4 and 20 characters';
  // }

  // // and no profanities
  // if (filter.isUnclean(name)) {
  //   error.profanity = 'What did we say about bad words..';
  // }

  // // show the errors to user if any
  // if (Object.keys(error).length > 0) {
  //   return error;
  // }

  function handleChange() {
    console.log("YOU ARE MAMKING SOM EHCANGED")
  }

  const nameChecker = {
    continue: true,
    onChange: handleChange
  }

  return nameChecker;
}