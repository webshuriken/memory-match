import { useState } from "react";
// moves, timer context
import { useMovesContext } from "../../context/MovesContext";
import { useTimerContext } from "../../context/TimerContext";
import { useOutletContext } from "react-router-dom";
// types
import { iPlayerGameStats } from "../../custom-types/types";
import { privateDecrypt } from "crypto";
// modules still using require
const BadWordsArray = require('badwords/array');
const Filter = require('badwords-filter');


type ErrorNameBodyType = {
  error: boolean;
  msg: string;
}
type NameErrorType = {
  short: ErrorNameBodyType;
  profanity: ErrorNameBodyType;
}

// message for the user when they do what of the two errors
const ERROR_SHORT_MSG = 'Your name has to be between 4 and 20 characters';
const ERROR_PROFANITY_MSG = 'What did we say about bad words..';

export default function GameEnd(): JSX.Element {
  // lets control this Form component
  const [playerName, setPlayerName] = useState('');
  const [nameError, setNameError] = useState<NameErrorType>({
    short: { error: false, msg: ERROR_SHORT_MSG },
    profanity: { error: false, msg: ERROR_PROFANITY_MSG }
  });

  // lets get some context
  const gameMoves = useMovesContext();
  const gameTimer = useTimerContext();
  const {updatePlayerStats}: any = useOutletContext(); // TODO: CONTEXT

  function handlePlayerName(e: React.ChangeEvent<HTMLInputElement>) {
    setPlayerName(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let tooShort = false;
    let hasProfanity = false;
    
    // is the word long enough
    if (playerName.length < 4) {
      tooShort = true;
    }
    
    // create our bad words filter, make sure to use regex option so we can catch sneaky people
    const filter = new Filter({ list: BadWordsArray, useRegex: true });
    if (filter.isUnclean(playerName)) {
      hasProfanity = true;
    }

    // updating the state when there is an error so we can msg the user about the mistake
    if (hasProfanity || tooShort) {
        setNameError(prevState => {
          return {
            profanity: {
              ...prevState.profanity,
              error: hasProfanity
            },
            short: {
              ...prevState.short,
              error: tooShort
            }
          };
        });
    }else{
      // prep the stats from the current game to update theGame state
      const playerStats: iPlayerGameStats = {
        time: gameTimer.timeToString(),
        moves: String(gameMoves),
        name: playerName
      }
      // updatePlayerStats(playerStats);

      // reset this components errors state before we move on
      setNameError(prevState => {
        return {
          profanity: {
            ...prevState.profanity,
            error: false
          },
          short: {
            ...prevState.short,
            error: false
          }
        };
      });
    }
  }

  console.log("ERROR: ", nameError)

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
                nameError.profanity.error ? <span>{nameError.profanity.msg}</span> : <></>
              }
              {
                nameError.short.error ? <span>{nameError.short.msg}</span> : <></>
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
