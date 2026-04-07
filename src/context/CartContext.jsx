import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addItem = (product, quantity = 1) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, item.stock),
              }
            : item,
        )
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: Math.min(quantity, product.stock),
        },
      ]
    })
  }

  const increaseItemQuantity = (itemId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, item.stock),
            }
          : item,
      ),
    )
  }

  const decreaseItemQuantity = (itemId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (itemId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const value = useMemo(() => {
    const distinctItemsCount = cartItems.length
    const totalItemsCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    )
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    )

    return {
      addItem,
      cartItems,
      clearCart,
      decreaseItemQuantity,
      distinctItemsCount,
      increaseItemQuantity,
      removeItem,
      subtotal,
      totalItemsCount,
    }
  }, [cartItems])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }

  return context
}
