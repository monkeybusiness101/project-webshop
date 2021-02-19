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
    width: 80%;
}
`
const ProductContainer = styled.article`
  @media (min-width: 700px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    width: 700px;
    height: 100%;
    margin-top: 20px;
    margin-bottom: 50px;
  }
`
const SmallerContainer = styled.article`
  @media (min-width: 700px) {
    width: 700px;
    height: 100px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }
`
//Component to display available products
export const Product = ({ product }) => {
  const dispatch = useDispatch()

  return (
    <ProductContainer>
      <SmallerContainer>
        <span role="img" aria-label={product.reference}>🍌</span>
        <p>{product.unitprice}:-</p>
      </SmallerContainer>
      <StyledButton
        type="button"
        disabled={product.inventory === 0}
        onClick={() => dispatch(webshop.actions.addItem(product))}>
        Add to cart
      </StyledButton>
    </ProductContainer>
  )
}
