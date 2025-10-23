import { render, screen } from '@testing-library/react'
import Homepage from "@/app/page";

describe('homepage', () => {
    it('should display the welcome message', () => {
      render(<Homepage />);  
      const greeting = screen.getByText(/Welcome to the Gutendex Book Search/i)
      expect(greeting).toBeInTheDocument();
    });
     it('the welcome message should be a link', async () => {
        render(<Homepage />);  
        const greeting = screen.getByText(/Welcome to the Gutendex Book Search/i)
        expect(greeting).toBeInTheDocument();
        const link = screen.getByRole('linkToBookSearch');
        expect(link).toBeInTheDocument();
        
    });
    it.skip('the welcome message link should take you to the findbooks page', async () => {
      render(<Homepage />);  
      const greeting = screen.getByText(/Welcome to the Gutendex Book Search/i)
      expect(greeting).toBeInTheDocument();
      const link = screen.getByRole('linkToBookSearch');
      expect(link).toBeInTheDocument();
      // await userEvent.click(link);
      // screen.logTestingPlaygroundURL()
      // const bookSearchHeading = await screen.findByText(/Search for a book of your choice!/i);
      // expect(bookSearchHeading).toBeInTheDocument();
    });
});
