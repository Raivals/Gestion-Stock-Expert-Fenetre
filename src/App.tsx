import React, { useState } from 'react';
import { Package, Settings, AlertTriangle } from 'lucide-react';
import { useStock } from './hooks/useStock';
import { StockStats } from './components/StockStats';
import { SearchBar } from './components/SearchBar';
import { StockTable } from './components/StockTable';
import { StockForm } from './components/StockForm';
import { StockItem } from './lib/sanity';

type FilterType = 'all' | 'inStock' | 'lowStock' | 'outOfStock';

function App() {
  const {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    searchItems,
    refreshItems,
  } = useStock();

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrer les articles selon le filtre actif
  const getFilteredItems = () => {
    let filtered = items;
    
    // Appliquer le filtre de statut
    switch (activeFilter) {
      case 'inStock':
        filtered = filtered.filter(item => item.quantity > item.minQuantity);
        break;
      case 'lowStock':
        filtered = filtered.filter(item => item.quantity > 0 && item.quantity <= item.minQuantity);
        break;
      case 'outOfStock':
        filtered = filtered.filter(item => item.quantity === 0);
        break;
      default:
        // 'all' - pas de filtre
        break;
    }
    
    return filtered;
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: StockItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData: Omit<StockItem, '_id' | '_type' | '_createdAt' | '_updatedAt'>) => {
    setIsSubmitting(true);
    try {
      if (editingItem) {
        await updateItem(editingItem._id, formData);
      } else {
        await addItem(formData);
      }
      setShowForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await deleteItem(id);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveFilter('all'); // Reset filter when searching
    if (query.trim()) {
      searchItems(query);
    } else {
      refreshItems();
    }
  };

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    if (searchQuery) {
      // Si une recherche est active, la réinitialiser
      setSearchQuery('');
      refreshItems();
    }
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Package className="text-blue-600" size={32} />
              <div>
                <h1 className="text-xl font-bold text-gray-900">StockManager</h1>
                <p className="text-sm text-gray-500">Système de gestion des stocks</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 transition-colors hover:text-gray-600">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-3 p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
            <AlertTriangle className="text-red-600" size={20} />
            <div>
              <p className="font-medium text-red-800">Erreur</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Statistics */}
        <StockStats 
          items={items} 
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        {/* Search and Actions */}
        <SearchBar
          onSearch={handleSearch}
          onAddNew={handleAddNew}
          placeholder="Rechercher par nom, SKU ou catégorie..."
        />

        {/* Stock Table */}
        <StockTable
          items={filteredItems}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />

        {/* Form Modal */}
        {showForm && (
          <StockForm
            item={editingItem}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingItem(null);
            }}
            isLoading={isSubmitting}
          />
        )}
      </main>
    </div>
  );
}

export default App;