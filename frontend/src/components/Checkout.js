import React, { useEffect } from 'react'
import parse from 'html-react-parser'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { Cart } from './Cart'
import { Products } from './Products'
import { handleCheckout } from '../reducers/user'
import { handleUser } from '../reducers/user'

export const Checkout = () => {

  const dispatch = useDispatch()
  const checkout = useSelector((store) => store.webshop.items?.snippet?.snippet?.snippet)
  const cart = useSelector((store) => store.webshop.items?.cart)
  const user = useSelector((store) => store.user.login?.userDetails.accessToken)
  
  console.log(cart)
  console.log(user)

  useEffect(() => {
    dispatch(handleUser())
  }, [])

  const handleClick = () => {
    dispatch(handleCheckout())
  }

  return (
    <div>
      <Cart />
      <Products />
      { cart?.length > 0 && user?.length > 0 && <button type="submit" onClick={handleClick}>Render checkout</button> }
      { checkout && <div>{parse(checkout)}</div> } 
      <p><Link to={"/login"}>To login</Link></p>
    </div>
  )
}
