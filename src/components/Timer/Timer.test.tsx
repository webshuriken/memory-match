import { render, screen, within } from '@testing-library/react';
import Timer from './Timer';
import { TimerProvider } from '../../context/TimerContext';


describe('Timer component', () => {
  test('has text saying Timer', () => {
    render(<Timer />, { wrapper: TimerProvider });
    const mama = screen.getByRole('article');

    expect(within(mama).getByText(/Timer/)).toBeInTheDocument();
  });
  
  test('has element with role, timer', () => {
    render(<Timer />, { wrapper: TimerProvider });
    const mama = screen.getByRole('article');

    expect(within(mama).getByRole('timer')).toBeInTheDocument();
  });
  
  test('starting text within timer is 00:00', () => {
    render(<Timer />, { wrapper: TimerProvider });
    const mama = screen.getByRole('article');
    const expectedText = '00:00';

    expect(within(mama).getByRole('timer').textContent).toBe(expectedText);
  });
});

