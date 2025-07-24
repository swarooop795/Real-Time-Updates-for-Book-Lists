import { Book, BookFormData } from '../types/book';

const API_BASE_URL = 'http://localhost:3001/api';

class BookService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async getAllBooks(): Promise<Book[]> {
    return this.request<Book[]>('/books');
  }

  async getBookById(id: string): Promise<Book> {
    return this.request<Book>(`/books/${id}`);
  }

  async createBook(bookData: BookFormData): Promise<Book> {
    return this.request<Book>('/books', {
      method: 'POST',
      body: JSON.stringify(bookData),
    });
  }

  async updateBook(id: string, bookData: BookFormData): Promise<Book> {
    return this.request<Book>(`/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookData),
    });
  }

  async deleteBook(id: string): Promise<void> {
    await this.request<{ message: string }>(`/books/${id}`, {
      method: 'DELETE',
    });
  }

  async getHealthStatus(): Promise<{ status: string; timestamp: string; connectedClients: number }> {
    return this.request<{ status: string; timestamp: string; connectedClients: number }>('/health');
  }
}

export const bookService = new BookService();