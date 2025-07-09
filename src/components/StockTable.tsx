import React, { useState } from 'react';
import { Edit, Trash2, Eye, Package, FileText } from 'lucide-react';
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



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };



  if (loading) {
    return (
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="p-8 text-center">
          <Package className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-500">Chargement des articles...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="p-8 text-center">
          <Package className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="mb-2 text-gray-500">Aucun article trouvé</p>
          <p className="text-sm text-gray-400">Commencez par ajouter votre premier article</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden bg-white border rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Article
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Stock
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Quantité
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item._id} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
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
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StockBadge quantity={item.quantity} minQuantity={item.minQuantity} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">{item.quantity}</span>
                      <div className="text-xs text-gray-500">
                        <div>en stock</div>
                        <div>min: {item.minQuantity}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    {item.description ? (
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-900 truncate" title={item.description}>
                          {item.description}
                        </p>
                      </div>
                    ) : (
                      <span className="text-sm italic text-gray-400">Aucune description</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="text-blue-600 transition-colors hover:text-blue-800"
                        title="Voir les détails"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => onEdit(item)}
                        className="text-indigo-600 transition-colors hover:text-indigo-800"
                        title="Modifier"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(item._id)}
                        className="text-red-600 transition-colors hover:text-red-800"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <Package className="text-blue-600" size={24} />
                <h2 className="text-xl font-semibold">Détails de l'article</h2>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 transition-colors hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* En-tête avec nom et statut */}
              <div className="pb-4 border-b">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{selectedItem.name}</h3>
                <div className="flex items-center gap-4">
                  <StockBadge quantity={selectedItem.quantity} minQuantity={selectedItem.minQuantity} />
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {selectedItem.category}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantité en stock</label>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-bold text-gray-900">{selectedItem.quantity}</span>
                    <span className="text-sm text-gray-500">unités</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Seuil minimum</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedItem.minQuantity} unités</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Créé le</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(selectedItem._createdAt)}</p>
                </div>
                {selectedItem.supplier && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fournisseur</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedItem.supplier}</p>
                  </div>
                )}
              </div>

              {selectedItem.description && (
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={16} className="text-gray-400" />
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedItem.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};