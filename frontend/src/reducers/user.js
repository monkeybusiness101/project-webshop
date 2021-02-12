import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  login: {
    userDetails: {},
    accessToken: "",
    userId: "",
    loggedIn: false,
    snippet: { snippet: '' }
  },
}

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSnippet: (state, action) => {
      const { snippet } = action.payload
      state.login.snippet = snippet
    },
    setUserDetails: (state, action) => {
      const { userDetails } = action.payload
      state.login.userDetails = userDetails
    },
    loggedIn: (state, action) => {
      const { loggedIn } = action.payload
      state.login.loggedIn = loggedIn
    },
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload
      state.login.accessToken = accessToken
    },
    setUserId: (state, action) => {
      const { userId } = action.payload
      state.login.userId = userId
    },
    deleteAccessToken: (state, action) => {
      state.login.accessToken = ""
    },
    deleteUserId: (state, action) => {
      state.login.userId = ""
    },
  }

})

export const handleCheckout = () => {

  return (dispatch,getState) => {

    const data = getState()
    const totalPrice = Math.floor(data.webshop.items[0]?.unitprice * data.webshop.items[0]?.quantity)
    const cart = data.webshop.items
    const userId = data.user.login.userId
    const accessToken = data.user.login.accessToken

  fetch('https://monkeybiz-webshop.herokuapp.com/checkout', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(
      {
        "currency": "SEK",
        "locale": "en-gb",
        "country": "SE",
        "amount": totalPrice,
        "cart": cart
        ,
        "merchanturls": {
          "terms": "https://mentimeter.com",
          "notifications": "https://mentimeter.com",
          "redirecturl": `https://amazing-mccarthy-132ca5.netlify.app/confirmation/${userId}/${accessToken}`
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
        // eslint-disable-next-line
        throw "Fetch checkout failed"
      }
      return res.json()
    })
    .then((json) => {
      dispatch(user.actions.setSnippet({ snippet: json }))
    })
    .catch((error) => console.error(error))

 }
}

export const handleCreateAccount = () => {
  return (dispatch, getState) => {

    const data = getState()
      
      fetch('https://monkeybiz-webshop.herokuapp.com/users', {
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
            throw "Signup failed"
          }
          return res.json()
        })
        .then((json) => {
          dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }))
          dispatch(user.actions.setUserId({ userId: json.userId }))
        })
        .catch((error) => console.error(error))
      
    }
}

export const handleUser = () => {

  return (dispatch, getState) => {
    dispatch(user.actions.setAccessToken({ accessToken: localStorage.getItem("sessionToken") }))
    dispatch(user.actions.setUserId({ userId: localStorage.getItem("sessionId") }))
    const data = getState()
    let accessToken = data.user.login.accessToken
    let userId = data.user.login.userId
    
      fetch('https://monkeybiz-webshop.herokuapp.com/profile', {
        method: "GET",
        headers: { Authorization: accessToken, userId: userId },
      })
        .then((res) => {
          if (!res.ok) {
            dispatch(user.actions.loggedIn({ loggedIn: false }))
            // eslint-disable-next-line
            throw "Failed to retrieve profile"
          }
          return res.json();
        })
        .then((json) => {
          dispatch(user.actions.setUserDetails({ userDetails: json }))
          dispatch(user.actions.loggedIn({ loggedIn: true }))
        })
        .catch((err) => console.error(err))
    }
}

export const handleConfirmation = (userId, accessToken) => {

  return (dispatch) => {
      
      fetch('https://monkeybiz-webshop.herokuapp.com/profile', {
        method: "GET",
        headers: { Authorization: accessToken, userId: userId },
      })
        .then((res) => {
          if (!res.ok) {
            dispatch(user.actions.loggedIn({ loggedIn: false }))
            // eslint-disable-next-line
            throw "Failed to retrieve profile"
          }
          return res.json()
        })
        .then((json) => {
          dispatch(user.actions.setUserDetails({ userDetails: json }))
          dispatch(user.actions.loggedIn({ loggedIn: true }))
        })
        .catch((err) => console.error(err))
    }
}

export const handleCredentials = (credentials) => {

  console.log(credentials)

  return (dispatch) => {
      localStorage.setItem("sessionToken", credentials.accessToken)
      localStorage.setItem("sessionId", credentials.userId)
      dispatch(user.actions.setAccessToken({ accessToken: credentials.accessToken }))
      dispatch(user.actions.setUserId({ userId: credentials.userId }))
  }
}

export const handleLogin = (email, password) => {

  return (dispatch) => {

    fetch('https://monkeybiz-webshop.herokuapp.com/sessions', {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (!res.ok) {
        dispatch(user.actions.loggedIn({ loggedIn: false }))
      }
      return res.json()
    })
    .then((json) => {
      localStorage.setItem("sessionToken", json.accessToken)
      localStorage.setItem("sessionId", json.userId)
      dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }))
      dispatch(user.actions.setUserId({ userId: json.userId }))
      dispatch(user.actions.loggedIn({ loggedIn: true }))
    })
    .catch((error) => console.error(error))
  }
}