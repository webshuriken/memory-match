import { render, screen, within } from '@testing-library/react';
import GameCards from './GameCards';
import { useOutletContext } from 'react-router-dom';
import { AvailableGameDecks, InitLeaderboard } from '../../globals/gameData';


// Mock the Outlet component from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: jest.fn(),
  useOutletContext: jest.fn(),
})); 

describe('Game Cards component', () => {
  let gameReady: boolean = true;
  let resetGame: boolean = false;

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
  })

  test('renders with no issues', () => {
    render(<GameCards gameReady={gameReady} resetGame={resetGame} setResetGame={jest.fn()} handleCardClick={jest.fn()} />);
    expect(screen).toBeTruthy();
  });

  test('has element with role: list', () => {
    render(<GameCards gameReady={gameReady} resetGame={resetGame} setResetGame={jest.fn()} handleCardClick={jest.fn()} />);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
  });

  test('list has 16 items', () => {
    render(<GameCards gameReady={gameReady} resetGame={resetGame} setResetGame={jest.fn()} handleCardClick={jest.fn()} />);
    const list = screen.getByRole('list');
    const items = within(list).getAllByRole('listitem');
    const deckLength = mockSettings.availableDecks[mockSettings.activeDeckIndex].size * 2;
    expect(items).toHaveLength(deckLength);
  });
  
  test('inside each item, there is and element with role: button', () => {
    render(<GameCards gameReady={gameReady} resetGame={resetGame} setResetGame={jest.fn()} handleCardClick={jest.fn()} />);
    const list = screen.getByRole('list');
    const items = within(list).getAllByRole('listitem');
    // we said each item so we use forEach
    items.forEach(item => {
      expect(within(item).getByRole('button')).toBeInTheDocument();
    })
  });

  test('each role: button has 2 images', () => {
    render(<GameCards gameReady={gameReady} resetGame={resetGame} setResetGame={jest.fn()} handleCardClick={jest.fn()} />);
    const list = screen.getByRole('list');
    const items = within(list).getAllByRole('listitem');
    const images = within(items[0]).getAllByRole('img');
    expect(images).toHaveLength(2);
  });
});