import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Nav from "./Nav";

let component: any;

beforeEach(() => {
  component = render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  );
});

describe('renders the menu button', () => {
  test('with correct name', () => {
    const menuButton = screen.getByRole('button', {name: /menu/i});
    expect(menuButton).toBeInTheDocument();
  });
  
  test('with menu text wrapped in a label', () => {
    expect(screen.getByLabelText(/menu/i)).toBeTruthy();
  });

  test('click on menu button, semantically reveals the nav list', () => {
    act(() => {
      userEvent.click(screen.getByRole('button', {name: /menu/i}));
    });
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});

describe('The navigation list', () => {
  let appNav: HTMLElement;

  beforeEach(() => {
    act(() => {
      // dont act out because of the state
      userEvent.click(screen.getByRole('button', {name: /menu/i}));
    });

    // screen now visible
    appNav = screen.getByRole('navigation');
  });

  test('renders as a list', () => {
    expect(within(appNav).getByRole('list')).toBeInTheDocument();
  });

  test('has 4 items', () => {
    expect(within(appNav).getByRole('list').children).toHaveLength(4);
  });

  test('has root link with correct href and name', () => {
    const expectedLinkName = /play/i;
    const expectedLinkURL = "/";
    const homeLink = within(appNav).getAllByRole('link')[0];

    expect(homeLink).toHaveAttribute('href', expectedLinkURL);
    expect(homeLink).toHaveTextContent(expectedLinkName);
  });

  test('has leaderboard link with correct href and name', () => {
    const expectedLinkName = /leaderboard/i;
    const expectedLinkURL = "/leaderboard";
    const homeLink = within(appNav).getAllByRole('link')[1];

    expect(homeLink).toHaveAttribute('href', expectedLinkURL);
    expect(homeLink).toHaveTextContent(expectedLinkName);
  });

  test('has settings link with correct href and name', () => {
    const expectedLinkName = /settings/i;
    const expectedLinkURL = "/settings";
    const homeLink = within(appNav).getAllByRole('link')[2];

    expect(homeLink).toHaveAttribute('href', expectedLinkURL);
    expect(homeLink).toHaveTextContent(expectedLinkName);
  });

  test('has about link with correct href and name', () => {
    const expectedLinkName = /about/i;
    const expectedLinkURL = "/about";
    const homeLink = within(appNav).getAllByRole('link')[3];

    expect(homeLink).toHaveAttribute('href', expectedLinkURL);
    expect(homeLink).toHaveTextContent(expectedLinkName);
  });
});

