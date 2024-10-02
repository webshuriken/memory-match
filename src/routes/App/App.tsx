import { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import { DefaultDeck, InitLeaderboard } from '../../globals/gameData'
import { iGameSettingsType, iGameContextType, LeaderboardType } from '../../custom-types/types';
import './App.css';

export default function App(): JSX.Element {
  const [theGame, setTheGame] = useState<iGameSettingsType>({ gameDeck: DefaultDeck });
  const [theLeaderboard, setTheLeaderboard] = useState<LeaderboardType[]>(InitLeaderboard);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Memory Match</h1>
        <Nav />
      </header>
      <main>
        <Outlet context={{ theGame, leaderboard: [theLeaderboard, setTheLeaderboard] }} />
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
  return gameContext.leaderboard;
}
