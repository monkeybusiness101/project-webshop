import React, { useState } from 'react'

export const Form = () => {
  
  const [input, setInput] = useState({});

  const handleSignup = (event) => {
    event.preventDefault()
    console.log(input)
  };

  return (
    <section>
      <form onSubmit={handleSignup}>
        <p>Please sign up below.</p>
        <label>
          Organization number:
          <input
            required
            minLength="5"
            type="orgno"
            value={input.orgNo}
            name="orgno"
            onChange={({target}) => setInput(state => ({...state,orgNo:target.value}))} />
        </label>
        <label>
          Company name:
          <input
            required
            minLength="5"
            type="compname"
            value={input.companyName}
            name="compname"
            onChange={({target}) => setInput(state => ({...state,companyName:target.value}))} />
        </label>
        <label>
          First Name:
          <input
            required
            minLength="5"
            type="compname"
            value={input.firstName}
            name="compname"
            onChange={({target}) => setInput(state => ({...state,firstName:target.value}))} />
        </label>
        <label>
          Last Name:
          <input
            required
            minLength="5"
            type="compname"
            value={input.lastName}
            name="compname"
            onChange={({target}) => setInput(state => ({...state,lastName:target.value}))} />
        </label>
        <label>
          Street address:
          <input
            required
            minLength="5"
            type="compname"
            value={input.streetAddress}
            name="compname"
            onChange={({target}) => setInput(state => ({...state,streetAddress:target.value}))} />
        </label>
        <label>
          zip:
          <input
            required
            minLength="5"
            type="compname"
            value={input.zipCode}
            name="compname"
            onChange={({target}) => setInput(state => ({...state,zipCode:target.value}))} />
        </label>
        <label>
          city:
          <input
            required
            minLength="5"
            type="compname"
            value={input.city}
            name="compname"
            onChange={({target}) => setInput(state => ({...state,city:target.value}))} />
        </label>
        <label>
          cellno:
          <input
            required
            minLength="5"
            type="compname"
            value={input.cellNo}
            name="compname"
            onChange={({target}) => setInput(state => ({...state,cellMo:target.value}))} />
        </label>
        <label>
          Email:
          <input
            required
            minLength="5"
            type="email"
            value={input.email}
            name="email"
            onChange={({target}) => setInput(state => ({...state,email:target.value}))} />
        </label>
        <label>
          Password:
          <input
            required
            minLength="5"
            type="password"
            value={input.password}
            onChange={({target}) => setInput(state => ({...state,password:target.value}))} />
        </label>
        <button type="submit">Sign up</button>
       
        <p>Already a member? Please login</p>
      </form>
    </section>
  );
}