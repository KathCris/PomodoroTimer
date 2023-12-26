import styled from "styled-components"

export const LayoutConainer = styled.div`
  max-width: 74rem;
  height: calc(100vh - 10rem); //quando usamos o calc(100vh) ele usa 100% da viewPort, ou seja, seria o 100% de height
  margin: 5rem auto;
  padding: 1rem 2.5rem;

  background: ${props => props.theme['gray-800']};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
`