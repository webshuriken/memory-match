import { render, screen } from '@testing-library/react';
import About from './About';
import { MemoryRouter } from 'react-router-dom';


describe('About component tests', () => {
  test('component renders', () => {
    render(<About />, { wrapper: MemoryRouter });
    expect(screen).toBeTruthy();
  });

  test('renders page title "About"', () => {
    render(<About />, { wrapper: MemoryRouter });
    const title = screen.getByRole('heading', { name: "About"});

    expect(title).toBeInTheDocument();
  });

  test('renders "play again" button', () => {
    render(<About />, { wrapper: MemoryRouter });
    const button = screen.getByRole('button', { name: /play again/i });

    expect(button).toBeInTheDocument();
  });

  test('renders "Team effor" h2 heading', () => {
    render(<About />, { wrapper: MemoryRouter });
    const title = screen.getByRole('heading', { name: /team effort/i, level: 2 });

    expect(title).toBeInTheDocument();
  });

  test('Link to team member Amys portfolio renders correctly', () => {
    render(<About />, { wrapper: MemoryRouter });
    const portfolioURL = "https://amythehatter.com";
    const link = screen.getByRole('link', { name: /Amy L Sutton/i });

    expect(link).toHaveAttribute("href", portfolioURL);
    expect(link).toBeInTheDocument();
  });

  test('Link to member Carlos portfolio renders correctly', () => {
    render(<About />, { wrapper: MemoryRouter });
    const portfolioURL = "https://carlosealford.com";
    const link = screen.getByRole('link', {name: /Carlos E Alford/i });

    expect(link).toHaveAttribute("href", portfolioURL);
    expect(link).toBeInTheDocument();
  });
});
