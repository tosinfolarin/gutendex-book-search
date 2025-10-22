// should take you to the book search page when you click on it
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import BookSearch from '@/app/bookSearch/page';

import Homepage from "@/app/page";

describe('homepage', () => {
    it('should display the welcome message', () => {
      render(<Homepage />);  
      const greeting = screen.getByText(/Welcome to the Gutendex Book Search/i)
      expect(greeting).toBeInTheDocument();
    });
     it.skip('should take you to the page where you can search for books when you click the link', async () => {
        render(<Homepage />);  
        const greeting = screen.getByText(/Welcome to the Gutendex Book Search/i)
        expect(greeting).toBeInTheDocument();
        const link = screen.getByRole('linkToBookSearch');
        await userEvent.click(link);
        const bookSearchHeading = await screen.findByText(/Search for a book of your choice!/i);
        expect(bookSearchHeading).toBeInTheDocument();
    });
});
