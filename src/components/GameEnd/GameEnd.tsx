import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputText from "../InputText/InputText";
import ButtonChip from "../ButtonChip/ButtonChip";
import ErrorMessage from "./ErrorMessage";
// moves, timer context
import { useMovesContext } from "../../context/MovesContext";
import { useTimerContext } from "../../context/TimerContext";
// modules still using require
const BadWordsArray = require('badwords/array');
const Filter = require('badwords-filter');


interface PlayerName {
  name: string;
  isProfanity: boolean;
  isTooShort: boolean;
}

interface PlayerStats {
  name: string;
  time: {
    mins: number;
    secs: number;
  },
  moves: number;
}

export default function GameEnd(): JSX.Element {
  const [player, setPlayer] = useState<PlayerName>({
    name: '',
    isProfanity: false,
    isTooShort: false
  });
  // this is so we can manually navigate to the desired page
  const navigate = useNavigate();
  // context
  const moves = useMovesContext();
  const { ticking, minutes, seconds } = useTimerContext();

  /**
   * Simply updates the this components state with user text
   * @param {string} name - the text entered by the user
   */
  function handlePlayerName(name: string): void {
    setPlayer(prevState => ({ ...prevState, name: name }));
  }

  /**
   * Checks the text entered by user and presents error messages
   * @returns undefined - used to exit early
   */
  function handleClick(event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>): void {
    // in case someone tries to enter an empty string
    if (player.name.length === 0) return;

    // create filter of badwords
    const filter = new Filter({ list: BadWordsArray, useRegex: true });
    // check minimum length and if there are any profanities
    const tooShort = player.name.length < 4 ? true : false;
    const profanity = filter.isUnclean(player.name);
    
    // update state if checks are not met, this is so we rerender page or lets moves on to leaderboard
    if (tooShort || profanity) {
      // update the state with results
      setPlayer(prevState => ({ ...prevState, isProfanity: profanity, isTooShort: tooShort }));
    }else{
      prepPlayerStats();
    }
  }

  function prepPlayerStats(): void {
    const latestPlayerStats: PlayerStats = {
      name: player.name,
      time: {
        mins: minutes,
        secs: seconds
      },
      moves: moves
    }
    console.log("HERE IS THE GAME STATS: ", latestPlayerStats)
  }

  return (
    <article>
      <header>
        <h2>Congratulations</h2>
      </header>
      <div>
        <InputText handlePlayerName={handlePlayerName} />
        <ErrorMessage isProfanity={player.isProfanity} isTooShort={player.isTooShort} />
        <ButtonChip handleClick={handleClick} value='Continue' />
      </div>
    </article>
  )
}
