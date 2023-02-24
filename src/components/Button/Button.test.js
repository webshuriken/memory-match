import {render, screen} from '@testing-library/react';
import Button from './Button.js';


test('renders a button with a value other than Text', () => {
  render(<Button bText="Test" />);
  const button = screen.getByRole('button');
  expect(button).toHaveTextContent('Test');
});