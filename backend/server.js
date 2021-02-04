import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import crypto from "crypto";
import bcrypt from "bcrypt";

dotenv.config()

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

const User = mongoose.model("User", {
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  orgnr: {
    type: String,
    required: true
  },
  companyname: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  streetaddress: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  cellno: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
    unique: true
  }
});

const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ accessToken: req.header("Authorization") });
    if (!user) {
      throw "User not found";
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ loggedOut: true });
  }
};

// Create user
app.post("/users", async (req, res) => {
  try {
    console.log(req.body)
    const password = req.body.password
    const email = req.body.email
    const orgnr = req.body.orgnr
    const companyname = req.body.companyname
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const streetaddress = req.body.streetaddress
    const zip = req.body.zip
    const city = req.body.city
    const cellno = req.body.cellno
    const salt = bcrypt.genSaltSync();
    const user = await new User({
      email,
      orgnr,
      companyname,
      firstname,
      lastname,
      streetaddress,
      zip,
      city,
      cellno,
      password: bcrypt.hashSync(password, salt)
    }).save();
    res.status(200).json({ userId: user._id, accessToken: user.accessToken });
  } catch (err) {
    res.status(400).json({ message: "Could not create user", errors: err });
  };
});

// Login
app.post("/sessions", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken });
  } else {
    res.json({ notFound: true });
  };
})

// Authenticated endpoint to retrieve user profile data
app.get("/profile", authenticateUser);
app.get("/profile", async (req, res) => {
  if (req.header("userId") != req.user._id) {
    res.status(403).json({ error: "Access Denied" });
  } else {
    res.status(200).json({
      userId: req.user._id, 
      email: req.user.email, 
      accessToken: req.user.accessToken,
      companyName: req.user.companyname,
      firstName: req.user.firstname,
      lastName: req.user.lastname,
      streetAddress: req.user.streetaddress,
      zipCode: req.user.zip,
      city: req.user.city,
      cellNo: req.user.cellno,
      orgNo: req.user.orgnr
    });
  };
});

//GET session token
const sessionToken = async () => {
    return await fetch('https://playground-api.briqpay.com/auth', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.AUTH
    }
  })
  .then(response => response.json())
  .then(token => {
    console.log(token, "initial call")
    return token.token
  }).catch((err) => console.log(err))
}

//POST session
const checkout = async (token, input) => {
  const bearer = token
  console.log(bearer)
  return await fetch('https://playground-api.briqpay.com/checkout/v1/sessions', {
    method: 'POST',
    body: JSON.stringify(input),
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

app.post('/checkout', async(req, res) => {
  try {
    const input = req.body
    console.log(JSON.stringify(input), "backend input")
    const token = await sessionToken()
    const snippet = await checkout(token, input)

    res.status(200).json({snippet, message: 'fetch successful'})
  } catch (err) {
    res.status(400).json({message: 'could not fetch session', error:err.errors})
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
