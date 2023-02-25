import {render, screen} from '@testing-library/react';
import SidePanelTimer from './SidePanelTimer.js';


test('renders the timer section with Timer a text', () => {
  render(<SidePanelTimer />);
  const timer = screen.getByText(/Timer/i);
  expect(timer).toBeTruthy();
});

test('renders a starting timer 0:00', () => {
  render(<SidePanelTimer />)
  const timer = screen.getByText(/0:00/i);
  expect(timer).toBeTruthy();
});