import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ButtonChip from './ButtonChip';


// tests the button as a button only
describe('renders the Chip Button component', () => {
  test('renders with correct value', () => {
    render(<ButtonChip value="reset" handleClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveTextContent(/reset/i);
  });

  // this catches the <a> tag being used to override the Link component.
  // using Link component within a pure button will throw error on before any tests
  test('there is no link within the button', () => {
    render(<ButtonChip value="reset" handleClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(within(button).queryByRole('link')).not.toBeInTheDocument();
  });

  test('renders <a> link within the button with correct text', () => {
    render(
      <MemoryRouter>
        <ButtonChip value="Continue" url="continue" handleClick={() => {}} />
      </MemoryRouter>
    );
    const button = screen.getByRole('button');
    expect(within(button).getByRole('link', { name: /continue/i })).toBeInTheDocument();
  });

  test('link has correct href attribute', () => {
    render(
      <MemoryRouter>
        <ButtonChip value="Continue" url="continue" handleClick={() => {}} />
      </MemoryRouter>
    );
    const button = screen.getByRole('button');
    const expectedHref = '/continue';
    const theLink = within(button).getByRole('link', { name: /continue/i });
    expect(theLink).toHaveAttribute('href', expectedHref);
  });
});