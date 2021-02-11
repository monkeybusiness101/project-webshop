import React from 'react'
import { useDispatch } from 'react-redux'

import { webshop } from 'reducers/webshop'
import styled from 'styled-components'

import Button from '@material-ui/core/Button'

const StyledButton = styled(Button)`
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  width: 80%;
  height: 50px;
  &:hover {
    background-color: #5469d4;
  }
`
const StyledDiv = styled.div`
  display: flex;
  flex-direction: horizontal;
  margin-bottom: 5px;
`

const StyledQuantitySpan = styled.span`
  height: 20px;
  margin-right: 10px;
`

const StyledSumSpan = styled.span`
  height: 20px;
`

export const CartItem = ({ product }) => {
  const dispatch = useDispatch()

  return (
    <li>
      <StyledDiv>
        <StyledQuantitySpan>
        <span role="img" aria-label={product.name}>🍌</span>
        <span>x{product.quantity}</span>
        </StyledQuantitySpan>
        <StyledSumSpan>{product.unitprice * product.quantity}:-</StyledSumSpan>
      </StyledDiv>

      <span>
        <StyledButton type="button" onClick={() => { dispatch(webshop.actions.removeItem(product)) }}>-</StyledButton>
        <StyledButton type="button" onClick={() => { dispatch(webshop.actions.addItem(product)) }}>+</StyledButton>
      </span>
    </li>
  )
}