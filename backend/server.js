import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const fetch = require('node-fetch')

const body = {
  "currency": "SEK",
  "locale": "en-gb",
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
    "firstname": "Alan",
    "lastname": "Smith",
    "streetaddress": "Kingstreet 1 B",
    "zip": "24224",
    "city": "Kingcity",
    "cellno": "+4670333444",
    "email": "youremail@mail.com"
  }
}

const AUTH = process.env.AUTH
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/projectWebshop"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

//GET session token
const sessionToken = async () => {
    return await fetch('https://playground-api.briqpay.com/auth', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': AUTH
    }
  })
  .then(response => response.json())
  .then(token => {
    console.log(token, "initial call")
    return token.token
  }).catch((err) => console.log(err))
}

//POST session
const checkout = async (token) => {
  const bearer = token
  console.log(bearer)
  return await fetch('https://playground-api.briqpay.com/checkout/v1/sessions', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "bearer " + bearer
    }
  })
  .then(response => response.json())
  .then(session => {
    console.log(session, "second call")
    return { snippet: session.snippet, newToken: session.token }
  }).catch((err) => console.log(err))
}

app.get('/checkout', async(req, res) => {
  try {
    const token = await sessionToken()
    checkout(token)
    res.status(200).json({message: 'fetch successful'})
  } catch (err) {
    res.status(400).json({message: 'could not fetch session', error:err.errors})
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
