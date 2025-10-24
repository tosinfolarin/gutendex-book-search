import { render, screen } from '@testing-library/react'
import BookSearch from '@/app/bookSearch/page';
import React from "react";

jest.mock("@/components/ui/input", () => ({
  Input: (props: any) => <input {...props} data-testid="mock-input" />,
}));

jest.mock("@/components/ui/button", () => ({
  Button: (props: any) => <button {...props} data-testid="mock-button" />,
}));

jest.mock("@/components/ui/checkbox", () => ({
  Checkbox: (props: any) => <input type="checkbox" {...props} data-testid="mock-checkbox" />,
}));

jest.mock("@/components/ui/label", () => ({
  Label: (props: any) => <label {...props} data-testid="mock-label" />,
}));

describe('bookSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockSetBooks = jest.fn();
  const mockSetNextPageUrl = jest.fn();
  const mockSetPrevPageUrl = jest.fn();
  it('should display the necessary headings for the form', () => {
    render(
      <BookSearch
        setBooks={mockSetBooks}
        setNextPageUrl={mockSetNextPageUrl}
        setPrevPageUrl={mockSetPrevPageUrl}
      />
    );
    expect(
      screen.getByText("Search for a book of your choice!")
    ).toBeInTheDocument();

    expect(screen.getByText("Book Title:")).toBeInTheDocument();
    expect(screen.getByText("Author:")).toBeInTheDocument();
    expect(screen.getByText("Topic:")).toBeInTheDocument();
    expect(screen.getByText("Language:")).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it.skip('should call the gutendex api when the form is submitted', () => {
    // should call the gutendex when submit button is clicked
    // display form 
    // mock submit
    // mock api call
  });
});
