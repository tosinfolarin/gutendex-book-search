'use client'; // If you're using Next.js App Router

import React, { useEffect, useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
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

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('https://gutendex.com/books');
        const data = await res.json();

        // Check and set results
        if (Array.isArray(data.results)) {
          setBooks(data.results);
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
  }, []);

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
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
         </PaginationContent>
        </Pagination>
    </div>
  );
}
