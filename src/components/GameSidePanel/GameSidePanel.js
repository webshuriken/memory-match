import React from "react";
import SidePanelTimer from '../SidePanelTimer/SidePanelTimer.js';
import SidePanelMoves from '../SidePanelMoves/SidePanelMoves.js';
import GameButton from '../GameButton/GameButton.js'


function GameSidePanel() {
  return (
    <article>
      <SidePanelTimer />
      <SidePanelMoves />
      <GameButton />
      <GameButton />
    </article>
  )
}

export default GameSidePanel;