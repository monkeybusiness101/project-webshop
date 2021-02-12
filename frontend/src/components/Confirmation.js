import React, { useEffect } from "react"
import { handleConfirmation } from '../reducers/user'
import { useDispatch, useSelector } from "react-redux"
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const StyledButton = styled(Button)`
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  width: 100%;
  height: 50px;
  &:hover {
    background-color: #5469d4;
  }
`
const StyledContainer = styled.div`
  @media (min-width: 700px) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`
const StyledDiv = styled.div`
  @media (min-width: 700px) {
    width: 80%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`

export const Confirmation = () => {

  const { userId, accessToken } = useParams()
  const dispatch = useDispatch()
  const cart = useSelector((store) => store.user.login?.userDetails)
  const history = useHistory()

  useEffect(() => {
    dispatch(handleConfirmation( userId, accessToken ))
    // eslint-disable-next-line
  }, [])

  return (
    <StyledContainer>
      <StyledDiv>
        <p>Thank you for making a purchase!</p>
        <p>We will send the order to:</p>
        <p>First name: { cart.firstName }</p>
        <p>Surname: { cart.lastName }</p>
        <p>Company: { cart.companyName }</p>
        <p>Address: { cart.streetAddress }</p>
        <StyledButton onClick={() => {history.push("/checkout")}}>Checkout</StyledButton>
      </StyledDiv>
    </StyledContainer>
    
  )
}