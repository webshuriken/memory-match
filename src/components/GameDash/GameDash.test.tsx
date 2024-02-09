import { act, render, within, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameDash from "./GameDash";
import { MovesProvider } from "../../context/MovesContext";


describe('GameDash component', () => {
  test('component renders', () => {
    render(<GameDash />);
    expect(screen).toBeTruthy();
  });
  
  describe('The dashboard intial render', () => {
    beforeEach(() => {
      render(<GameDash />);
    });

    test('reset button renders', () => {
      expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    });
  
    test('moves component renders text and moves', () => {
      const wrapper = screen.getByText(/moves/i).closest('article');
      
      if (wrapper !== null) {
        expect(within(wrapper).getByText(/moves/i)).toBeInTheDocument();
        expect(within(wrapper).getByText(/0/)).toBeInTheDocument();
      }
    });
    
    test('timer component renders text and timer', () => {
      expect(screen.getByText(/timer/i)).toBeInTheDocument();
      expect(screen.getByRole('timer')).toBeInTheDocument();
      expect(screen.getByText('00:00')).toBeInTheDocument();
    });
  });
});
