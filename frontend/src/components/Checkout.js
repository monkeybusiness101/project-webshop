import React, { useState } from 'react'
import parse from 'html-react-parser'

import body from '../data/body-data.json'

export const Checkout = ( {input} ) => {

  const [checkout, setCheckout] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
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
          "amount": 0,
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
          "orgnr": "55506-0222",
          "billingaddress": {
            "companyname": "Company AB",
            "firstname": "Alan",
            "lastname": "Smith",
            "streetaddress": "Kingstreet 1 B",
            "zip": "24224",
            "city": "Kingcity",
            "cellno": "+4670333444",
            "email": "youremail@mail.com"
          },
          "shippingaddress": {
            "companyname": "Company AB",
            "firstname": `${input.firstName}`,
            "lastname": "Smith",
            "streetaddress": "Kingstreet 1 B",
            "zip": "24224",
            "city": "Kingcity",
            "cellno": "+4670333444",
            "email": "youremail@mail.com"
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
    <div>
      <button type="submit" >Fetch checkout</button>
      {checkout && parse(checkout.snippet.snippet)} 
    </div>
  )

}