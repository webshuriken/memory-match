import { act, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GameEnd from "./GameEnd";
import userEvent from "@testing-library/user-event";


describe('GameEnd component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <GameEnd />
      </MemoryRouter>
    );
  });

  describe('Initial setup', () => {
    test('component renders with no issues', () => {
      expect(screen).toBeTruthy();
    });

    test('there is a title with Congratulations', () => {
      const title = screen.getByRole('heading', { name: /congratulations/i });
      expect(title).toBeInTheDocument();
    });

    test('input renders', () => {
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    test('button, with name Continue, renders', () => {
      const button = screen.getByRole('button', { name: /continue/i });
      expect(button).toBeInTheDocument();
    });

    test('error msg for minimum length is not, initially, visible', () => {
      const errorMsg = 'minimum of 4 characters';
      expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
    });

    test('error msg for profanities not, initially, visible', () => {
      const errorMsg = 'please, no profanity';
      expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
    })

    // further checks when user attempts to submit name
    describe('Using the continue button', () => {
      let button:HTMLButtonElement;

      beforeEach(() => {
        button = screen.getByRole('button', { name: /continue/i });
      });

      test('error when user enters less than 4 characters', async () => {
        const expectedShortText = 'minimum of 4 characters';
        const shortText = 'sml';
        
        act(() => {
          userEvent.type(screen.getByRole('textbox'), shortText);
          userEvent.click(button);
        });

        expect(screen.getByText(expectedShortText)).toBeInTheDocument();
      });

      test('error when user enters profanity', async () => {
        const expectProfanityText = 'please, no profanity';
        const profanity = 'fuckshit';
        
        act(() => {
          userEvent.type(screen.getByRole('textbox'), profanity);
          userEvent.click(button);
        });

        expect(screen.getByText(expectProfanityText)).toBeInTheDocument();
      });
    });
  });
});