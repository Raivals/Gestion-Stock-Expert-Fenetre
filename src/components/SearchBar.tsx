import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onAddNew: () => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onAddNew,
  placeholder = 'Rechercher un article...',
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() === '') {
      onSearch('');
    }
  };

  return (
    <div className="flex flex-col gap-4 mb-6 sm:flex-row">
      <form onSubmit={handleSearch} className="relative flex-1">
        <div className="relative">
          <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </form>
      
      <div className="flex gap-2">
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Filter size={16} />
          Filtrer
        </button>
        <button
          onClick={onAddNew}
          className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <Plus size={16} />
          Nouvel article
        </button>
      </div>
    </div>
  );
};