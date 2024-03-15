import { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import { DeckOfCards, InitLeaderboard } from '../../globals/gameData'
import { iGameSettingsType, iGameContextType, LeaderboardType } from '../../custom-types/types';


export default function App(): JSX.Element {
  const [theGame, setTheGame] = useState<iGameSettingsType | undefined>(undefined);
  const [theLeaderboard, setTheLeaderboard] = useState<LeaderboardType[] | undefined>(undefined);

  useEffect(() => {
    // prep the game
    setTheGame({ deckOfCards: DeckOfCards });
    setTheLeaderboard(InitLeaderboard);
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <span>Memory Match</span>
        <Nav />
      </header>
      <main>
        <Outlet context={{ theGame, theLeaderboard }} />
      </main>
    </div>
  );
}

// Game settings context
export function useGame() {
  const gameContext = useOutletContext<iGameContextType>();
  return gameContext.theGame;
}

// Leaderboard context
export function useLeaderboard() {
  const gameContext = useOutletContext<iGameContextType>();
  return gameContext.theLeaderboard;
}
