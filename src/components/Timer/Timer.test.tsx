
import {render, screen, within} from '@testing-library/react';
import Timer from './Timer';
import { TimerProvider } from '../../context/TimerContext';


describe('Timer component', () => {
  describe('fresh view of timer', () => {
    let mama: HTMLElement;

    beforeEach(() => {
      render(
        <TimerProvider>
          <Timer />
        </TimerProvider>
      );
      mama = screen.getByRole('article');
    });

    test('has text saying Timer', () => {
      expect(within(mama).getByText(/Timer/)).toBeInTheDocument();
    });
    
    test('has element with role, timer', () => {
      expect(within(mama).getByRole('timer')).toBeInTheDocument();
    });
    
    test('starting text within timer is 00:00', () => {
      const expectedText = '00:00';
      expect(within(mama).getByRole('timer').textContent).toBe(expectedText);
    });
  });
});

