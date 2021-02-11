import React from 'react'
import { useDispatch } from 'react-redux'
import { webshop } from 'reducers/webshop'

import Button from '@material-ui/core/Button'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  width: 100%;
  height: 50px;
  &:hover {
    background-color: #5469d4;
  }
  @media (min-width: 700px) {
    justify-content: center;
    flex-direction: horizontal;
}
`

const ProductContainer = styled.article`

  @media (min-width: 700px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 700px;
    height: 100%;
  }
`

export const Product = ({ product }) => {
  const dispatch = useDispatch()

  return (
    <ProductContainer>
      <span role="img" aria-label={product.reference}>🍌</span>
      <p>{product.unitprice}:-</p>

      <StyledButton
        type="button"
        disabled={product.inventory === 0}
        onClick={() => dispatch(webshop.actions.addItem(product))}>
        Add to cart
      </StyledButton>
    </ProductContainer>
  )
}
