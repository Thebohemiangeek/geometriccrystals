import React from "react"
import { loadableP5 as P5Wrapper } from "./P5/loadablep5"
import herosketch from "./P5/Sketch"
import styled from "styled-components"
const Hero = () => {
  return (
    <StyledContainer>
      <P5Wrapper sketch={herosketch} />
      <h1>hello this should be at the bottom</h1>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  width: 100%;
`
export default Hero
