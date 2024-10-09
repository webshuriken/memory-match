import { render, screen, within } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Nav from "./Nav";


describe('Navigation component', () => {
  describe('renders the menu button', () => {
    test('with correct name', () => {
      render(<Nav />, { wrapper: MemoryRouter });
      const menuButton = screen.getByRole('button', {name: /menu/i});
      expect(menuButton).toBeInTheDocument();
    });
    
    test('with menu text wrapped in a label', () => {
      render(<Nav />, { wrapper: MemoryRouter });
      expect(screen.getByLabelText(/menu/i)).toBeTruthy();
    });
  
    test('click on menu button, semantically reveals the nav list', () => {
      render(<Nav />, { wrapper: MemoryRouter });

      act(() => {
        userEvent.click(screen.getByRole('button', {name: /menu/i}));
      });

      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });
  
  describe('The navigation list', () => {
    test('renders as a list', () => {
      render(<Nav />, { wrapper: MemoryRouter });

      act(() => {
        // dont act out because of the state
        userEvent.click(screen.getByRole('button', {name: /menu/i}));
      });
      const appNav = screen.getByRole('navigation');

      expect(within(appNav).getByRole('list')).toBeInTheDocument();
    });

    test('has 4 items', () => {
      render(<Nav />, { wrapper: MemoryRouter });

      act(() => {
        // dont act out because of the state
        userEvent.click(screen.getByRole('button', {name: /menu/i}));
      });
      const appNav = screen.getByRole('navigation');

      expect(within(appNav).getByRole('list').children).toHaveLength(4);
    });

    test('has root link with correct href and name', () => {
      const expectedLinkName = /play/i;
      const expectedLinkURL = "/";
      
      render(<Nav />, { wrapper: MemoryRouter });
      
      act(() => {
        // dont act out because of the state
        userEvent.click(screen.getByRole('button', {name: /menu/i}));
      });
      const appNav = screen.getByRole('navigation');
      const homeLink = within(appNav).getAllByRole('link')[0];

      expect(homeLink).toHaveAttribute('href', expectedLinkURL);
      expect(homeLink).toHaveTextContent(expectedLinkName);
    });
    
    test('has leaderboard link with correct href and name', () => {
      const expectedLinkName = /leaderboard/i;
      const expectedLinkURL = "/leaderboard";
      
      render(<Nav />, { wrapper: MemoryRouter });
      
      act(() => {
        // dont act out because of the state
        userEvent.click(screen.getByRole('button', {name: /menu/i}));
      });
      const appNav = screen.getByRole('navigation');
      const homeLink = within(appNav).getAllByRole('link')[1];
      
      expect(homeLink).toHaveAttribute('href', expectedLinkURL);
      expect(homeLink).toHaveTextContent(expectedLinkName);
    });

    test('has settings link with correct href and name', () => {
      const expectedLinkName = /settings/i;
      const expectedLinkURL = "/settings";
      
      render(<Nav />, { wrapper: MemoryRouter });
      
      act(() => {
        // dont act out because of the state
        userEvent.click(screen.getByRole('button', {name: /menu/i}));
      });
      const appNav = screen.getByRole('navigation');
      const homeLink = within(appNav).getAllByRole('link')[2];
    
      expect(homeLink).toHaveAttribute('href', expectedLinkURL);
      expect(homeLink).toHaveTextContent(expectedLinkName);
    });

    test('has about link with correct href and name', () => {
      const expectedLinkName = /about/i;
      const expectedLinkURL = "/about";
      
      render(<Nav />, { wrapper: MemoryRouter });
      
      act(() => {
        // dont act out because of the state
        userEvent.click(screen.getByRole('button', {name: /menu/i}));
      });
      const appNav = screen.getByRole('navigation');
      const homeLink = within(appNav).getAllByRole('link')[3];

      expect(homeLink).toHaveAttribute('href', expectedLinkURL);
      expect(homeLink).toHaveTextContent(expectedLinkName);
    });
  });
});

