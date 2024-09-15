import { within, render, screen } from '@testing-library/react';
import About from './About';
import { MemoryRouter } from 'react-router-dom';


describe('About component tests', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
      <About />
    </MemoryRouter>
    );
  });

  test('component renders', () => {
    expect(screen).toBeTruthy();
  });

  test('renders page title "About"', () => {
    const title = screen.getByRole('heading', { name: "About"});
    expect(title).toBeInTheDocument();
  });

  test('renders "play again" button', () => {
    const button = screen.getByRole('button', { name: /play again/i });
    expect(button).toBeInTheDocument();
  });

  test('renders "Team effor" h2 heading', () => {
    const title = screen.getByRole('heading', { name: /team effort/i, level: 2 });
    expect(title).toBeInTheDocument();
  });

  test('Link to team member Amys portfolio renders correctly', () => {
    const portfolioURL = "https://amythehatter.com";
    const link = screen.getByRole('link', { name: /Amy L Sutton/i });
    expect(link).toHaveAttribute("href", portfolioURL);
    expect(link).toBeInTheDocument();
  });

  test('Link to member Carlos portfolio renders correctly', () => {
    const portfolioURL = "https://carlosealford.com";
    const link = screen.getByRole('link', {name: /Carlos Alford/ });
    expect(link).toHaveAttribute("href", portfolioURL);
    expect(link).toBeInTheDocument();
  });
});

// test('renders the Exit button', () => {
//   render(<About />);
//   const button = screen.getByRole('button');
//   expect(button).toBeTruthy();
//   expect(button).toHaveTextContent('Exit');
// });