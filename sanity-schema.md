# Schéma Sanity pour StockManager

## Configuration du Studio Sanity

Créez un fichier `stockItem.js` dans votre dossier `schemas` de Sanity Studio :

```javascript
export default {
  name: 'stockItem',
  title: 'Article de Stock',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom de l\'article',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'sku',
      title: 'SKU (Code article)',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
           { title: 'Electricité', value: 'Electricité' },
          { title: 'Consommables', value: 'Consommables' },
          { title: 'Visseries', value: 'Visseries' },
          { title: 'Plats', value: 'Plats' },
          { title: 'Cornières', value: 'Cornières' },
          { title: 'Finissions', value: 'Finissions' },
          { title: 'Autres', value: 'Autres' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'quantity',
      title: 'Quantité en stock',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'minQuantity',
      title: 'Quantité minimale',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'price',
      title: 'Prix unitaire',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'supplier',
      title: 'Fournisseur',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'sku',
      media: 'image'
    }
  }
}
```

## Ajoutez le schéma à votre index.js

```javascript
import stockItem from './stockItem'

export const schemaTypes = [stockItem]
```

## Configuration du projet

1. Créez un compte sur https://www.sanity.io/
2. Créez un nouveau projet
3. Notez votre Project ID
4. Installez le CLI Sanity : `npm install -g @sanity/cli`
5. Configurez votre studio avec `sanity init`
6. Ajoutez le schéma ci-dessus
7. Déployez votre studio avec `sanity deploy`

## Variables d'environnement

Créez un fichier `.env` à la racine de votre projet :

```
VITE_SANITY_PROJECT_ID=votre-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_TOKEN=votre-token-optionnel
```

Et mettez à jour le fichier `sanity.ts` pour utiliser ces variables :

```typescript
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2024-01-01',
  token: import.meta.env.VITE_SANITY_TOKEN,
});
```