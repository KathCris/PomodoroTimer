import styled from "styled-components";

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${props => props.theme['gray-100']};
  }
`
export const HistoryList = styled.main`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${props => props.theme['gray-600']};
      color: ${props => props.theme['gray-100']};
      padding: 1rem;
      text-align: left;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }
      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${props => props.theme['gray-700']};
      border-top: 4px solid ${props => props.theme['gray-800']};

      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;


      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }
      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`
const ConverteStatusColor = {
  yellow: 'yellow-500',
  red: 'red-500',
  green: 'green-500',
} as const

//Atention to "as const" ^^

interface StatusProps {
  statusColor: keyof typeof ConverteStatusColor
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before{
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 100%;
    background: ${props => props.theme[ConverteStatusColor[props.statusColor]]};
  }
`

export const InviHeaderHistory = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    color: ${props => props.theme['red-500']};

    &:hover{
      cursor: pointer;
      color: ${props => props.theme['gray-100']};
    }
  }
`





