import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageHeader from "./PageHeader";


describe('PageHeader component', () => {
  // SEMANTICS
  describe('Semantics testing', () => {
    test('component renders', () => {
      render(<PageHeader />, { wrapper: MemoryRouter });
      expect(screen).toBeTruthy();
    });

    test('h2 and button elements render', () => {
      render(<PageHeader />, { wrapper: MemoryRouter });
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /play again/i})).toBeInTheDocument();
    });

    test('heading renders with default value', () => {
      render(<PageHeader />, { wrapper: MemoryRouter });
      const title = 'PAGE HEADER';
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    });

    // paragraph is not detected as a role. We test for the default value within it
    test('paragraph render with default value', () => {
      render(<PageHeader />, { wrapper: MemoryRouter });
      const msg = 'Your header paragraph goes here. Whatever text you want it to be';
      expect(screen.getByText(msg)).toBeInTheDocument();
    });
  });

  // DYNAMIC VALUES
  describe('Dynamic values testing', () => {
    // props values
    const title = 'Two Point Hospital';
    const msg = 'Fun game I just started playing.';

    test(`h2 header says: ${title}`, () => {
      render(<PageHeader title={title} msg={msg} />, { wrapper: MemoryRouter });
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    });

    test(`paragraph says: ${msg}`, () => {
      render(<PageHeader title={title} msg={msg} />, { wrapper: MemoryRouter });
      expect(screen.getByText(msg)).toBeInTheDocument();
    });
  });
});