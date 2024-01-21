import {render, screen} from '@testing-library/react';
import About from './About.js';


test('renders about text content', () => {
  render(<About />);
  const content = screen.getByTestId('aboutContent');
  expect(content).toBeTruthy();
});

test('renders the Exit button', () => {
  render(<About />);
  const button = screen.getByRole('button');
  expect(button).toBeTruthy();
  expect(button).toHaveTextContent('Exit');
});