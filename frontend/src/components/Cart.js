import React from 'react'
import { useSelector } from 'react-redux'
import { CartItem } from './CartItem'

export const Cart = () => {
  // TODO - fetch products from the cart store
  const products = useSelector((store) => store.webshop.items)
  const totalPrice = useSelector((store) => (
    store.webshop.items.reduce((total, item) => (total + (item.unitprice * item.quantity)), 0)
  ))
  return (
    <div className="cart">
      <div className="total">
        <span className="emoji" role="img" aria-label="cart">🛒</span>
        <div className="amount">Total: {totalPrice}:-</div>
      </div>
      
      <ul className="items">
        {products?.map((product, index) => (
          <CartItem key={index} product={product} />
        ))}
      </ul>
    </div>
  )
}
