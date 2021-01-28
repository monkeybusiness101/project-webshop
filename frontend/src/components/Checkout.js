import React, { useEffect } from 'react'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

export const Checkout = ( {input} ) => {

  const checkout = useSelector((store) => store.webshop.items.snippet.snippet.snippet)

  return (

    <div>
      {parse(checkout)} 
    </div>
  )

}