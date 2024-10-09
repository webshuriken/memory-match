import { render, screen, fireEvent } from "@testing-library/react";
import GameDash from "./GameDash";
import { TimerProvider } from "../../context/TimerContext";
import { MovesProvider } from "../../context/MovesContext";


describe('GameDash component', () => {
  test('component renders', () => {
    render(
      <TimerProvider>
        <MovesProvider>
          <GameDash setResetGame={jest.fn()} />
        </MovesProvider>
      </TimerProvider>
    );
    expect(screen).toBeTruthy();
  });
  
  test('reset button renders', () => {
    render(
      <TimerProvider>
        <MovesProvider>
          <GameDash setResetGame={jest.fn()} />
        </MovesProvider>
      </TimerProvider>
    );
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  test('moves component renders text and moves', () => {
    render(
      <TimerProvider>
        <MovesProvider>
          <GameDash setResetGame={jest.fn()} />
        </MovesProvider>
      </TimerProvider>
    );
    // const wrapper = screen.getByText(/moves/i);
    expect(screen.getByText(/moves/i)).toBeInTheDocument();
    expect(screen.getAllByRole((content, element) => {
      return element?.textContent === '0';
    })).toBeTruthy();
  });
  
  test('timer component renders text and timer', () => {
    render(
      <TimerProvider>
        <MovesProvider>
          <GameDash setResetGame={jest.fn()} />
        </MovesProvider>
      </TimerProvider>
    );
    expect(screen.getByText(/timer/i)).toBeInTheDocument();
    expect(screen.getByRole('timer')).toBeInTheDocument();
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  test('reset button calls resetDash function', () => {
    const mockSetResetGame = jest.fn();
    render(
      <TimerProvider>
        <MovesProvider>
          <GameDash setResetGame={mockSetResetGame} />
        </MovesProvider>
      </TimerProvider>
    );
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);
    expect(mockSetResetGame).toHaveBeenCalledTimes(1);
  });
});
