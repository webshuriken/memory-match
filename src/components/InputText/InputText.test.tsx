import { act, screen, render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputText from "./InputText";


describe('InputText component', () => {
  let theLabel: HTMLElement;

  beforeEach(() => {
    render(<InputText handlePlayerName={jest.fn} />);
    theLabel = screen.getByRole('textbox').parentElement as HTMLElement;
  });

  test('renders the input element', () => {
    expect(theLabel).toBeInTheDocument();
  });

  test('label text is correct', () => {
    const textExpected = 'enter your name';
    expect(theLabel).toHaveTextContent(textExpected);
  });

  test('render the input element', () => {
    const input: HTMLInputElement = within(theLabel).getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('placeholder has correct text', () => {
    const placeholderText = 'max 20 characters';
    expect(within(theLabel).getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });

  test('input initially renders with no text', () => {
    const expectedText = ''
    const input: HTMLInputElement = within(theLabel).getByRole('textbox');

    expect(input.value).toBe('');
  });

  test('user can only enter 20 characters', () => {
    const userInput = 'Receive it with arms wide open'
    const expectedText = 'Receive it with arms'
    const input: HTMLInputElement = within(theLabel).getByRole('textbox');

    act(() => {
      userEvent.type(input, userInput)
    });

    expect(input.value).toBe(expectedText);
    expect(input.value).toHaveLength(20);
  });

});