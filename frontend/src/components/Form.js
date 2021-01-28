import React, { useState } from 'react'

import styled from 'styled-components'
import { useHistory } from 'react-router-dom';

import { useDispatch, batch } from "react-redux";
import { user } from "../reducers/user";



const InputContainer = styled.form`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  list-style-type:none;
  margin-bottom: 10px;
`

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
`

export const Form = () => {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState({});
  const [checkout, setCheckout] = useState(null)

  const handleSignup = () => {

    batch(() => {
      dispatch(user.actions.setUserDetails({ userDetails: input }))
      history.push("/checkout")
    })


  };

  return (
    <div>
    <section>
      <InputContainer onSubmit={handleSignup}>
        <p>Please sign up below.</p>
        <InputLabel>
          Organization number:
          <input
            required
            minLength="5"
            type="orgno"
            value={input.orgNo}
            name="orgno"
            onChange={({target}) => setInput(state => ({...state,orgNo:target.value}))} />
        </InputLabel>
        <InputLabel>
          Company name:
          <input
            required
            minLength="5"
            type="compname"
            value={input.companyName}
            name="compname"
            onChange={({target}) => setInput(state => ({...state,companyName:target.value}))} />
        </InputLabel>
        <InputLabel>
          First Name:
          <input
            required
            minLength="5"
            type="firstname"
            value={input.firstName}
            name="firstname"
            onChange={({target}) => setInput(state => ({...state,firstName:target.value}))} />
        </InputLabel>
        <InputLabel>
          Last Name:
          <input
            required
            minLength="5"
            type="lastname"
            value={input.lastName}
            name="lastname"
            onChange={({target}) => setInput(state => ({...state,lastName:target.value}))} />
        </InputLabel>
        <InputLabel>
          Street address:
          <input
            required
            minLength="5"
            type="streetaddr"
            value={input.streetAddress}
            name="streetaddr"
            onChange={({target}) => setInput(state => ({...state,streetAddress:target.value}))} />
        </InputLabel>
        <InputLabel>
          zip:
          <input
            required
            minLength="5"
            type="zipcode"
            value={input.zipCode}
            name="zipcode"
            onChange={({target}) => setInput(state => ({...state,zipCode:target.value}))} />
        </InputLabel>
        <InputLabel>
          city:
          <input
            required
            minLength="5"
            type="city"
            value={input.city}
            name="city"
            onChange={({target}) => setInput(state => ({...state,city:target.value}))} />
        </InputLabel>
        <InputLabel>
          cellno:
          <input
            required
            minLength="5"
            type="cellno"
            value={input.cellNo}
            name="cellno"
            onChange={({target}) => setInput(state => ({...state,cellNo:target.value}))} />
        </InputLabel>
        <InputLabel>
          Email:
          <input
            required
            minLength="5"
            type="email"
            value={input.email}
            name="email"
            onChange={({target}) => setInput(state => ({...state,email:target.value}))} />
        </InputLabel>
        <InputLabel>
          Password:
          <input
            required
            minLength="5"
            type="password"
            value={input.password}
            name="password"
            onChange={({target}) => setInput(state => ({...state,password:target.value}))} />
        </InputLabel>
        <button type="submit">Create account</button>
      </InputContainer>
    </section>
    </div>
  );
}