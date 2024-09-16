import { useState } from "react";
import { MovesProvider } from "../../context/MovesContext";
import { TimerProvider } from "../../context/TimerContext";
import GamePlay from "../../components/GamePlay/GamePlay";
import GameEnd from "../../components/GameEnd/GameEnd";


export default function Game():JSX.Element {
  // indicates the game can be started at the users first click on a card
  const [gameReady, setGameReady] = useState<boolean>(true);

  return (
    <MovesProvider>
      <TimerProvider>
        {
          (gameReady)
          ?
            <GamePlay setGameReady={setGameReady} />
          :
            <GameEnd />
        }
      </TimerProvider>
    </MovesProvider>
  );
}
