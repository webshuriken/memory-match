import { act, screen, render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputText from "./InputText";


describe('renders the InputText component', () => {

  let theLabel: HTMLElement;

  beforeEach(() => {
    render(<InputText />);
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

  test('the input element has a start value of empty string', () => {
    expect(within(theLabel).getByRole('textbox')).toHaveTextContent('');
  });

  test('the input placeholder has correct text', () => {
    const placeholderText = 'enter your name';
    expect(within(theLabel).getByPlaceholderText(placeholderText));
  });

  test('the input value updates when user types in', () => {
    const input: HTMLInputElement = within(theLabel).getByRole('textbox');
    const userText = 'Elliott Dorian'

    act(() => {
      userEvent.type(input, userText);
    });

    expect(input.value).toMatch(userText);
  });

});