import { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import { AvailableGameDecks, InitLeaderboard } from '../../globals/gameData'
import { iGameSettingsType, iGameContextType, LeaderboardType } from '../../custom-types/types';
import './App.css';

export default function App(): JSX.Element {
  const [settings, setSettings] = useState<iGameSettingsType>({ availableDecks: AvailableGameDecks, activeDeckIndex: 0 });
  const [theLeaderboard, setTheLeaderboard] = useState<LeaderboardType[]>(InitLeaderboard);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Memory Match</h1>
        <Nav />
      </header>
      <main>
        <Outlet context={{ settings: [settings, setSettings], leaderboard: [theLeaderboard, setTheLeaderboard] }} />
      </main>
    </div>
  );
}

// Game settings context
export function useSettings() {
  const gameContext = useOutletContext<iGameContextType>();
  return gameContext.settings;
}

// Leaderboard context
export function useLeaderboard() {
  const gameContext = useOutletContext<iGameContextType>();
  return gameContext.leaderboard;
}
