import React from "react"
import { useDispatch, useSelector, batch } from "react-redux"
import Button from '@material-ui/core/Button'
import styled from 'styled-components'

import { user } from "../reducers/user"

const StyledButton = styled(Button)`
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  height: 50px;
  &:hover {
    background-color: #5469d4;
  }
`

// Logout component
export const Logout = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.user.login?.accessToken)

  const handleLogout = () => {

    batch(() => {
      dispatch(user.actions.deleteAccessToken())
      dispatch(user.actions.deleteUserId())
      dispatch(user.actions.loggedIn({ loggedIn: false }))
      localStorage.clear()
      window.location.reload()
    })
  }
  return (
    <>
    { token && <StyledButton onClick={handleLogout}>Logout</StyledButton> }
    </>
  )
}
