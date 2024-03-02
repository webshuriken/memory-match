import { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import { DeckOfCards } from '../../globals/gameData';
import { InitLeaderboard } from '../../globals/gameData';
import { iGameContextType } from '../../globals/types';


export default function App(): JSX.Element {
  const [theGame, setTheGame] = useState<iGameContextType | null>();

  useEffect(() => {
    const state:iGameContextType = {
      game: {
        deckOfCards: DeckOfCards,
        player: {
          moves: '',
          name: '',
          time: ''
        }
      },
      leaderboard: InitLeaderboard
    }
    // prep the game
    setTheGame(state);
  }, []);

  console.log("APP SETTINGS: ", theGame);

  return (
    <div className="App">
      <header className="app-header">
        <span>Memory Match</span>
        <Nav />
      </header>
      <main>
        <Outlet context={theGame} />
      </main>
    </div>
  );
}

// active game deck and player stats
export function useGame() {
  const gameContext = useOutletContext<iGameContextType>();
  return gameContext.game;
}

// Leaderboard context
export function useLeaderboard() {
  const gameContext = useOutletContext<iGameContextType>();
  return gameContext.leaderboard;
}
