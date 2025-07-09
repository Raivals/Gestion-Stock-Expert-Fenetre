import React, { useState } from 'react';
import { Edit, Trash2, Eye, Package } from 'lucide-react';
import { StockItem } from '../lib/sanity';
import { StockBadge } from './StockBadge';

interface StockTableProps {
  items: StockItem[];
  onEdit: (item: StockItem) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

export const StockTable: React.FC<StockTableProps> = ({
  items,
  onEdit,
  onDelete,
  loading = false,
}) => {
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getTotalValue = (item: StockItem) => {
    return item.quantity * item.price;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-8 text-center">
          <Package className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-500">Chargement des articles...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-8 text-center">
          <Package className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-500 mb-2">Aucun article trouvé</p>
          <p className="text-sm text-gray-400">Commencez par ajouter votre premier article</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Article
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix unitaire
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valeur totale
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {item.name}
                        </div>
                        {item.supplier && (
                          <div className="text-sm text-gray-500">
                            {item.supplier}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StockBadge quantity={item.quantity} minQuantity={item.minQuantity} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatPrice(item.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatPrice(getTotalValue(item))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Voir les détails"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => onEdit(item)}
                        className="text-indigo-600 hover:text-indigo-800 transition-colors"
                        title="Modifier"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(item._id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de détail */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Détails de l'article</h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Eye size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedItem.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">SKU</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedItem.sku}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedItem.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock</label>
                  <div className="mt-1">
                    <StockBadge quantity={selectedItem.quantity} minQuantity={selectedItem.minQuantity} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prix unitaire</label>
                  <p className="mt-1 text-sm text-gray-900">{formatPrice(selectedItem.price)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Valeur totale</label>
                  <p className="mt-1 text-sm text-gray-900">{formatPrice(getTotalValue(selectedItem))}</p>
                </div>
                {selectedItem.supplier && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fournisseur</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedItem.supplier}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Créé le</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(selectedItem._createdAt)}</p>
                </div>
              </div>

              {selectedItem.description && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedItem.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};