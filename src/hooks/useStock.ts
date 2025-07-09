import { useState, useEffect } from 'react';
import { StockItem, stockService } from '../lib/sanity';

export const useStock = () => {
  const [items, setItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await stockService.getAll();
      setItems(data);
    } catch (err) {
      setError('Erreur lors du chargement des articles');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: Omit<StockItem, '_id' | '_type' | '_createdAt' | '_updatedAt'>) => {
    try {
      console.log('🔄 Tentative d\'ajout d\'article:', item);
      const newItem = await stockService.create(item);
      console.log('✅ Article ajouté avec succès:', newItem);
      setItems(prev => [newItem, ...prev]);
      return newItem;
    } catch (err) {
      console.error('❌ Erreur complète:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue lors de l\'ajout';
      setError(`Erreur lors de l'ajout: ${errorMessage}`);
      throw err;
    }
  };

  const updateItem = async (id: string, updates: Partial<StockItem>) => {
    try {
      const updatedItem = await stockService.update(id, updates);
      setItems(prev => prev.map(item => item._id === id ? updatedItem : item));
      return updatedItem;
    } catch (err) {
      setError('Erreur lors de la mise à jour de l\'article');
      throw err;
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await stockService.delete(id);
      setItems(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      setError('Erreur lors de la suppression de l\'article');
      throw err;
    }
  };

  const searchItems = async (query: string) => {
    try {
      setLoading(true);
      const results = await stockService.search(query);
      setItems(results);
    } catch (err) {
      setError('Erreur lors de la recherche');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    searchItems,
    refreshItems: fetchItems,
  };
};