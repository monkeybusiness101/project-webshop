import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from "react-redux"
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { handleUser } from '../reducers/user'
import { handleLogin } from '../reducers/user'

const StyledTextField = styled(TextField)`
  width: 100%;
`
const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
`
const StyledButton = styled(Button)`
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  width: 100%;
  height: 50px;
  &:hover {
    background-color: #5469d4;
  }
`
const StyledDiv = styled.div`
  @media (min-width: 700px) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`
const StyledSection = styled.section`
  @media (min-width: 700px) {
    width: 500px;
  }
`

export const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const loggedIn = useSelector((store) => store.user.login?.loggedIn)

  useEffect(() => {
    dispatch(handleUser())
    // eslint-disable-next-line
  }, [])

  const handleClick = (event) => {
    event.preventDefault()
    batch(() => {
      dispatch(handleLogin(email, password))
    })
  }

  return (
    <StyledDiv>
    { !loggedIn &&
        <StyledSection>
          <form onSubmit={handleClick}>
            <InputLabel>
              Email:
              <StyledTextField
                required
                minLength="5"
                type="email"
                value={email}
                name="email"
                onChange={event => setEmail(event.target.value)} />
            </InputLabel>
            <InputLabel>
              Password:
              <StyledTextField
                required
                minLength="5"
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)} />
            </InputLabel>
            <StyledButton type="submit">Login</StyledButton>
          </form>
          <StyledButton onClick={() => {history.push("/")}}>No account? Signup</StyledButton>
        </StyledSection>
    }
    { loggedIn && 
      <section><p>You are logged in!</p>
      <StyledButton onClick={() => {history.push("/checkout")}}>Checkout</StyledButton>
      </section>
    }
    </StyledDiv>
  )
}