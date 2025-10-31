'use client';

import React, { useEffect, useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext
} from "@/components/ui/pagination";
import { Book, BooksListProps } from '@/app/bookTypes';

export default function BooksList({
  books: booksFromProps,
  nextUrl: nextUrlFromProps,
  prevUrl: prevUrlFromProps
}: BooksListProps) {
  const [books, setBooks] = useState<Book[]>(booksFromProps || []);
  const [nextUrl, setNextUrl] = useState<string | null>(nextUrlFromProps || null);
  const [prevUrl, setPrevUrl] = useState<string | null>(prevUrlFromProps || null);
  const [pageUrl, setPageUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  /* Sync with new props to reset pagination */
  useEffect(() => {
    if (booksFromProps) setBooks(booksFromProps);
    setNextUrl(nextUrlFromProps || null);
    setPrevUrl(prevUrlFromProps || null);
    setCurrentPage(1);
    setPageUrl(null);
    setError(null);
  }, [booksFromProps, nextUrlFromProps, prevUrlFromProps]);

  // Fetch data when pageUrl changes
  useEffect(() => {
    if (!pageUrl) return;

    const fetchBooks = async () => {
      try {
        const res = await fetch(pageUrl);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();

        if (Array.isArray(data.results)) {
          setBooks(data.results);
          setNextUrl(data.next);
          setPrevUrl(data.previous);
          setError(null);
        } else {
          throw new Error('Invalid API response structure');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch books.');
      }
    };

    fetchBooks();
  }, [pageUrl]);

  const handleNext = () => {
    if (nextUrl) {
      setPageUrl(nextUrl);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (prevUrl) {
      setPageUrl(prevUrl);
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    }
  };

  if (error) return <p className="text-red-600 text-center p-4">Error: {error}</p>;

  return (
    <div className="p-4 sm:p-6 md:p-10">
      <ul
        className="
          grid 
          gap-6 
          sm:gap-8 
          md:gap-12 
          list-none 
          p-0 
          m-0 
          justify-items-center
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
        "
      >
        {books.map((book) => (
          <li
            key={book.id}
            className="
              text-center
              bg-white 
              p-4 
              sm:p-6 
              border 
              border-gray-300 
              rounded-lg 
              w-full 
              shadow-md
              hover:shadow-lg 
              transition-shadow
              flex 
              flex-col 
              items-center
            "
          >
            <h2 className="text-lg sm:text-xl font-bold mb-2">{book.title}</h2>

            {book.formats['image/jpeg'] && (
              <img
                src={book.formats['image/jpeg']}
                alt={`${book.title} cover`}
                className="w-32 sm:w-40 md:w-48 h-auto mb-3 rounded-md shadow-sm"
              />
            )}

            <p className="text-sm sm:text-base mb-1">
              <strong>Author:</strong>{' '}
              {book.authors.map((author) => author.name).join(', ')}
            </p>

            <p className="text-sm sm:text-base text-gray-600">
              <strong>Topics:</strong>{' '}
              {Array.isArray(book.subjects)
                ? book.subjects.join(', ')
                : book.subjects}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent className="flex gap-2 sm:gap-4">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePrevious();
                }}
                className={`
                  ${prevUrl
                    ? "bg-white hover:bg-gray-100 border border-black text-black"
                    : "bg-gray-100 border border-gray-300 text-gray-400 cursor-not-allowed"}
                  rounded px-3 sm:px-5 py-2 text-sm sm:text-base
                `}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#" isActive className="px-4 py-2 text-sm sm:text-base">
                {currentPage}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
                className={`
                  ${nextUrl
                    ? "bg-white hover:bg-gray-100 border border-black text-black"
                    : "bg-gray-100 border border-gray-300 text-gray-400 cursor-not-allowed"}
                  rounded px-3 sm:px-5 py-2 text-sm sm:text-base
                `}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
