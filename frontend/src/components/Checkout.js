import React, { useEffect } from 'react'
import parse from 'html-react-parser'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'

import { Cart } from './Cart'
import { Products } from './Products'
import { handleCheckout } from '../reducers/user'
import { handleUser } from '../reducers/user'

const StyledButton = styled(Button)`
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  width: 100%;
  height: 50px;
  &:hover {
    background-color: #5469d4;
  }
`

export const Checkout = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const checkout = useSelector((store) => store.user.login?.snippet?.snippet?.snippet)
  const cart = useSelector((store) => store.webshop?.items)
  const user = useSelector((store) => store.user.login?.userDetails.accessToken)
  const loggedIn = useSelector((store) => store.user.login?.loggedIn)

  useEffect(() => {
    dispatch(handleUser())
    // eslint-disable-next-line
  }, [])

  const handleClick = () => {
    dispatch(handleCheckout())
  }

  return (
    <div>
      <Cart />
      <Products />
      { cart?.length > 0 && user?.length > 0 && <StyledButton type="submit" onClick={handleClick}>Render checkout</StyledButton> }
      { checkout && <div>{parse(checkout)}</div> } 
      { !loggedIn && <StyledButton onClick={() => {history.push("/login")}}>Login</StyledButton> }
    </div>
  )
}
