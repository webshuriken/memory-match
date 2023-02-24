import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => render(<App />));

test('renders the right brand name', () => {
  const brandName = screen.getByTestId('brandName');
  expect(brandName).toHaveTextContent('Memory Match');
});

test('render the footer text', () => {
  const footer = screen.getByTestId('footerCopyright');
  expect(footer).toHaveTextContent('2023 Memory Match - All rights reserved.');
});