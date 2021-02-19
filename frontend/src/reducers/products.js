import { createSlice } from '@reduxjs/toolkit'

// Reducer for all products that are available in the webshop
const initialState = [
  {
    "producttype": "physical",
    "reference": "Banana",
    "name": "Bananas",
    "quantity": 1,
    "quantityunit": "pc",
    "unitprice": 1200,
    "taxrate": 2500,
    "discount": 0
    }
]

export const products = createSlice({
  name: 'products',
  initialState
})

