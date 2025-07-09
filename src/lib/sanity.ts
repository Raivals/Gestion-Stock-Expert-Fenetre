import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Configuration Sanity
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: false, // Désactiver le CDN pour les opérations d'écriture
  apiVersion: '2024-01-01',
  token: import.meta.env.VITE_SANITY_TOKEN, // Token REQUIS pour les écritures
});

// Vérifier la configuration
if (!import.meta.env.VITE_SANITY_PROJECT_ID) {
  console.error('❌ VITE_SANITY_PROJECT_ID manquant dans .env');
}
if (!import.meta.env.VITE_SANITY_TOKEN) {
  console.warn('⚠️ VITE_SANITY_TOKEN manquant - les opérations d\'écriture ne fonctionneront pas');
}

// Builder pour les images
const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);

// Schéma pour les articles
export interface StockItem {
  _id: string;
  _type: 'stockItem';
  name: string;
  category: string;
  quantity: number;
  minQuantity: number;
  supplier?: string;
  description?: string;
  _createdAt: string;
  _updatedAt: string;
}

// Fonctions pour interagir avec Sanity
export const stockService = {
  // Récupérer tous les articles
  async getAll(): Promise<StockItem[]> {
    const query = `*[_type == "stockItem"] | order(_createdAt desc)`;
    return await client.fetch(query);
  },

  // Récupérer un article par ID
  async getById(id: string): Promise<StockItem> {
    const query = `*[_type == "stockItem" && _id == $id][0]`;
    return await client.fetch(query, { id });
  },

  // Créer un article
  async create(item: Omit<StockItem, '_id' | '_type' | '_createdAt' | '_updatedAt'>): Promise<StockItem> {
    if (!import.meta.env.VITE_SANITY_TOKEN) {
      throw new Error('Token Sanity requis pour créer des articles. Ajoutez VITE_SANITY_TOKEN dans votre fichier .env');
    }
    
    const doc = {
      _type: 'stockItem',
      ...item,
    };
    
    try {
      const result = await client.create(doc);
      console.log('✅ Article créé avec succès:', result);
      return result;
    } catch (error) {
      console.error('❌ Erreur lors de la création:', error);
      throw new Error(`Impossible de créer l'article: ${error.message}`);
    }
  },

  // Mettre à jour un article
  async update(id: string, updates: Partial<StockItem>): Promise<StockItem> {
    if (!import.meta.env.VITE_SANITY_TOKEN) {
      throw new Error('Token Sanity requis pour modifier des articles');
    }
    
    try {
      const result = await client.patch(id).set(updates).commit();
      console.log('✅ Article mis à jour avec succès:', result);
      return result;
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour:', error);
      throw new Error(`Impossible de mettre à jour l'article: ${error.message}`);
    }
  },

  // Supprimer un article
  async delete(id: string): Promise<void> {
    if (!import.meta.env.VITE_SANITY_TOKEN) {
      throw new Error('Token Sanity requis pour supprimer des articles');
    }
    
    try {
      await client.delete(id);
      console.log('✅ Article supprimé avec succès');
    } catch (error) {
      console.error('❌ Erreur lors de la suppression:', error);
      throw new Error(`Impossible de supprimer l'article: ${error.message}`);
    }
  },

  // Rechercher des articles
  async search(query: string): Promise<StockItem[]> {
    const searchQuery = `*[_type == "stockItem" && (name match $query || sku match $query || category match $query)] | order(_createdAt desc)`;
    return await client.fetch(searchQuery, { query: `*${query}*` });
  },
};