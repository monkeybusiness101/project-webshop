import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { CartItem } from './CartItem'

const StyledDiv = styled.div`
@media (min-width: 700px) {
  display: flex;
  height: 120px;
  width: 700px;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}
`

const StyledUl = styled.ul`
 width: 100%;
`

export const Cart = () => {
  const products = useSelector((store) => store.webshop.items)
  const totalPrice = useSelector((store) => (
    store.webshop.items.reduce((total, item) => (total + (item.unitprice * item.quantity)), 0)
  ))
  return (
    <StyledDiv>
      <div>
        <span role="img" aria-label="cart">🛒</span>
        <div>Total: {totalPrice}:-</div>
      </div>

      <StyledUl>
        {products?.map((product, index) => (
          <CartItem key={index} product={product} />
        ))}
      </StyledUl>
    </StyledDiv>
  )
}
