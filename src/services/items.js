import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../firebase/config'

export const formatCategoryLabel = (category = '') =>
  category.charAt(0).toUpperCase() + category.slice(1)

const fallbackImage =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="%230f1b2d"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23f5f7fb" font-family="Arial, sans-serif" font-size="42">El Frikiverso</text></svg>'

const normalizeItem = (id, data) => ({
  id,
  name: data.title,
  category: data.Category,
  categoryLabel: formatCategoryLabel(data.Category),
  price: Number(data.price ?? 0),
  stock: Number(data.Stock ?? 0),
  image: data.imageURL || fallbackImage,
  description: data.description ?? '',
  longDescription: data.description ?? '',
})

export const getItems = async (categoryId) => {
  const itemsCollection = collection(db, 'items')
  const itemsQuery = categoryId
    ? query(itemsCollection, where('Category', '==', categoryId))
    : itemsCollection

  const snapshot = await getDocs(itemsQuery)

  return snapshot.docs.map((itemDoc) => normalizeItem(itemDoc.id, itemDoc.data()))
}

export const getItemById = async (itemId) => {
  const itemRef = doc(db, 'items', itemId)
  const snapshot = await getDoc(itemRef)

  if (!snapshot.exists()) {
    return null
  }

  return normalizeItem(snapshot.id, snapshot.data())
}

export const getCategories = async () => {
  const itemsCollection = collection(db, 'items')
  const snapshot = await getDocs(itemsCollection)

  const uniqueCategories = [
    ...new Set(snapshot.docs.map((itemDoc) => itemDoc.data().Category).filter(Boolean)),
  ]

  return uniqueCategories
    .sort((left, right) => left.localeCompare(right))
    .map((category) => ({
      id: category,
      label: formatCategoryLabel(category),
    }))
}
