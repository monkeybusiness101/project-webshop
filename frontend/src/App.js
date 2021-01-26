import React, { useState } from 'react'
import parse from 'html-react-parser'

export const App = () => {

  const [checkout, setCheckout] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/checkout')
      .then((res) => {
        if (!res.ok) {
          throw "Fetch checkout failed";
        }
        return res.json();
      })
      .then((json) => {
        setCheckout(json);
        console.log(json)
      })
      .catch((error) => console.error(error))

  };

  return (
    <div>
      <button type="submit" onClick={handleSubmit}>Fetch checkout</button>
      {checkout && parse(checkout.snippet.snippet)} 
      
    </div>
  )
}
