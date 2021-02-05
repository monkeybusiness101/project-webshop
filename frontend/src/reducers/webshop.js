import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: {
    cart: [],
    snippet: {snippet: '' }
  }
};

export const webshop = createSlice({
  name: 'webshop',
  initialState,
  reducers: {
    setSnippet: (state, action) => {
      const { snippet } = action.payload;
      state.items.snippet = snippet;
    },
    addItem: (state, action) => {
      const existingProduct = state.items.cart?.find((item) => item.id === action.payload.id)
      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        state.items.cart.push({ ...action.payload, quantity: 1 })
      }
    },
    removeItem: (state, action) => {
      const existingProduct = state.items.cart?.find((item) => item.id === action.payload.id)

      if (existingProduct && existingProduct.quantity === 1) {
        state.items = state.items.cart?.filter((item) => item.id !== action.payload.id)
      } else if (existingProduct) {
        existingProduct.quantity -= 1
      }
    }
  }
})

