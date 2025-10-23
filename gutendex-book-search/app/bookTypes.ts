export type Author = {
  name: string;
  birth_year?: number;
  death_year?: number;
};

export type Book = {
  id: number;
  title: string;
  authors: Author[];
  download_count: number;
  formats: {
    'image/jpeg'?: string;
    'text/html'?: string;
  };
  subjects: string;
  languages: string[];
};

export type BooksListProps = {
  books?: Book[];
  loading?: boolean;
  nextUrl?: string | null;
  prevUrl?: string | null;
};