import {render, screen} from '@testing-library/react';
import SidePanelMoves from './SidePanelMoves.js';


test('renders the moves section with Moves as text', () => {
  render(<SidePanelMoves />);
  const moves = screen.getByText(/Moves/i);
  expect(moves).toBeTruthy();
});

test('renders a starting moves at 0', () => {
  render(<SidePanelMoves />);
  const moves = screen.getByText(/^0$/i);
  expect(moves).toBeTruthy();
});