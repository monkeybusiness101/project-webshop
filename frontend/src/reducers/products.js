import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    "producttype": "physical",
    "reference": "Hej Mats",
    "name": "Green board 2m",
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

