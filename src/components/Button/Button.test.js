import {render, screen} from '@testing-library/react';
import Button from './Button.js';


test('renders a button with the value Test', () => {
  render(<Button bText="Test" />);
  const button = screen.getByRole('button');
  expect(button).toHaveTextContent('Test');
});