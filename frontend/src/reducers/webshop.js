import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: {
    cart: [],
    snippet: {}
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
      const existingProduct = state.items.find((item) => item.id === action.payload.id)
      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeItem: (state, action) => {
      const existingProduct = state.items.find((item) => item.id === action.payload.id)

      if (existingProduct && existingProduct.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload.id)
      } else if (existingProduct) {
        existingProduct.quantity -= 1
      }
    }
  }
})