export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  isbn: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookFormData {
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  isbn: string;
  description: string;
}