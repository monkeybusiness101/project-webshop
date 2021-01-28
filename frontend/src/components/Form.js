import React, { useState } from 'react'
import parse from 'html-react-parser'

export const Form = () => {
  
  const [input, setInput] = useState({});
  const [checkout, setCheckout] = useState(null)

  const handleSignup = (event) => {
    event.preventDefault()
    console.log(input, "frontend input")

    fetch('http://localhost:8080/checkout', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(
        {
          "currency": "SEK",
          "locale": "sv-se",
          "country": "SE",
          "amount": 1337,
          "cart": [
            {
              "producttype": "physical",
              "reference": "greenboard2",
              "name": "Green board 2m",
              "quantity": 2,
              "quantityunit": "pc",
              "unitprice": 1200,
              "taxrate": 2500,
              "discount": 0
            }
          ],
          "merchanturls": {
            "terms": "https://merchant.com/terms",
            "notifications": "https://merchant.com/api/briqpaycallback",
            "redirecturl": "https://merchant.com/thankyou"
          },
          "merchantconfig": {
            "maxamount": true,
            "creditscoring": true
          },
          "reference": {
            "reference1": "string",
            "reference2": "string"
          },
          "orgnr": `${input.orgNo}`,
          "billingaddress": {
            "companyname": `${input.companyName}`,
            "firstname": `${input.firstName}`,
            "lastname": `${input.lastName}`,
            "streetaddress": `${input.streetAddress}`,
            "zip": `${input.zipCode}`,
            "city": `${input.city}`,
            "cellno": `${input.cellNo}`,
            "email": `${input.email}`
          }
        }
      )
    })
      .then((res) => {
        if (!res.ok) {
          throw "Fetch checkout failed"
        }
        return res.json()
      })
      .then((json) => {
        setCheckout(json)
        console.log(json)
      })
      .catch((error) => console.error(error))

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
            type="firstname"
            value={input.firstName}
            name="firstname"
            onChange={({target}) => setInput(state => ({...state,firstName:target.value}))} />
        </label>
        <label>
          Last Name:
          <input
            required
            minLength="5"
            type="lastname"
            value={input.lastName}
            name="lastname"
            onChange={({target}) => setInput(state => ({...state,lastName:target.value}))} />
        </label>
        <label>
          Street address:
          <input
            required
            minLength="5"
            type="streetaddr"
            value={input.streetAddress}
            name="streetaddr"
            onChange={({target}) => setInput(state => ({...state,streetAddress:target.value}))} />
        </label>
        <label>
          zip:
          <input
            required
            minLength="5"
            type="zipcode"
            value={input.zipCode}
            name="zipcode"
            onChange={({target}) => setInput(state => ({...state,zipCode:target.value}))} />
        </label>
        <label>
          city:
          <input
            required
            minLength="5"
            type="city"
            value={input.city}
            name="city"
            onChange={({target}) => setInput(state => ({...state,city:target.value}))} />
        </label>
        <label>
          cellno:
          <input
            required
            minLength="5"
            type="cellno"
            value={input.cellNo}
            name="cellno"
            onChange={({target}) => setInput(state => ({...state,cellNo:target.value}))} />
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
            name="password"
            onChange={({target}) => setInput(state => ({...state,password:target.value}))} />
        </label>
        <button type="submit" >Fetch checkout</button>
      </form>

      <div>
      {checkout && parse(checkout.snippet.snippet)} 
    </div>
    </section>
  );
}