import React from 'react'
import parse from 'html-react-parser'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';

import { Cart } from './Cart'
import { Products } from './Products'
import { handleSignup } from '../reducers/user'



export const Checkout = () => {

  const dispatch = useDispatch()
  const checkout = useSelector((store) => store.webshop.items.snippet.snippet.snippet)
  const accessToken = useSelector((store) => store.user.login.accessToken )

  const handleClick = () => {
    dispatch(handleSignup())
  }

  return (

    <div>
      
      <Cart />
      <Products />
      { <button type="submit" onClick={handleClick}>Render checkout</button> }
      { checkout && <div>{parse(checkout)}</div> } 
      <p><Link to={"/"}>Back</Link></p>
      
    </div>
  )

}
