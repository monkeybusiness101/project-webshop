import { createSlice } from "@reduxjs/toolkit"
import { webshop } from "../reducers/webshop"


const initialState = {
  login: {
    userDetails: {},
    accessToken: "",
    userId: ""
  },
}

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { userDetails } = action.payload;
      state.login.userDetails = userDetails;
    },
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      state.login.accessToken = accessToken;
    },
    setUserId: (state, action) => {
      const { userId } = action.payload;
      state.login.userId = userId;
    },
    setAlias: (state, action) => {
      const { alias } = action.payload;
      state.login.alias = alias;
    },
    deleteAccessToken: (state, action) => {
      state.login.accessToken = "";
    },
    deleteUserId: (state, action) => {
      state.login.userId = ""
    },
  }

})

export const handleSignup = () => {

  return (dispatch,getState) => {

    const data = getState()
    const totalPrice = Math.floor(data.webshop.items?.cart[0]?.unitprice * data.webshop.items?.cart[0]?.quantity)
    const cart = data.webshop.items.cart
    const id = data.user.login.userId
    console.log(data.webshop.items.cart)

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
        "amount": totalPrice,
        "cart": cart
        ,
        "merchanturls": {
          "terms": "https://mentimeter.com",
          "notifications": "https://mentimeter.com",
          "redirecturl": `http://localhost:3000/confirmation/${id}`
        },
        "merchantconfig": {
          "maxamount": true,
          "creditscoring": true
        },
        "reference": {
          "reference1": "string",
          "reference2": "string"
        },
        "orgnr": `${data.user.login.userDetails.orgNo}`,
        "billingaddress": {
          "companyname": `${data.user.login.userDetails.companyName}`,
          "firstname": `${data.user.login.userDetails.firstName}`,
          "lastname": `${data.user.login.userDetails.lastName}`,
          "streetaddress": `${data.user.login.userDetails.streetAddress}`,
          "zip": `${data.user.login.userDetails.zipCode}`,
          "city": `${data.user.login.userDetails.city}`,
          "cellno": `${data.user.login.userDetails.cellNo}`,
          "email": `${data.user.login.userDetails.email}`
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
      dispatch(webshop.actions.setSnippet({ snippet: json }))
      console.log(json)
    })
    .catch((error) => console.error(error))

 }
}

export const handleCreateAccount = () => {
  return (dispatch, getState) => {

    const data = getState()
      
      fetch('http://localhost:8080/users', {
        method: "POST",
        body: JSON.stringify({ 
          email:`${data.user.login.userDetails.email}`, 
          password:`${data.user.login.userDetails.password}`, 
          orgnr:`${data.user.login.userDetails.orgNo}`,
          companyname: `${data.user.login.userDetails.companyName}`,
          firstname: `${data.user.login.userDetails.firstName}`,
          lastname: `${data.user.login.userDetails.lastName}`,
          streetaddress: `${data.user.login.userDetails.streetAddress}`,
          zip: `${data.user.login.userDetails.zipCode}`,
          city: `${data.user.login.userDetails.city}`,
          cellno: `${data.user.login.userDetails.cellNo}`, 
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (!res.ok) {
            // eslint-disable-next-line
            throw "Signup failed";
          }
          return res.json();
        })
        .then((json) => {

          console.log(json)
          dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }));
          dispatch(user.actions.setUserId({ userId: json.userId }));
        })
        .catch((error) => console.error(error))
      
    }
}

export const handleUser = () => {
  return (dispatch, getState) => {

    const data = getState()
    const accessToken = data.user.login.accessToken
    const userId = data.user.login.userId
      
      fetch('http://localhost:8080/profile', {
        method: "GET",
        headers: { Authorization: accessToken, userId: userId },
      })
        .then((res) => {
          if (!res.ok) {
            // eslint-disable-next-line
            throw "Failed to retrieve profile";
          }
          return res.json();
        })
        .then((json) => {
          dispatch(user.actions.setUserDetails({ userDetails: json }));
          console.log(json)
        })
        .catch((err) => console.error(err))
    };
}

