import {render, screen} from '@testing-library/react';
import GameSidePanel from './GameSidePanel.js';


beforeEach(() => render(<GameSidePanel />));

// make sure component renders the timer, moves sections and the two buttons

test('renders the timer section with Timer a text', () => {
  const timer = screen.getByText(/Timer/i);
  expect(timer).toBeTruthy();
});

test('renders a starting timer 0:00', () => {
  const timer = screen.getByText(/0:00/i);
  expect(timer).toBeTruthy();
});

test('renders the moves section with Moves as text', () => {
  const moves = screen.getByText(/Moves/i);
  expect(moves).toBeTruthy();
});

test('renders a starting moves at 0', () => {
  const moves = screen.getByText(/^0$/i);
  expect(moves).toBeTruthy();
});

test('renders two game buttons', () => {
  const buttons = screen.getAllByRole('button');
  expect(buttons.length).toBe(2);
});