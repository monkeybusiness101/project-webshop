import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';

import { user } from "../reducers/user";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loggedIn = useSelector((store) => store.user.login?.loggedIn)


  const handleCredentials = (credentials) => {
    localStorage.setItem("sessionToken", credentials.accessToken);
    localStorage.setItem("sessionId", credentials.userId);
    dispatch(user.actions.setAccessToken({ accessToken: credentials.accessToken }));
    dispatch(user.actions.setUserId({ userId: credentials.userId }));

  };

  const handleLogin = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/sessions', {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          dispatch(user.actions.loggedIn({ loggedIn: false }));
        }
        return res.json();
      })
      .then((json) => {
        handleCredentials(json);
        dispatch(user.actions.loggedIn({ loggedIn: true }));
        history.push("/checkout");
      })
      .catch((error) => console.error(error))
  };

  return (
    <>
    { !loggedIn &&
        <section>
          <h1>Welcome to monkeybusiness webshop</h1>
          <form onSubmit={handleLogin}>
            <p>Please enter your credentials below.</p>
            <label>
              Email:
              <input
                type="email"
                value={email}
                name="email"
                onChange={event => setEmail(event.target.value)} />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)} />
            </label>
            <button type="submit">Login</button>
          </form>
        </section>
    }
    { 
      loggedIn && 
      <section><p>You are logged in!</p>
      <p><Link to={"/checkout"}>To Checkout</Link></p>
      </section>
    }
    <p>Not a member yet? Please sign up <Link to={"/"}>here</Link>.</p>
    </>
  );
};

export default Login;