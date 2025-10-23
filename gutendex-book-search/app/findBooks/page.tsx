"use client"

import React from 'react'
import BookSearch from '../bookSearch/page'
import BooksList from '../bookResults/page'
import { useState } from 'react';
import type { Book } from '../bookTypes';
import Link from 'next/link';


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
          <div className="p-4">
        <Link
          href="/"
          className="
            inline-block bg-white text-black border border-black rounded-md
            px-2 py-1 font-semibold text-lg
            transition-transform transition-colors duration-300
            hover:bg-gray-200 hover:scale-105
          "
        >
          Back to Homepage
        </Link>
        </div>
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
