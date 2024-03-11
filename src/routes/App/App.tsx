import { useEffect, useState } from 'react';
import { Outlet, useOutlet, useOutletContext } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import { DeckOfCards, InitLeaderboard } from '../../globals/gameData'
import { iGameSettingsType, iGameContextType, iPlayerGameStats } from '../../custom-types/types';


export default function App(): JSX.Element {
  const [theGame, setTheGame] = useState<iGameSettingsType | undefined>(undefined);

  function updatePlayerStats(stats: iPlayerGameStats) {
    setTheGame((prevState) => {
      if (prevState !== undefined) {
        return { ...prevState, game: { ...prevState.game, player: stats } };
      }
    });
  }

  useEffect(() => {
    const state:iGameSettingsType = {
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

  return (
    <div className="App">
      <header className="app-header">
        <span>Memory Match</span>
        <Nav />
      </header>
      <main>
        <Outlet context={{ theGame, gameSetters: { updatePlayerStats } }} />
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

// functions we provide to update the apps main context
export function useGameSetters() {
  const gameContext = useOutletContext<iGameContextType>();
  return gameContext.gameSetters;
}
