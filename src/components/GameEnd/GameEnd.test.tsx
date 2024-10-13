import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GameEnd from "./GameEnd";
import userEvent from "@testing-library/user-event";

describe('GameEnd component', () => {
  const ERROR_SHORT_MSG = 'Your name has to be between 4 and 20 characters';
  const ERROR_PROFANITY_MSG = 'NO bad words..';

  describe('Initial setup', () => {
    test('component renders', () => {
      render(<GameEnd />, { wrapper: MemoryRouter });
      expect(screen).toBeTruthy();
    });

    test('there is a Congratulations title', () => {
      render(<GameEnd />, { wrapper: MemoryRouter });
      const title = screen.getByRole('heading', { name: /congratulations/i });
      expect(title).toBeInTheDocument();
    });

    test('input element asking to enter players name renders', () => {
      render(<GameEnd />, { wrapper: MemoryRouter });
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', 'max 20 characters');
      expect(input).toHaveAttribute('maxlength', '20');
      expect(input).toHaveAttribute('required');
    });

    test('button, with name Continue, renders', () => {
      render(<GameEnd />, { wrapper: MemoryRouter });
      const button = screen.getByRole('button', { name: /continue/i });
      expect(button).toBeInTheDocument();
    });

    test('error msg for minimum length is not, initially, visible', () => {
      render(<GameEnd />, { wrapper: MemoryRouter });
      expect(screen.queryByText(ERROR_SHORT_MSG)).not.toBeInTheDocument();
    });

    test('error msg for profanities not, initially, visible', () => {
      render(<GameEnd />, { wrapper: MemoryRouter });
      expect(screen.queryByText(ERROR_PROFANITY_MSG)).not.toBeInTheDocument();
    })
  });

  // further checks when user attempts to submit name
  describe('Using the continue button', () => {

    test('shows error msg when user enters fewer than 4 characters', () => {
      render(<GameEnd />, { wrapper: MemoryRouter });
      const shortText = 'sml';
      const button = screen.getByRole('button', { name: /continue/i });

      act(() => {
        userEvent.type(screen.getByRole('textbox'), shortText);
        userEvent.click(button);
      })
 
      expect(screen.getByText(ERROR_SHORT_MSG)).toBeInTheDocument();
    });

    test('shows error msg when user enters profanity', () => {
      render(<GameEnd />, { wrapper: MemoryRouter });
      const profanity = 'fuckshit';
      const button = screen.getByRole('button', { name: /continue/i });
      
      act(() => {
        userEvent.type(screen.getByRole('textbox'), profanity);
        userEvent.click(button);
      });

      expect(screen.getByText(ERROR_PROFANITY_MSG)).toBeInTheDocument();
    });
  });
});