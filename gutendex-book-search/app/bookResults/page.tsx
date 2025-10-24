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

  // This Syncs with new books passed from props to allow the form 
  //to be resubmitted and resets the pagination number to 1
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
      } catch (err: any) {
        setError(err.message || 'Failed to fetch books.');
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

  if (error) return <p className='text-red-600'>Error: {error}</p>;

  return (
    <div style={{ padding: '40px' }}>
      <ul
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', // 3 equal columns
          gap: '50px',
          listStyle: 'none',
          padding: '20px',
          margin: 0,
          justifyItems: 'center',
        }}
      >
        {books.map((book) => (
          <li
            key={book.id}
            style={{
              textAlign: 'center',
              background: '#FFFFFF',
              padding: '20px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              width: '100%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <h2
              style={{
                fontSize: '1.2rem',
                justifyContent: 'center',
                fontWeight: 'bold',
              }}
            >{book.title}
            </h2>

            {book.formats['image/jpeg'] && (
              <img
                src={book.formats['image/jpeg']}
                alt={`${book.title} cover`}
                style={{
                  width: '150px',
                  height: 'auto',
                  margin: '10px auto',
                  display: 'block' }}
              />
            )}
            <p>
              <strong>Author:</strong>{' '}
              {book.authors.map((author) => author.name).join(', ')}
            </p>
            <p>
              <strong>Topics/Subjects: </strong> {book.subjects}
            </p>
          </li>
        ))}
      </ul>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePrevious();
              }}
              className={`${prevUrl ? "bg-white hover:bg-gray-500 border border-black" : "bg-white border border-black text-black opacity-50 pointer-events-none"} rounded`}

            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
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
              className={`${nextUrl ? "bg-white hover:bg-gray-500 border border-black" : "bg-white text-black border border-black opacity-50 pointer-events-none"} rounded`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
