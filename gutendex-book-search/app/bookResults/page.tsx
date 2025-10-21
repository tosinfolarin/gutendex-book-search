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


type Author = {
  name: string;
  birth_year?: number;
  death_year?: number;
};

type Book = {
  id: number;
  title: string;
  authors: Author[];
  download_count: number;
  formats: {
    'image/jpeg'?: string;
    'text/html'?: string;
  };
  subjects: string;
};

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageUrl, setPageUrl] = useState("https://gutendex.com/books");
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const res = await fetch(pageUrl);
        const data = await res.json();
  
        if (Array.isArray(data.results)) {
          setBooks(data.results);
          setNextUrl(data.next);
          setPrevUrl(data.previous);
        } else {
          throw new Error('Invalid API response structure');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch books.');
      } finally {
        setLoading(false);
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
  

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error}</p>;

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
              className={prevUrl ? "" : "opacity-50 pointer-events-none"}
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
              className={nextUrl ? "" : "opacity-50 pointer-events-none"}
            />
            </PaginationItem>
         </PaginationContent>
        </Pagination>
    </div>
  );
}
