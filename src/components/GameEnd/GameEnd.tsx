import { useState } from "react";
import { useNavigate } from "react-router-dom";
// moves, timer context
import { useMovesContext } from "../../context/MovesContext";
import { useTimerContext } from "../../context/TimerContext";
// types
import { iPlayerGameStats } from "../../custom-types/types";
import './GameEnd.css';
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
const ERROR_PROFANITY_MSG = 'NO bad words..';

export default function GameEnd(): JSX.Element {
  // lets control this Form component
  const [playerName, setPlayerName] = useState('');
  const [nameError, setNameError] = useState<NameErrorType>({
    short: { error: false, msg: ERROR_SHORT_MSG },
    profanity: { error: false, msg: ERROR_PROFANITY_MSG }
  });
  // we will use navigation to move to the leaderboard page and pass in some props
  const navigate = useNavigate();

  // lets get some context
  const gameMoves = useMovesContext();
  const gameTimer = useTimerContext();

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

      // lets move on to the leaderboard page
      navigate("/leaderboard", { state: playerStats });
    }
  }

  return (
    <section className="gameend">
      <header className="gameend-header">
        <h2>Congratulations!</h2>
      </header>
      <div>
        <form onSubmit={handleSubmit} className="gameend-form">
          <label className="gameend-form__label">
            <span>enter your name</span>
            <input 
              placeholder="max 20 characters" 
              type="text" 
              name="player_name" 
              maxLength={20}
              onChange={handlePlayerName}
              autoFocus={true}
              required={true}
            />
            {
              nameError.profanity.error ? <p>{nameError.profanity.msg}</p> : <></>
            }
            {
              nameError.short.error ? <p>{nameError.short.msg}</p> : <></>
            }
          </label>
          <input 
            type="submit" 
            value="Continue"
            className="button-chip button-chip__red button__shine-effect gameend-form__submit"
          />
        </form>
      </div>
    </section>
  )
}
