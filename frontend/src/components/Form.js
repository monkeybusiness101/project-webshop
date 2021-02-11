import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useDispatch, batch, useSelector } from "react-redux"
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { user } from "../reducers/user";
import { handleCreateAccount } from '../reducers/user'
import { handleUser } from '../reducers/user'

const StyledTextField = styled(TextField)`
  width: 100%;
`
const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
`
const StyledButton = styled(Button)`
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  width: 100%;
  height: 50px;
  &:hover {
    background-color: #5469d4;
  }
`
export const Form = () => {
  
  const dispatch = useDispatch()
  const history = useHistory()
  const [input, setInput] = useState({})
  const loggedIn = useSelector((store) => store.user.login?.loggedIn)

  useEffect(() => {
    dispatch(handleUser())
    // eslint-disable-next-line
  }, [])

  const handleSignup = (event) => {
    event.preventDefault()
    batch(() => {
      dispatch(user.actions.setUserDetails({ userDetails: input }))
      dispatch(handleCreateAccount())
      history.push("/checkout")
    })
  }

  return (
    <div>
   { !loggedIn && <section>
      <form onSubmit={handleSignup}>
        <InputLabel>
          Organization number:
          <StyledTextField 
            type="orgno"
            value={input.orgNo}
            name="orgno"
            onChange={({target}) => setInput(state => ({...state,orgNo:target.value}))} />
        </InputLabel>
        <InputLabel>
          Company name:
          <StyledTextField
            type="compname"
            value={input.companyName}
            name="compname"
            onChange={({target}) => setInput(state => ({...state,companyName:target.value}))} />
        </InputLabel>
        <InputLabel>
          First Name:
          <StyledTextField
            type="firstname"
            value={input.firstName}
            name="firstname"
            onChange={({target}) => setInput(state => ({...state,firstName:target.value}))} />
        </InputLabel>
        <InputLabel>
          Last Name:
          <StyledTextField    
            type="lastname"
            value={input.lastName}
            name="lastname"
            onChange={({target}) => setInput(state => ({...state,lastName:target.value}))} />
        </InputLabel>
        <InputLabel>
          Street address:
          <StyledTextField
            type="streetaddr"
            value={input.streetAddress}
            name="streetaddr"
            onChange={({target}) => setInput(state => ({...state,streetAddress:target.value}))} />
        </InputLabel>
        <InputLabel>
          zip:
          <StyledTextField
            type="zipcode"
            value={input.zipCode}
            name="zipcode"
            onChange={({target}) => setInput(state => ({...state,zipCode:target.value}))} />
        </InputLabel>
        <InputLabel>
          city:
          <StyledTextField
            type="city"
            value={input.city}
            name="city"
            onChange={({target}) => setInput(state => ({...state,city:target.value}))} />
        </InputLabel>
        <InputLabel>
          cellno:
          <StyledTextField
            type="cellno"
            value={input.cellNo}
            name="cellno"
            onChange={({target}) => setInput(state => ({...state,cellNo:target.value}))} />
        </InputLabel>
        <InputLabel>
          Email:
          <StyledTextField
            type="email"
            value={input.email}
            name="email"
            onChange={({target}) => setInput(state => ({...state,email:target.value}))} />
        </InputLabel>
        <InputLabel>
          Password:
          <StyledTextField
            type="password"
            value={input.password}
            name="password"
            onChange={({target}) => setInput(state => ({...state,password:target.value}))} />
        </InputLabel>
        <StyledButton type="submit">Create account</StyledButton>
      </form>
      <StyledButton onClick={() => {history.push("/login")}}>Login</StyledButton>
    </section>
   }
    { 
      loggedIn && 
      <section><p>You are logged in!</p>
      <StyledButton onClick={() => {history.push("/checkout")}}>Checkout</StyledButton>
      </section>
    }
    
    </div>
  )
}