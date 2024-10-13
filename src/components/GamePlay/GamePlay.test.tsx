import { screen, render, within } from "@testing-library/react";
import GamePlay from "./GamePlay";
import { useOutletContext } from "react-router-dom";
import { AvailableGameDecks, InitLeaderboard } from "../../globals/gameData";


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: jest.fn(),
  useOutletContext: jest.fn(),
}));

describe('GamePlay component', () => {
  let gameReady: boolean = true;

  // mock the Outlet component context
  const mockSettings = {
    availableDecks: [...AvailableGameDecks],
    activeDeckIndex: 0,
  }
  const mockLeaderboard = [...InitLeaderboard];


  beforeEach(() => {
    // Mocking useOutletContext to return mock settings and leaderboard
    (useOutletContext as jest.Mock).mockReturnValue({
      settings: [mockSettings, jest.fn()],
      leaderboard: [mockLeaderboard, jest.fn()],
    });
  });
  
  test('game component renders', () => {
    render(<GamePlay gameReady={gameReady} setGameReady={jest.fn} />);
    expect(screen).toBeTruthy();
  });

  test('the dashboard renders', () => {
    render(<GamePlay gameReady={gameReady} setGameReady={jest.fn()} />);

    const dashboard = screen.getByRole('complementary');
    
    expect(within(dashboard).getByRole('button', { name: /reset/i })).toBeInTheDocument();
    expect(within(dashboard).getByText('0')).toBeInTheDocument();
    expect(within(dashboard).getByText('Moves')).toBeInTheDocument();
    expect(within(dashboard).getByText('Timer')).toBeInTheDocument();
    expect(screen.getByRole('timer', { name: /game timer/i })).toBeInTheDocument();
  });

  test('the gamecard renders', () => {
    render(<GamePlay gameReady={gameReady} setGameReady={jest.fn()} />);

    const list = screen.getByRole('list');
    const listitem = within(list).getAllByRole('listitem');

    // const metaDeckLength = DeckOfCards.cards.faces.length * 2;
    expect(list).toBeInTheDocument();
    expect(listitem[0]).toBeInTheDocument();

    expect(listitem).toHaveLength(AvailableGameDecks[0].size * 2);
    expect(within(listitem[0]).getByRole('button')).toBeInTheDocument();
  });
});
