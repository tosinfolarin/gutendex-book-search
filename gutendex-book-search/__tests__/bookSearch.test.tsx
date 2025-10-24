import { render, screen } from '@testing-library/react'
import BookSearch from '@/app/bookSearch/page';
import React from "react";

import { fireEvent, waitFor } from "@testing-library/react";

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
  global.fetch = jest.fn();

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
  
  it('should call the gutendex api when the form is submitted', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [
            { id: 1, title: "Mock Book 1" },
            { id: 2, title: "Mock Book 2" },
          ],
          next: null,
          previous: null,
        }),
      });

      render(
        <BookSearch
          setBooks={mockSetBooks}
          setNextPageUrl={mockSetNextPageUrl}
          setPrevPageUrl={mockSetPrevPageUrl}
        />
      );

      fireEvent.change(screen.getByPlaceholderText("Title"), {
        target: { value: "Mock Title" },
      });
  
      fireEvent.submit(screen.getByRole("button", { name: /submit/i }));
  
      await waitFor(() => {
        expect(mockSetBooks).toHaveBeenCalledWith([
          { id: 1, title: "Mock Book 1" },
          { id: 2, title: "Mock Book 2" },
        ]);
        expect(mockSetNextPageUrl).toHaveBeenCalledWith(null);
        expect(mockSetPrevPageUrl).toHaveBeenCalledWith(null);
      });
  
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("Mock%20Title"),
        expect.any(Object)
      );
    });
});