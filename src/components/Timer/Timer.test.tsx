import {render, screen, within} from '@testing-library/react';
import Timer from './Timer'


describe('tests Timer component basics', () => {
  beforeEach(() => {
    render(<Timer>00:00</Timer>);
  });

  test('has text saying Timer', () => {
    expect(screen.getByText(/Timer/)).toBeInTheDocument();
  });
  
  test('has element with role, timer', () => {
    expect(screen.getByRole('timer')).toBeInTheDocument();
  });
  
  test('starting text within timer is 00:00', () => {
    const expectedText = '00:00';
    expect(screen.getByRole('timer').textContent).toBe(expectedText);
  });
});

