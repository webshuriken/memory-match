import { render, screen, fireEvent } from "@testing-library/react";
import GameDash from "./GameDash";
import { TimerProvider } from "../../context/TimerContext";
import { MovesProvider } from "../../context/MovesContext";


const TimerWrapper: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <TimerProvider>
      <MovesProvider>
        {children}
      </MovesProvider>
    </TimerProvider>
  );
}

describe('GameDash component', () => {
  test('component renders', () => {
    render(<GameDash setResetGame={jest.fn()} />, { wrapper: TimerWrapper });
    expect(screen).toBeTruthy();
  });
  
  test('reset button renders', () => {
    render(<GameDash setResetGame={jest.fn()} />, { wrapper: TimerWrapper });
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  test('moves component renders text and moves', () => {
    render(<GameDash setResetGame={jest.fn()} />, { wrapper: TimerWrapper });
    // const wrapper = screen.getByText(/moves/i);
    expect(screen.getByText(/moves/i)).toBeInTheDocument();
    expect(screen.getAllByRole((content, element) => {
      return element?.textContent === '0';
    })).toBeTruthy();
  });
  
  test('timer component renders text and timer', () => {
    render(<GameDash setResetGame={jest.fn()} />, { wrapper: TimerWrapper });
    expect(screen.getByText(/timer/i)).toBeInTheDocument();
    expect(screen.getByRole('timer')).toBeInTheDocument();
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  test('reset button calls resetDash function', () => {
    const mockSetResetGame = jest.fn();
    render(<GameDash setResetGame={mockSetResetGame} />, { wrapper: TimerWrapper });
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);
    expect(mockSetResetGame).toHaveBeenCalledTimes(1);
  });
});
