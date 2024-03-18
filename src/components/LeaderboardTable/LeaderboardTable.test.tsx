import { screen, render, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import LeaderboardTable from "./LeaderboardTable";
import Leaderboard from "../../routes/Leaderboard/Leaderboard";
import App from "../../routes/App/App";


/** TODO: WRITE THESE TESTS BEFORE GOING TO WORK!! 
 * TESSSSSST FOR:
 * - component renders
 * - semantic for tabular data load
 * - Correct table headers render
 * - Check the component renders this information of a single player
 * {
  id: 'r33r',
  name: 'Pretender',
  time: '02:44',
  moves: 28,
  position: 1,
}
 */
describe('LeaderboardTable component', () => {
  /**
   * Wrapping the component, the one we are testing, within the react router components
   * using the App component as the parent seem to be the only way I could get the 
   * <Outlet /> context to work. Other methods were giving me the error: Can not read context from null
   */
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/leaderboardTable']}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/leaderboardTable" element={<LeaderboardTable />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  });

  test('component renders with no issues', () => {
    expect(screen.getByText(/leaderboard/i)).toBeTruthy();
  });
  test('table role is present', () => {
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
  // test for all possible headers
  test.each([
    ['Name'],
    ['Moves'],
    ['Time'],
    ['Score']
  ])('header: %s loaded', header => {
    const table = screen.getByRole('table');
    expect(within(table).getByText(header)).toBeInTheDocument();
  });
  // test all the values for a player score
  test.each([
    { name: 'name', value: 'Pretender' },
    { name: 'time', value: '02:44' },
    { name: 'moves', value: '28' },
    { name: 'position', value: '1' }
  ])('players $name has value $value', ({ value }) => {
    const table = screen.getByRole('table');
    expect(within(table).getByText(value)).toBeInTheDocument();
  });
});

/**
 * name: 'Pretender',
  time: '02:44',
  moves: 28,
  position: 1,
 */