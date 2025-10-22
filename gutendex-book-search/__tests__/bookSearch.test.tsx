// form should display title
// form should display author
// form should display topic
// form should display language
// when language is clicked, language options should be visible in the window
// should call the gutendex when submit button is clicked

import { render, screen } from '@testing-library/react'
import BookSearch from '@/app/bookSearch/page';

describe('bookSearch', () => {
    it.skip('should display the necessary headings for the form', () => {
      render(
        <BookSearch
          setBooks={jest.fn()}
          setLoading={jest.fn()}
          setNextPageUrl={jest.fn()}
          setPrevPageUrl={jest.fn()}
        />
      );
      expect(screen.getByText('Book Title')).toBeVisible();
      expect(screen.getByText('Author')).toBeVisible();
      expect(screen.getByText('Topic')).toBeVisible();
      expect(screen.getByText('Language')).toBeVisible();
    });
    // it('should call the gutendex api when the form is submitted', () => {
    //   render(
    //     <BookSearch
    //     // onSubmit={jest.fn()}
    //     />
    //   );
    // });
  });
  