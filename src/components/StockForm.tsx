import React, { useState, useEffect } from 'react';
import { X, Save, Package } from 'lucide-react';
import { StockItem } from '../lib/sanity';

interface StockFormProps {
  item?: StockItem;
  onSubmit: (item: Omit<StockItem, '_id' | '_type' | '_createdAt' | '_updatedAt'>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const StockForm: React.FC<StockFormProps> = ({
  item,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    quantity: 0,
    minQuantity: 5,
    price: 0,
    supplier: '',
    description: '',
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        sku: item.sku,
        category: item.category,
        quantity: item.quantity,
        minQuantity: item.minQuantity,
        price: item.price,
        supplier: item.supplier || '',
        description: item.description || '',
      });
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'minQuantity' || name === 'price' 
        ? Number(value) 
        : value,
    }));
  };

  const categories = [
    'Electricité',
    'Consommables',
    'Visseries',
    'Plats',
    'Cornières',
    'Finissions',
    'Autres'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Package className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold">
              {item ? 'Modifier l\'article' : 'Nouvel article'}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 transition-colors hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Nom de l'article *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: iPhone 15 Pro"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                SKU *
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: IPH15PRO001"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Catégorie *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Quantité *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Quantité minimale *
              </label>
              <input
                type="number"
                name="minQuantity"
                value={formData.minQuantity}
                onChange={handleChange}
                min="0"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Prix unitaire (€) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Fournisseur
              </label>
              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Apple Inc."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Description détaillée de l'article..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 transition-colors hover:text-gray-800"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              {isLoading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};