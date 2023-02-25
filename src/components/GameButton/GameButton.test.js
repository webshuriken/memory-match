import {render, screen} from '@testing-library/react';
import GameButton from './GameButton.js'


test('renders a button with text value Game Button', () => {
  render(<GameButton bText="Game Button" />);
  const button = screen.getByRole('button');
  expect(button).toHaveTextContent('Game Button');
});