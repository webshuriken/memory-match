import React from "react";
import GameSidePanel from '../GameSidePanel/GameSidePanel.js';
import GameCards from '../GameCards/GameCards.js';


function Game() {
  return (
    <section>
      <GameSidePanel />
      <GameCards />
    </section>
  )
}

export default Game;