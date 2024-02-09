import { useState } from "react";
import InputText from "../InputText/InputText";
import ButtonChip from "../ButtonChip/ButtonChip";
import ErrorMessage from "./ErrorMessage";
// modules still using require
const BadWordsArray = require('badwords/array');
const Filter = require('badwords-filter');


interface PlayerName {
  name: string;
  isProfanity: boolean;
  isTooShort: boolean;
}

export default function GameEnd(): JSX.Element {
  const [player, setPlayer] = useState<PlayerName>({
    name: '',
    isProfanity: false,
    isTooShort: false
  });

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
  function handleClick(): void {
    // in case someone tries to enter an empty string
    if (player.name.length === 0) return;
    // create filter of badwords
    const filter = new Filter({ list: BadWordsArray, useRegex: true });
    // check minimum length and if there are any profanities
    const tooShort = player.name.length < 4 ? true : false;
    const profanity = filter.isUnclean(player.name);
    // update the state with results
    setPlayer(prevState => ({ ...prevState, isProfanity: profanity, isTooShort: tooShort }))
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
