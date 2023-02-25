import {render, screen} from '@testing-library/react';
import GameCards from './GameCards.js';


beforeEach(() => render(<GameCards />));

test('renders a list of 16 items', () => {
  const items = screen.getAllByRole('listitem');
  expect(items.length).toBe(16);
});

test('renders images for each list item', () => {
  const images = screen.getAllByRole('img');
  expect(images.length).toBe(16);
});