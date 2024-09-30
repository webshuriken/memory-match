import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageHeader from "./PageHeader";


describe('PageHeader component', () => {
  // SEMANTICS
  describe('Semantics testing', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <PageHeader />
        </MemoryRouter>
      );
    });
    test('component renders', () => {
      expect(screen).toBeTruthy();
    });
    test('h2 and button elements render', () => {
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /play again/i})).toBeInTheDocument();
    });
    test('heading renders with default value', () => {
      const title = 'PAGE HEADER';
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    });
    // paragraph is not detected as a role. We test for the default value within it
    test('paragraph render with default value', () => {
      const msg = 'Your header paragraph goes here. Whatever text you want it to be';
      expect(screen.getByText(msg)).toBeInTheDocument();
    });
  });
  // DYNAMIC VALUES
  describe('Dynamic values testing', () => {
    // props values
    const title = 'Two Point Hospital';
    const msg = 'Fun game I just started playing.';

    beforeEach(() => {
      render(
        <MemoryRouter>
          <PageHeader title={title} msg={msg} />
        </MemoryRouter>
      )
    });

    test(`h2 header says: ${title}`, () => {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    });
    test(`paragraph says: ${msg}`, () => {
      expect(screen.getByText(msg)).toBeInTheDocument();
    });
  });
});