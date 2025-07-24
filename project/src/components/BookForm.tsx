import React, { useState, useEffect } from 'react';
import { Book, BookFormData } from '../types/book';
import { X, Save, BookPlus, Sparkles, Crown, Gem, Star } from 'lucide-react';

interface BookFormProps {
  book?: Book;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bookData: BookFormData) => Promise<void>;
}

export const BookForm: React.FC<BookFormProps> = ({
  book,
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    genre: '',
    publishedYear: new Date().getFullYear(),
    isbn: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<BookFormData>>({});

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        publishedYear: book.publishedYear,
        isbn: book.isbn,
        description: book.description
      });
    } else {
      setFormData({
        title: '',
        author: '',
        genre: '',
        publishedYear: new Date().getFullYear(),
        isbn: '',
        description: ''
      });
    }
    setErrors({});
  }, [book, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<BookFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.genre.trim()) {
      newErrors.genre = 'Genre is required';
    }

    if (!formData.publishedYear || formData.publishedYear < 1 || formData.publishedYear > new Date().getFullYear() + 10) {
      newErrors.publishedYear = 'Please enter a valid year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof BookFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 z-50">
      <div className="relative w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        {/* Ultra Premium Background */}
        <div 
          className="absolute inset-0 rounded-3xl"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(99, 102, 241, 0.98) 0%, rgba(168, 85, 247, 0.98) 25%, rgba(236, 72, 153, 0.98) 50%, rgba(251, 146, 60, 0.98) 75%, rgba(34, 197, 94, 0.98) 100%),
              url('https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Magical Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/95 via-purple-600/95 via-pink-600/95 to-orange-600/95 rounded-3xl"></div>
        
        {/* Ultra Premium Content */}
        <div className="relative z-10 bg-white/15 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30">
          {/* Ultra Premium Header */}
          <div className="flex items-center justify-between p-10 border-b border-white/30">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-xl opacity-75 animate-pulse group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                  <BookPlus className="w-10 h-10 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-4xl font-black text-white flex items-center gap-3">
                  <Crown className="w-8 h-8 text-yellow-400 animate-pulse" />
                  {book ? 'Edit Magical Book' : 'Add Magical Book'}
                  <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
                </h2>
                <p className="text-xl text-white/90 font-bold flex items-center gap-2 mt-2">
                  <Gem className="w-5 h-5 text-purple-300 animate-pulse" />
                  Create or update your enchanted collection
                  <Star className="w-5 h-5 text-yellow-300 animate-pulse" />
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="group p-4 text-white/80 hover:text-white hover:bg-white/25 rounded-2xl transition-all duration-300 backdrop-blur-sm border border-white/30 hover:border-white/50 shadow-2xl hover:shadow-white/50 transform hover:scale-110"
            >
              <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Ultra Premium Form */}
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="title" className="block text-lg font-black text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
                  Book Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={`w-full px-6 py-5 bg-white/25 backdrop-blur-xl border rounded-2xl focus:ring-4 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-300 text-white placeholder-white/70 text-lg font-semibold shadow-2xl hover:shadow-white/25 ${
                    errors.title ? 'border-red-400 bg-red-500/25' : 'border-white/40 hover:border-white/60'
                  }`}
                  placeholder="Enter the magical book title"
                  disabled={isSubmitting}
                />
                {errors.title && (
                  <p className="mt-3 text-sm text-red-300 font-semibold">{errors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="author" className="block text-lg font-black text-white mb-4 flex items-center gap-2">
                  <Crown className="w-5 h-5 text-purple-400 animate-pulse" />
                  Author Name *
                </label>
                <input
                  type="text"
                  id="author"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  className={`w-full px-6 py-5 bg-white/25 backdrop-blur-xl border rounded-2xl focus:ring-4 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-300 text-white placeholder-white/70 text-lg font-semibold shadow-2xl hover:shadow-white/25 ${
                    errors.author ? 'border-red-400 bg-red-500/25' : 'border-white/40 hover:border-white/60'
                  }`}
                  placeholder="Enter the brilliant author name"
                  disabled={isSubmitting}
                />
                {errors.author && (
                  <p className="mt-3 text-sm text-red-300 font-semibold">{errors.author}</p>
                )}
              </div>

              <div>
                <label htmlFor="genre" className="block text-lg font-black text-white mb-4 flex items-center gap-2">
                  <Gem className="w-5 h-5 text-emerald-400 animate-pulse" />
                  Genre *
                </label>
                <input
                  type="text"
                  id="genre"
                  value={formData.genre}
                  onChange={(e) => handleInputChange('genre', e.target.value)}
                  className={`w-full px-6 py-5 bg-white/25 backdrop-blur-xl border rounded-2xl focus:ring-4 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-300 text-white placeholder-white/70 text-lg font-semibold shadow-2xl hover:shadow-white/25 ${
                    errors.genre ? 'border-red-400 bg-red-500/25' : 'border-white/40 hover:border-white/60'
                  }`}
                  placeholder="e.g., Fantasy, Mystery, Romance"
                  disabled={isSubmitting}
                />
                {errors.genre && (
                  <p className="mt-3 text-sm text-red-300 font-semibold">{errors.genre}</p>
                )}
              </div>

              <div>
                <label htmlFor="publishedYear" className="block text-lg font-black text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
                  Published Year *
                </label>
                <input
                  type="number"
                  id="publishedYear"
                  value={formData.publishedYear}
                  onChange={(e) => handleInputChange('publishedYear', parseInt(e.target.value) || 0)}
                  className={`w-full px-6 py-5 bg-white/25 backdrop-blur-xl border rounded-2xl focus:ring-4 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-300 text-white placeholder-white/70 text-lg font-semibold shadow-2xl hover:shadow-white/25 ${
                    errors.publishedYear ? 'border-red-400 bg-red-500/25' : 'border-white/40 hover:border-white/60'
                  }`}
                  placeholder="e.g., 2024"
                  min="1"
                  max={new Date().getFullYear() + 10}
                  disabled={isSubmitting}
                />
                {errors.publishedYear && (
                  <p className="mt-3 text-sm text-red-300 font-semibold">{errors.publishedYear}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="isbn" className="block text-lg font-black text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-orange-400 animate-pulse" />
                ISBN (Optional)
              </label>
              <input
                type="text"
                id="isbn"
                value={formData.isbn}
                onChange={(e) => handleInputChange('isbn', e.target.value)}
                className="w-full px-6 py-5 bg-white/25 backdrop-blur-xl border border-white/40 hover:border-white/60 rounded-2xl focus:ring-4 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-300 text-white placeholder-white/70 text-lg font-semibold shadow-2xl hover:shadow-white/25"
                placeholder="e.g., 978-0-123456-78-9"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-lg font-black text-white mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-pink-400 animate-pulse" />
                Description (Optional)
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={5}
                className="w-full px-6 py-5 bg-white/25 backdrop-blur-xl border border-white/40 hover:border-white/60 rounded-2xl focus:ring-4 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-300 text-white placeholder-white/70 text-lg font-semibold resize-none shadow-2xl hover:shadow-white/25"
                placeholder="Enter a magical description of the book"
                disabled={isSubmitting}
              />
            </div>

            {/* Ultra Premium Action Buttons */}
            <div className="flex gap-6 pt-8">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-8 py-5 text-white bg-white/25 hover:bg-white/35 rounded-2xl font-black text-lg transition-all duration-300 backdrop-blur-xl border border-white/40 hover:border-white/60 shadow-2xl hover:shadow-white/25 transform hover:scale-105"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-4 px-8 py-5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white rounded-2xl font-black text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-105 border border-white/20"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    Saving Magic...
                  </>
                ) : (
                  <>
                    <Save className="w-6 h-6" />
                    {book ? 'Update Magical Book' : 'Add Magical Book'}
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};