import { screen, render, within } from "@testing-library/react";
import { useOutletContext } from "react-router-dom";
import LeaderboardTable from "./LeaderboardTable";
import { LastGameStatsType } from "../../custom-types/types";
import { AvailableGameDecks, InitLeaderboard } from "../../globals/gameData";


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: jest.fn(),
  useOutletContext: jest.fn(),
}));

describe('LeaderboardTable component', () => {
  // prep leaderboard data
  const lastGameStats: LastGameStatsType = {
    playerStats: {
      id: 'bbR4fg',
      name: 'Barbara',
      time: '02:44',
      moves: 28,
      position: 10,
    },
    inLeaderboard: true
  }

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

  test('component renders', () => {
    render(<LeaderboardTable lastGameStats={lastGameStats} />);
    expect(screen).toBeTruthy();
  });

  test('a table with correct role is present', () => {
    render(<LeaderboardTable lastGameStats={lastGameStats} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  // test for all possible headers
  test.each([
    ['Name'],
    ['Moves'],
    ['Time'],
    ['Score']
  ])('header: %s loaded', header => {
    render(<LeaderboardTable lastGameStats={lastGameStats} />);
    expect(screen.getByText(header)).toBeInTheDocument();
  });

  // test all the values for a player score
  test.each([
    { name: 'name', value: InitLeaderboard[0].name },
    { name: 'time', value: InitLeaderboard[0].time },
    { name: 'moves', value: InitLeaderboard[0].moves.toString() },
    { name: 'position', value: InitLeaderboard[0].position.toString() }
  ])('players $name has value $value', ({ value }) => {
    render(<LeaderboardTable lastGameStats={lastGameStats} />);
    const table = screen.getByRole('table');
    expect(within(table).getByText(value)).toBeInTheDocument();
  });
});
