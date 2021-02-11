import React from 'react'
import styled from 'styled-components'
import { Logout } from './Logout'

const Image = styled.img`
  height: 200px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  font-size: 24px;
`

export const Header = () => {

return (
  <Container>
    <Image src="https://www.svgrepo.com/show/72023/monkey.svg" alt="header monkey"/>
    <Logout />
  </Container>
)
}