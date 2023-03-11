import React, {useState} from "react";
import SidePanelTimer from '../SidePanelTimer/SidePanelTimer.js';
import SidePanelMoves from '../SidePanelMoves/SidePanelMoves.js';
import GameButton from '../GameButton/GameButton.js'


function GameSidePanel() {
  console.log("LOADING GAME SIDE PANEL");
  // TODO: see if there is a better place for this state
  const [timerState, setTimerState] = useState('paused');

  function resetGame() {
    console.log("LETS RESET THE GAME");
  }
  
  function quitGame() {
    console.log("LETS QUIT THE GAME");
  }

  return (
    <article>
      <SidePanelTimer state={timerState} />
      <div>
        <p>Moves</p>
        <p>0</p>
      </div>
      <GameButton text="Reset" cb={resetGame} />
      <GameButton text="Quit" cb={quitGame} />
    </article>
  )
}

export default GameSidePanel;