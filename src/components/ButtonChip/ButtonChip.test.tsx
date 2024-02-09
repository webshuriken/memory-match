import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ButtonChip from './ButtonChip';


// tests the button as a button only
describe('renders a button', () => {
  let button: HTMLButtonElement;

  beforeEach(() => {
    render(<ButtonChip value="Reset" handleClick={() => {}} />);
    button = screen.getByRole('button');
  });

  test('the button exists', () => {
    expect(button).toBeInTheDocument();
  });

  test('renders with correct value', () => {
    expect(button).toHaveTextContent(/reset/i);
  });

  // this catches the <a> tag being used to override the Link component.
  // using Link component within a pure button will throw error on before any tests
  test('there is no link within the button', () => {
    expect(within(button).queryByRole('link')).not.toBeInTheDocument();
  });
});

// tests the button with embeded link
describe('renders a button with anchor link', () => {
  let button: HTMLButtonElement;

  beforeEach(() => {
    render(
      <MemoryRouter>
        <ButtonChip value="Continue" url="continue" handleClick={() => {}} />
      </MemoryRouter>
    );
    button = screen.getByRole('button');
  });

  test('renders a button', () => {
    expect(button).toBeInTheDocument();
  });

  test('renders a link within the button', () => {
    expect(within(button).getByRole('link')).toBeInTheDocument();
  });

  test('link has correct text value', () => {
    const expectedText = 'Continue';
    const theLink = within(button).getByRole('link');

    expect(theLink).toHaveTextContent(expectedText);
  });

  test('link has correct href attribute', () => {
    const expectedHref = '/continue';
    const theLink = within(button).getByRole('link');

    expect(theLink).toHaveAttribute('href', expectedHref);
  });
});