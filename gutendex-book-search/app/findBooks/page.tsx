"use client"

import React from 'react'
import BookSearch from '../bookSearch/page'
import BooksList from '../bookResults/page'
import { useState } from 'react';
import type { Book } from '../bookResults/page';


function FindBooks() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
    const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
    

  return (
    <div
        style={{
            minHeight: '100vh', // make div at least full viewport height
            backgroundImage: "url('/images/LibraryBackground.png')",
            backgroundSize: 'cover',       // maintain image size
            backgroundPosition: 'center',  // center the image
        }}
        >
        <BookSearch
        setBooks={setBooks}
        setLoading={setLoading}
        setNextPageUrl={setNextPageUrl}
        setPrevPageUrl={setPrevPageUrl}
        />
        
        {books.length > 0 && (
        <BooksList
          books={books}
          loading={loading}
          nextUrl={nextPageUrl}
          prevUrl={prevPageUrl}
        />
      )}
      
    </div>
  )
}

export default FindBooks
