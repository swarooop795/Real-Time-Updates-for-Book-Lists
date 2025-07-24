import React from 'react';
import { Search, Filter, Sparkles, Crown, Gem, Star } from 'lucide-react';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  genres: string[];
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  genres
}) => {
  return (
    <div className="relative mb-16">
      {/* Ultra Premium Background */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(168, 85, 247, 0.4) 25%, rgba(236, 72, 153, 0.4) 50%, rgba(251, 146, 60, 0.4) 75%, rgba(34, 197, 94, 0.4) 100%),
            url('https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Ultra Premium Content */}
      <div className="relative bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/30 hover:border-white/50 transition-all duration-500 transform hover:scale-105">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
            <div className="relative p-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>
          <h3 className="text-4xl font-black text-white flex items-center gap-3">
            <Crown className="w-8 h-8 text-yellow-400 animate-pulse" />
            Discover Magical Books
            <Gem className="w-8 h-8 text-purple-400 animate-pulse" />
          </h3>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Ultra Premium Search Input */}
          <div className="relative flex-1 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/80 w-7 h-7 group-hover:text-white transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search by title, author, or magical keyword..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-16 pr-8 py-6 bg-white/25 backdrop-blur-xl border border-white/40 hover:border-white/60 focus:border-yellow-400 rounded-3xl focus:ring-4 focus:ring-yellow-400/50 transition-all duration-300 text-white placeholder-white/70 text-xl font-semibold shadow-2xl hover:shadow-white/25 focus:bg-white/35"
              />
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Ultra Premium Genre Filter */}
          <div className="relative min-w-[300px] group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
            <div className="relative">
              <Filter className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/80 w-7 h-7 group-hover:text-white transition-colors duration-300" />
              <select
                value={selectedGenre}
                onChange={(e) => onGenreChange(e.target.value)}
                className="w-full pl-16 pr-8 py-6 bg-white/25 backdrop-blur-xl border border-white/40 hover:border-white/60 focus:border-yellow-400 rounded-3xl focus:ring-4 focus:ring-yellow-400/50 transition-all duration-300 text-white appearance-none text-xl font-semibold shadow-2xl hover:shadow-white/25 focus:bg-white/35"
              >
                <option value="" className="bg-gray-900 text-white font-semibold">All Magical Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre} className="bg-gray-900 text-white font-semibold">
                    {genre}
                  </option>
                ))}
              </select>
              {/* Ultra Premium Custom Dropdown Arrow */}
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <div className="flex items-center gap-2">
                  <Gem className="w-5 h-5 text-purple-400 animate-pulse" />
                  <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ultra Premium Search Stats */}
        <div className="mt-8 flex items-center justify-between text-white/90">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <span className="text-lg font-bold">Real-time magical search</span>
            </div>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="font-semibold">Premium filtering</span>
            </div>
          </div>
          <div className="text-lg font-semibold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/30">
            {searchQuery && `Searching for "${searchQuery}"`}
            {selectedGenre && ` in ${selectedGenre}`}
            {!searchQuery && !selectedGenre && 'Ready to discover magic'}
          </div>
        </div>
      </div>
    </div>
  );
};