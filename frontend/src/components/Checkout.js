import React, { useEffect } from 'react'
import parse from 'html-react-parser'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { Cart } from './Cart'
import { Products } from './Products'
import { handleSignup } from '../reducers/user'
import { handleUser } from '../reducers/user'

export const Checkout = () => {

  const dispatch = useDispatch()
  const checkout = useSelector((store) => store.webshop.items.snippet.snippet.snippet)
  const cart = useSelector((store) => store.webshop.items.cart )
  console.log(cart)

  useEffect(() => {
    dispatch(handleUser())
  }, [])

  const handleClick = () => {
    dispatch(handleSignup())
  }

  return (
    <div>
      <Cart />
      <Products />
      { cart.length > 0 && <button type="submit" onClick={handleClick}>Render checkout</button> }
      { checkout && <div>{parse(checkout)}</div> } 
      <p><Link to={"/login"}>Back</Link></p>
    </div>
  )
}
