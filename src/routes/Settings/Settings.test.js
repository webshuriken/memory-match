import {render, screen} from '@testing-library/react';
import Settings from './Settings.js';

// TODO: once designed, need to test that settings are displayed properly

test('renders the Save button', () => {
  render(<Settings />);
  const button = screen.getAllByRole('button');
  expect(button[0]).toBeTruthy();
  expect(button[0]).toHaveTextContent('Save');
});

test('renders the Exit button', () => {
  render(<Settings />);
  const button = screen.getAllByRole('button');
  expect(button[1]).toBeTruthy();
  expect(button[1]).toHaveTextContent('Exit');
});