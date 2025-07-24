import React, { useState, useMemo } from 'react';
import { Book } from '../types/book';
import { BookCard } from './BookCard';
import { SearchAndFilter } from './SearchAndFilter';
import { BookOpen, Sparkles, Heart, Crown, Gem, Star, Zap } from 'lucide-react';

interface BookListProps {
  books: Book[];
  onEditBook: (book: Book) => void;
  onDeleteBook: (id: string) => void;
}

export const BookList: React.FC<BookListProps> = ({
  books,
  onEditBook,
  onDeleteBook
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const genres = useMemo(() => {
    const uniqueGenres = Array.from(new Set(books.map(book => book.genre)));
    return uniqueGenres.sort();
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesGenre = selectedGenre === '' || book.genre === selectedGenre;
      
      return matchesSearch && matchesGenre;
    });
  }, [books, searchQuery, selectedGenre]);

  if (books.length === 0) {
    return (
      <div className="text-center py-24 relative">
        {/* Ultra Premium Background */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(99, 102, 241, 0.5) 0%, rgba(168, 85, 247, 0.5) 25%, rgba(236, 72, 153, 0.5) 50%, rgba(251, 146, 60, 0.5) 75%, rgba(34, 197, 94, 0.5) 100%),
              url('https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="relative z-10 bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-2xl rounded-3xl p-20 border border-white/30 shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 transform hover:scale-105">
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-3xl opacity-40 animate-pulse"></div>
            <div className="relative flex items-center justify-center gap-4">
              <Crown className="w-16 h-16 text-yellow-400 animate-bounce" />
              <BookOpen className="w-32 h-32 text-white relative z-10" />
              <Gem className="w-16 h-16 text-purple-400 animate-bounce delay-500" />
            </div>
          </div>
          <h3 className="text-5xl font-black text-white mb-6 flex items-center justify-center gap-4">
            <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
            Your Magical Library Awaits
            <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
          </h3>
          <p className="text-2xl text-white/95 mb-12 font-semibold leading-relaxed">
            Begin your enchanted journey by adding your first magical book to this stunning collection!
          </p>
          <div className="flex items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
              <span className="text-xl font-bold">Every great library starts with a single book</span>
              <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
            </div>
          </div>
          <div className="mt-12 flex items-center justify-center gap-6">
            <Star className="w-8 h-8 text-yellow-300 animate-spin" />
            <Zap className="w-8 h-8 text-blue-300 animate-pulse" />
            <Gem className="w-8 h-8 text-purple-300 animate-bounce" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SearchAndFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        genres={genres}
      />

      {filteredBooks.length === 0 ? (
        <div className="text-center py-24 relative">
          {/* Ultra Premium Background */}
          <div 
            className="absolute inset-0 rounded-3xl opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(135deg, rgba(251, 191, 36, 0.5) 0%, rgba(249, 115, 22, 0.5) 25%, rgba(239, 68, 68, 0.5) 50%, rgba(236, 72, 153, 0.5) 75%, rgba(168, 85, 247, 0.5) 100%),
                url('https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop')
              `,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          <div className="relative z-10 bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-2xl rounded-3xl p-20 border border-white/30 shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 transform hover:scale-105">
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 rounded-full blur-3xl opacity-40 animate-pulse"></div>
              <div className="relative flex items-center justify-center gap-4">
                <Gem className="w-16 h-16 text-amber-400 animate-bounce" />
                <BookOpen className="w-32 h-32 text-white relative z-10" />
                <Crown className="w-16 h-16 text-orange-400 animate-bounce delay-500" />
              </div>
            </div>
            <h3 className="text-5xl font-black text-white mb-6 flex items-center justify-center gap-4">
              <Star className="w-12 h-12 text-yellow-400 animate-pulse" />
              No Magical Books Found
              <Star className="w-12 h-12 text-yellow-400 animate-pulse" />
            </h3>
            <p className="text-2xl text-white/95 mb-12 font-semibold">
              Try adjusting your magical search criteria or explore different enchanted genres.
            </p>
            <div className="flex items-center justify-center gap-8 text-white/80 text-xl font-bold">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/30">
                Searched: "{searchQuery}"
              </div>
              {selectedGenre && (
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/30">
                  Genre: {selectedGenre}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Ultra Premium Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mb-16">
            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <BookCard
                  book={book}
                  onEdit={onEditBook}
                  onDelete={onDeleteBook}
                />
              </div>
            ))}
          </div>

          {/* Ultra Premium Stats Footer */}
          <div className="text-center">
            <div className="inline-block bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-2xl px-12 py-6 rounded-3xl border border-white/30 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-8 text-white">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-5 h-5 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-5 h-5 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                  <span className="font-black text-xl">
                    Showing {filteredBooks.length} of {books.length} magical books
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                  <span className="text-white/90 font-bold text-lg">Real-time sync active</span>
                  <Zap className="w-6 h-6 text-blue-400 animate-pulse" />
                </div>
                <div className="flex items-center gap-3">
                  <Crown className="w-6 h-6 text-purple-400 animate-pulse" />
                  <span className="text-white/90 font-bold text-lg">Premium experience</span>
                  <Gem className="w-6 h-6 text-pink-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};