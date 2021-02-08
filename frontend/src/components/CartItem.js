import React from 'react'
import { useDispatch } from 'react-redux'

import { webshop } from 'reducers/webshop'


export const CartItem = ({ product }) => {
  const dispatch = useDispatch()

  return (
    <li>
      <span className="emoji" role="img" aria-label={product.name}></span>
      <div className="info">
        <span className="quantity">x{product.quantity}</span>
        <span className="sum">{product.unitprice * product.quantity}:-</span>
      </div>

      <span className="actions">
        <button type="button" onClick={() => { dispatch(webshop.actions.removeItem(product)) }}>-</button>
        <button type="button" onClick={() => { dispatch(webshop.actions.addItem(product)) }}>+</button>
      </span>
    </li>
  )
}