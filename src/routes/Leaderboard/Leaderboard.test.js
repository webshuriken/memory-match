import {render, screen} from '@testing-library/react';
import Leaderboard from './Leaderboard.js';


test('renders the table with correct headings Name, Moves, Time', () => {
  render(<Leaderboard />);
  const table = screen.getAllByRole('cell');
  expect(table[0]).toHaveTextContent('Name');
  expect(table[1]).toHaveTextContent('Moves');
  expect(table[2]).toHaveTextContent('Time');
});

test('renders the Exit button', () => {
  render(<Leaderboard />)
  const button = screen.getByRole('button');
  expect(button).toBeTruthy();
  expect(button).toHaveTextContent('Exit');
});