import { useState } from "react";
// moves, timer context
import { useMovesContext } from "../../context/MovesContext";
import { useTimerContext } from "../../context/TimerContext";
// modules still using require
const BadWordsArray = require('badwords/array');
const Filter = require('badwords-filter');


type NameError = {
  short?: string;
  profanity?: string;
  continue: boolean;
}

export default function GameEnd(): JSX.Element {
  // lets control this Form component
  const [playerName, setPlayerName] = useState('');
  const [nameError, setNameError] = useState<NameError>({ continue: false })

  // lets get some context
  const gameMoves = useMovesContext();
  const gameTimer = useTimerContext();

  function handlePlayerName(e: React.ChangeEvent<HTMLInputElement>) {
    setPlayerName(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const error: NameError = { continue: false };
    
    // is the word long enough
    if (playerName.length < 4) {
      error.short = 'Your name has to be between 4 and 20 characters';
    }
    
    // create bad words filter
    const filter = new Filter({ list: BadWordsArray, useRegex: true });
    if (filter.isUnclean(playerName)) {
      error.profanity = 'What did we say about bad words..';
    }

    if (Object.keys(error).length > 0) {
      setNameError(error);
    }

    // if we made it thus far then we good
    error.continue = true;

    // TODO: PREPP THE DATA FOR THE LEADERBOARD
  }

  return (
    <article>
      <header>
        <h2>Congratulations</h2>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
          <p>
            <label>
              <span>enter your name</span>
              <input 
                placeholder="max 20 characters" 
                type="text" 
                name="player_name" 
                maxLength={20}
                onChange={handlePlayerName}
              />
              {
                !nameError.continue 
                ?
                  <></>
                :
                  <span>
                    <span>{nameError.short}</span>
                    <span>{nameError.profanity}</span>
                  </span>
              }
            </label>
          </p>
          <p>
            <button type="submit">Continue</button>
          </p>
        </form>
      </div>
    </article>
  )
}
