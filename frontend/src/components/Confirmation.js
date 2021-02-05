import React, { useEffect } from "react"

import { handleConfirmation } from '../reducers/user'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'

export const Confirmation = () => {

  const { userId, accessToken } = useParams()
  const dispatch = useDispatch()
  const cart = useSelector((store) => store.user.login?.userDetails)

  useEffect(() => {
    dispatch(handleConfirmation( userId, accessToken ))
  }, [])

  return (
    <>
    <p>Thank you for making a purchase!</p>
    <p>We will send the order to</p>
    <p>{ cart.firstName }</p>
    <p>{ cart.lastName }</p>
    <p>{ cart.companyName }</p>
    <p>{ cart.streetAddress }</p>
    <p><Link to={"/checkout"}>Back to checkout</Link></p>
    </>
  )
}