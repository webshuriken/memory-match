import { render, screen, within } from '@testing-library/react';
import Moves from './Moves';
import { MovesContext } from '../../context/MovesContext';


describe('Moves component', () => {
  test('component renders within article element', () => {    
    render(<Moves />);
    const mother = screen.getByRole('article');
    expect(mother).toBeInTheDocument();
  });
  
  test('renders with a text saying Moves', () => {
    render(<Moves />);
    const mother = screen.getByRole('article');
    expect(within(mother).getByText('Moves')).toBeInTheDocument();
  });
  
  test('moves counter text starts with 0', () => {
    render(<Moves />);
    const mother = screen.getByRole('article');
    expect(within(mother).getByText('0')).toBeInTheDocument();
  });
  
  test('lets move twice and see the number 2', () => {
    const expectedText = 2;
    
    render(
      <MovesContext.Provider value={expectedText}>
        <Moves />
      </MovesContext.Provider>
    );
    
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});