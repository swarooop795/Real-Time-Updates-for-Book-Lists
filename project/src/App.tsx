import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useSocket } from './hooks/useSocket';
import { bookService } from './services/bookService';
import { Book, BookFormData } from './types/book';
import { BookList } from './components/BookList';
import { BookForm } from './components/BookForm';
import { ConnectionStatus } from './components/ConnectionStatus';
import { Plus, Library, RefreshCw, Sparkles, Users, Zap, Star, Crown, Gem } from 'lucide-react';

const SERVER_URL = 'http://localhost:3001';

function App() {
  const { socket, socketState, books, setBooks } = useSocket(SERVER_URL);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle real-time notifications
  useEffect(() => {
    if (!socket) return;

    const handleBookAdded = (book: Book) => {
      toast.success(`📚 "${book.title}" was added to the library!`, {
        duration: 4000,
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.2)',
        },
      });
    };

    const handleBookUpdated = (book: Book) => {
      toast.success(`✨ "${book.title}" was updated!`, {
        duration: 4000,
        style: {
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.2)',
        },
      });
    };

    const handleBookDeleted = (bookId: string) => {
      const deletedBook = books.find(b => b.id === bookId);
      if (deletedBook) {
        toast.success(`🗑️ "${deletedBook.title}" was removed from the library`, {
          duration: 4000,
          style: {
            background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            color: '#8B4513',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.2)',
          },
        });
      }
    };

    socket.on('book:added', handleBookAdded);
    socket.on('book:updated', handleBookUpdated);
    socket.on('book:deleted', handleBookDeleted);

    return () => {
      socket.off('book:added', handleBookAdded);
      socket.off('book:updated', handleBookUpdated);
      socket.off('book:deleted', handleBookDeleted);
    };
  }, [socket, books]);

  const handleAddBook = () => {
    setSelectedBook(undefined);
    setIsFormOpen(true);
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedBook(undefined);
  };

  const handleSubmitBook = async (bookData: BookFormData) => {
    try {
      if (selectedBook) {
        await bookService.updateBook(selectedBook.id, bookData);
      } else {
        await bookService.createBook(bookData);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast.error(errorMessage, {
        duration: 4000,
        style: {
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
          color: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.2)',
        },
      });
      throw error;
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      await bookService.deleteBook(id);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete book';
      toast.error(errorMessage, {
        duration: 4000,
        style: {
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
          color: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.2)',
        },
      });
    }
  };

  const handleRefreshBooks = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const freshBooks = await bookService.getAllBooks();
      setBooks(freshBooks);
      toast.success('📚 Book list refreshed!', {
        duration: 2000,
        style: {
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          color: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.2)',
        },
      });
    } catch (error) {
      toast.error('Failed to refresh books', {
        duration: 4000,
        style: {
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
          color: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.2)',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ultra Stunning Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 25%, rgba(236, 72, 153, 0.15) 50%, rgba(251, 146, 60, 0.15) 75%, rgba(34, 197, 94, 0.15) 100%),
            url('https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Magical Animated Overlay */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/30 via-pink-900/30 to-orange-900/30"></div>
        
        {/* Floating Magical Elements */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-32 right-16 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 right-1/3 w-64 h-64 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-3000"></div>
        
        {/* Floating Stars */}
        <div className="absolute top-20 left-1/4 animate-bounce delay-1000">
          <Star className="w-6 h-6 text-yellow-300/60 fill-current" />
        </div>
        <div className="absolute top-40 right-1/4 animate-bounce delay-2000">
          <Gem className="w-5 h-5 text-purple-300/60" />
        </div>
        <div className="absolute bottom-40 left-1/3 animate-bounce delay-3000">
          <Crown className="w-7 h-7 text-amber-300/60" />
        </div>
      </div>
      
      <Toaster position="top-right" />
      
      {/* Ultra Premium Header */}
      <header className="relative z-10 bg-gradient-to-r from-white/15 via-white/10 to-white/15 backdrop-blur-2xl shadow-2xl border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-75 animate-pulse group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 rounded-3xl shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                  <Library className="w-10 h-10 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-white via-blue-100 via-purple-100 to-pink-100 bg-clip-text text-transparent">
                  BookVerse
                </h1>
                <p className="text-lg text-white/90 font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                  Stunning Real-time Digital Library
                  <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <ConnectionStatus
                connected={socketState.connected}
                connecting={socketState.connecting}
                error={socketState.error}
              />
              
              <button
                onClick={handleRefreshBooks}
                disabled={isLoading}
                className="group p-4 text-white/80 hover:text-white hover:bg-white/20 rounded-2xl transition-all duration-300 disabled:opacity-50 backdrop-blur-sm border border-white/30 hover:border-white/50 hover:shadow-2xl transform hover:scale-110"
                title="Refresh books"
              >
                <RefreshCw className={`w-6 h-6 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
              </button>

              <button
                onClick={handleAddBook}
                className="group flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 hover:from-blue-600 hover:via-purple-600 hover:via-pink-600 hover:to-orange-600 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 backdrop-blur-sm border border-white/20 hover:border-white/40"
              >
                <Plus className="w-6 h-6 group-hover:rotate-180 transition-transform duration-300" />
                Add Magical Book
                <Sparkles className="w-5 h-5 animate-pulse" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Ultra Premium Hero Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 via-pink-600/30 to-orange-600/30 rounded-3xl blur-3xl animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-2xl rounded-3xl p-16 shadow-2xl border border-white/30 hover:border-white/50 transition-all duration-500 transform hover:scale-105">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="animate-bounce">
                  <Crown className="w-12 h-12 text-yellow-400 animate-pulse" />
                </div>
                <h2 className="text-6xl font-black bg-gradient-to-r from-white via-blue-100 via-purple-100 via-pink-100 to-orange-100 bg-clip-text text-transparent">
                  Your Magical Library
                </h2>
                <div className="animate-bounce delay-500">
                  <Gem className="w-12 h-12 text-purple-400 animate-pulse" />
                </div>
              </div>
              <p className="text-2xl text-white/95 max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
                Experience the most stunning real-time book management with instant synchronization, 
                magical animations, and seamless collaboration across all your devices.
              </p>
              <div className="flex items-center justify-center gap-16 text-white/90">
                <div className="group flex items-center gap-4 transform hover:scale-110 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl shadow-2xl group-hover:shadow-green-500/50">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <span className="font-bold text-xl">Real-time Magic</span>
                </div>
                <div className="group flex items-center gap-4 transform hover:scale-110 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl shadow-2xl group-hover:shadow-blue-500/50">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <span className="font-bold text-xl">Multi-device Sync</span>
                </div>
                <div className="group flex items-center gap-4 transform hover:scale-110 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl shadow-2xl group-hover:shadow-purple-500/50">
                    <Library className="w-7 h-7 text-white" />
                  </div>
                  <span className="font-bold text-xl">Smart Organization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <BookList
          books={books}
          onEditBook={handleEditBook}
          onDeleteBook={handleDeleteBook}
        />
      </main>

      {/* Book Form Modal */}
      <BookForm
        book={selectedBook}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitBook}
      />

      {/* Connection Error Overlay */}
      {socketState.error && !socketState.connected && (
        <div className="fixed bottom-8 left-8 right-8 md:left-auto md:w-96 bg-gradient-to-r from-red-500/95 to-pink-500/95 backdrop-blur-2xl border border-red-400/50 rounded-3xl p-8 shadow-2xl z-50 transform animate-bounce">
          <div className="flex items-center gap-6">
            <div className="w-6 h-6 bg-red-300 rounded-full animate-pulse" />
            <div>
              <p className="font-black text-white text-xl">Connection Lost</p>
              <p className="text-red-100 font-medium">
                Attempting to reconnect... Changes may not sync until connection is restored.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Ultra Premium Floating Stats */}
      <div className="fixed bottom-8 right-8 z-10">
        <div className="flex flex-col gap-6">
          <div className="group bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/30 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 transition-all duration-300">
            <div className="text-center">
              <div className="text-4xl font-black text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {books.length}
              </div>
              <div className="text-sm text-white/90 font-semibold flex items-center gap-2">
                <Crown className="w-4 h-4 text-yellow-400" />
                Total Books
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Live Indicator */}
          <div className="group bg-gradient-to-br from-green-500/20 via-emerald-500/15 to-teal-500/10 backdrop-blur-2xl rounded-3xl p-4 border border-green-400/30 shadow-2xl hover:shadow-green-500/50 transform hover:scale-110 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <span className="text-white font-bold text-sm">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Magical Particles */}
      <div className="fixed inset-0 pointer-events-none z-5">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-ping delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-300 rounded-full animate-ping delay-3000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-pink-300 rounded-full animate-ping delay-4000"></div>
      </div>
    </div>
  );
}

export default App;