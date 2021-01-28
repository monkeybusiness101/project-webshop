import { createSlice } from "@reduxjs/toolkit";
import { webshop } from "../reducers/webshop";


const initialState = {
  login: {
    userDetails: {},
    accessToken: "",
    userId: "",
    alias: "",
  },
};

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
      state.login.userId = "";
    },
  }

});

export const handleSignup = () => {

  return (dispatch,getState) => {

    const data = getState()
    console.log(data)

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
      dispatch(webshop.actions.setSnippet({ snippet: json }));
      console.log(json)
    })
    .catch((error) => console.error(error))

 }
}