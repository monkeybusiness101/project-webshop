import React from 'react'
import { useDispatch } from 'react-redux'

import { webshop } from 'reducers/webshop'
import styled from 'styled-components'

import Button from '@material-ui/core/Button'

const StyledButton = styled(Button)`
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  width: 100%;
  height: 50px;
  &:hover {
    background-color: #5469d4;
  }
`

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
        <StyledButton type="button" onClick={() => { dispatch(webshop.actions.removeItem(product)) }}>-</StyledButton>
        <StyledButton type="button" onClick={() => { dispatch(webshop.actions.addItem(product)) }}>+</StyledButton>
      </span>
    </li>
  )
}