import {render, screen} from '@testing-library/react';
import Leaderboard from './Leaderboard';
import App from '../App/App';
import {MemoryRouter, Routes, Route} from 'react-router-dom';


const RoutesWrapper: React.FC<{children: JSX.Element}> = ({children}) => {
  return (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={children} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe('Leaderboard component tests', () => {
  test('component renders', () => {
    render(<Leaderboard />, {wrapper: RoutesWrapper});
    expect(screen).toBeTruthy();
  });

  test.each([
    ['Name'],
    ['Moves'],
    ['Time'],
    ['Score']
  ])('header: %s loaded', header => {
    render(<Leaderboard />, {wrapper: RoutesWrapper});
    expect(screen.getByText(header)).toBeInTheDocument();
  });
  
  test('renders the Exit button', () => {
    render(<Leaderboard />, {wrapper: RoutesWrapper});
    const button = screen.getByRole('button', { name: /play again/i });
    expect(button).toBeTruthy();
  });
});