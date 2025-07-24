import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// File path for persistent storage
const DATA_FILE = path.join(process.cwd(), 'books.json');

// Helper to load books from file
function loadBooks() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error loading books:', err);
  }
  return [];
}

// Helper to save books to file
function saveBooks() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving books:', err);
  }
}

// Initialize books from file or with defaults
let books = loadBooks();
if (books.length === 0) {
  books = [
    {
      id: uuidv4(),
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic Fiction",
      publishedYear: 1925,
      isbn: "978-0-7432-7356-5",
      description: "A classic American novel set in the Jazz Age.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      publishedYear: 1960,
      isbn: "978-0-06-112008-4",
      description: "A gripping tale of racial injustice and childhood innocence.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian Fiction",
      publishedYear: 1949,
      isbn: "978-0-452-28423-4",
      description: "A dystopian social science fiction novel about totalitarian control.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  saveBooks();
}

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  socket.emit('books:initial', books);

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// API Routes

// Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Get book by ID
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
});

// Add new book
app.post('/api/books', (req, res) => {
  const { title, author, genre, publishedYear, isbn, description } = req.body;

  // Validation
  if (!title || !author || !genre || !publishedYear) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newBook = {
    id: uuidv4(),
    title,
    author,
    genre,
    publishedYear: parseInt(publishedYear),
    isbn: isbn || '',
    description: description || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  books.push(newBook);
  saveBooks(); // Save after adding

  io.emit('book:added', newBook);

  res.status(201).json(newBook);
});

// Update book
app.put('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === req.params.id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const { title, author, genre, publishedYear, isbn, description } = req.body;

  if (!title || !author || !genre || !publishedYear) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const updatedBook = {
    ...books[bookIndex],
    title,
    author,
    genre,
    publishedYear: parseInt(publishedYear),
    isbn: isbn || '',
    description: description || '',
    updatedAt: new Date().toISOString()
  };

  books[bookIndex] = updatedBook;
  saveBooks(); // Save after updating

  io.emit('book:updated', updatedBook);

  res.json(updatedBook);
});

// Delete book
app.delete('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === req.params.id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const deletedBook = books[bookIndex];
  books.splice(bookIndex, 1);
  saveBooks(); // Save after deleting

  io.emit('book:deleted', deletedBook.id);

  res.json({ message: 'Book deleted successfully' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    connectedClients: io.sockets.sockets.size
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`WebSocket server ready`);
});