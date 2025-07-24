import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Book } from '../types/book';

interface SocketState {
  connected: boolean;
  connecting: boolean;
  error: string | null;
}

export const useSocket = (serverUrl: string) => {
  const socketRef = useRef<Socket | null>(null);
  const [socketState, setSocketState] = useState<SocketState>({
    connected: false,
    connecting: true,
    error: null
  });

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(serverUrl, {
      transports: ['websocket', 'polling'],
      upgrade: true,
      rememberUpgrade: true,
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      timeout: 10000
    });

    const socket = socketRef.current;

    // Connection event handlers
    socket.on('connect', () => {
      console.log('Connected to server');
      setSocketState({
        connected: true,
        connecting: false,
        error: null
      });
    });

    socket.on('disconnect', (reason) => {
      console.log('Disconnected from server:', reason);
      setSocketState(prev => ({
        ...prev,
        connected: false
      }));
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setSocketState({
        connected: false,
        connecting: false,
        error: error.message
      });
    });

    socket.on('reconnect', (attemptNumber) => {
      console.log('Reconnected after', attemptNumber, 'attempts');
      setSocketState({
        connected: true,
        connecting: false,
        error: null
      });
    });

    socket.on('reconnect_failed', () => {
      console.error('Failed to reconnect');
      setSocketState({
        connected: false,
        connecting: false,
        error: 'Failed to reconnect to server'
      });
    });

    // Book event handlers
    socket.on('books:initial', (initialBooks: Book[]) => {
      console.log('Received initial books:', initialBooks.length);
      setBooks(initialBooks);
    });

    socket.on('book:added', (newBook: Book) => {
      console.log('New book added:', newBook.title);
      setBooks(prev => [...prev, newBook]);
    });

    socket.on('book:updated', (updatedBook: Book) => {
      console.log('Book updated:', updatedBook.title);
      setBooks(prev => 
        prev.map(book => 
          book.id === updatedBook.id ? updatedBook : book
        )
      );
    });

    socket.on('book:deleted', (deletedBookId: string) => {
      console.log('Book deleted:', deletedBookId);
      setBooks(prev => 
        prev.filter(book => book.id !== deletedBookId)
      );
    });

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [serverUrl]);

  return {
    socket: socketRef.current,
    socketState,
    books,
    setBooks
  };
};