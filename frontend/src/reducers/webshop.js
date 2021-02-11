import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: []
}

export const webshop = createSlice({
  name: 'webshop',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingProduct = state.items.find((item) => item.reference === action.payload.reference)
      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeItem: (state, action) => {
      const existingProduct = state.items.find((item) => item.reference === action.payload.reference)

      if (existingProduct && existingProduct.quantity === 1) {
        state.items = state.items.filter((item) => item.reference !== action.payload.reference)
      } else if (existingProduct) {
        existingProduct.quantity -= 1
      }
    }
  }
})

