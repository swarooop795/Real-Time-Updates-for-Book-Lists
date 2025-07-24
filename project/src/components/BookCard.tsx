import React from 'react';
import { Book } from '../types/book';
import { Edit, Trash2, BookOpen, Calendar, User, Star, Heart, Crown, Gem, Sparkles } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(book);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      onDelete(book.id);
    }
  };

  // Generate unique gradient for each book based on title
  const gradients = [
    'from-blue-600 via-purple-600 to-pink-600',
    'from-emerald-500 via-teal-500 to-cyan-500',
    'from-orange-500 via-red-500 to-pink-500',
    'from-purple-500 via-indigo-500 to-blue-500',
    'from-green-500 via-emerald-500 to-teal-500',
    'from-yellow-500 via-orange-500 to-red-500',
    'from-pink-500 via-rose-500 to-red-500',
    'from-indigo-500 via-purple-500 to-pink-500',
  ];
  
  const gradientIndex = book.title.length % gradients.length;
  const cardGradient = gradients[gradientIndex];

  return (
    <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-700 transform hover:scale-105 hover:-translate-y-4">
      {/* Ultra Premium Book Cover Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(99, 102, 241, 0.95) 0%, rgba(168, 85, 247, 0.95) 25%, rgba(236, 72, 153, 0.95) 50%, rgba(251, 146, 60, 0.95) 75%, rgba(34, 197, 94, 0.95) 100%),
            url('https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Magical Animated Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${cardGradient} opacity-95 group-hover:opacity-100 transition-opacity duration-700`}></div>
      
      {/* Premium Floating Action Buttons */}
      <div className="absolute top-6 right-6 z-20">
        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <button
            onClick={handleEdit}
            className="group/btn p-3 bg-white/25 backdrop-blur-xl hover:bg-white/35 text-white rounded-2xl transition-all duration-300 hover:scale-125 border border-white/40 hover:border-white/60 shadow-2xl hover:shadow-blue-500/50"
            title="Edit book"
          >
            <Edit className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
          </button>
          <button
            onClick={handleDelete}
            className="group/btn p-3 bg-red-500/25 backdrop-blur-xl hover:bg-red-500/35 text-white rounded-2xl transition-all duration-300 hover:scale-125 border border-red-400/40 hover:border-red-400/60 shadow-2xl hover:shadow-red-500/50"
            title="Delete book"
          >
            <Trash2 className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Premium Content */}
      <div className="relative z-10 p-8 h-full flex flex-col">
        {/* Ultra Premium Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/25 backdrop-blur-xl rounded-2xl border border-white/40 shadow-2xl group-hover:shadow-white/50 transform group-hover:scale-110 transition-all duration-300">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <Crown className="w-6 h-6 text-yellow-300 animate-pulse" />
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-yellow-300/50'} animate-pulse`} 
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </div>

        {/* Premium Title */}
        <h3 className="text-3xl font-black text-white mb-4 line-clamp-2 group-hover:text-yellow-100 transition-colors duration-500 leading-tight">
          {book.title}
        </h3>

        {/* Premium Author */}
        <div className="flex items-center gap-3 text-white/95 mb-4 group-hover:text-white transition-colors duration-300">
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
            <User className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg">{book.author}</span>
        </div>

        {/* Premium Year */}
        <div className="flex items-center gap-3 text-white/90 mb-6 group-hover:text-white transition-colors duration-300">
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="font-semibold text-lg">{book.publishedYear}</span>
        </div>

        {/* Ultra Premium Genre Badge */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 text-sm font-black bg-white/25 backdrop-blur-xl text-white rounded-2xl border border-white/40 shadow-2xl hover:shadow-white/50 transform group-hover:scale-105 transition-all duration-300">
            <Gem className="w-4 h-4 text-purple-300 animate-pulse" />
            {book.genre}
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
          </div>
        </div>

        {/* Premium Description */}
        {book.description && (
          <p className="text-white/95 text-base line-clamp-3 mb-6 flex-grow font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
            {book.description}
          </p>
        )}

        {/* Ultra Premium Footer */}
        <div className="mt-auto pt-6 border-t border-white/30">
          <div className="flex items-center justify-between">
            {book.isbn && (
              <div className="text-sm text-white/80 font-medium bg-white/15 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/25">
                ISBN: {book.isbn}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-300 animate-pulse" />
              <span className="text-sm text-white/80 font-medium">
                {new Date(book.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ultra Premium Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
      </div>

      {/* Magical Sparkles */}
      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
      </div>
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
        <Gem className="w-5 h-5 text-purple-300 animate-pulse" />
      </div>
    </div>
  );
};