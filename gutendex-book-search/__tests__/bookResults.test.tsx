import { render, screen, fireEvent, waitFor  } from '@testing-library/react'
import BookSearch from '@/app/bookSearch/page';


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
describe('bookResults', () => {
  global.fetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockSetBooks = jest.fn();
  const mockSetNextPageUrl = jest.fn();
  const mockSetPrevPageUrl = jest.fn();
  it.skip('should display the necessary book results from a search', async () => {
    // Should display the book results from a search
    // including title, image and author
    // mock an API call to show this
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
  
    // mock output
  });
  it('should call pagination when search is clicked', async () => {
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
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  
    await waitFor(() => {
      expect(mockSetBooks).toHaveBeenCalled();
    });
    
    const mockCalls = mockSetBooks.mock.calls;
    const mockOutput = mockCalls[mockCalls.length - 1][0];
    
    console.log("Mock output:", mockOutput);
    
    expect(mockOutput).toEqual([
      { id: 1, title: "Mock Book 1" },
      { id: 2, title: "Mock Book 2" },
    ]);
  

    expect(mockSetNextPageUrl).toHaveBeenCalledWith(null);
    expect(mockSetPrevPageUrl).toHaveBeenCalledWith(null);
  
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("Mock%20Title"),
      expect.objectContaining({ method: "GET" })
    );
  });
});
  