import { render, screen } from '@testing-library/react';
import BooksList, { Book } from '@/app/bookResults/page';
import BookSearch from '@/app/bookSearch/page';

const mockBooks: Book[] = [
    {
      id: 1,
      title: "The Great Gatsby",
      authors: [{ name: "F. Scott Fitzgerald" }],
      download_count: 123,
      formats: {
        'image/jpeg': "https://gutendex.com/gatsby.jpg",
        'text/html': "https://gutendex.com/gatsby.html"
      },
      subjects: "Classic, Fiction",
      languages: ["en"]
    },
    {
      id: 2,
      title: "1984",
      authors: [{ name: "George Orwell" }],
      download_count: 456,
      formats: {},
      subjects: "Dystopian, Political Fiction",
      languages: ["en"]
    }
  ];

  
describe('findBooks', () => {
    it('should display the BooksList component', () => {
        render(<BooksList books={mockBooks} />);
    
        expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
        expect(screen.getByText("1984")).toBeInTheDocument();
     
        expect(screen.getByText(/F. Scott Fitzgerald/)).toBeInTheDocument();
        expect(screen.getByText(/George Orwell/)).toBeInTheDocument();

        expect(screen.getByText(/Classic, Fiction/)).toBeInTheDocument();
        expect(screen.getByText(/Dystopian, Political Fiction/)).toBeInTheDocument();

        const image = screen.getByAltText("The Great Gatsby cover");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', "https://gutendex.com/gatsby.jpg");

        expect(screen.queryByAltText("1984 cover")).toBeNull();
  });
    it.skip("should display the bookSearch component", () => {
        // mock book search component
    });
});


