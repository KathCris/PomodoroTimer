import { ThemeProvider } from 'styled-components'

import { Router } from './Router.tsx'
import { BrowserRouter } from 'react-router-dom'

import { GlobalStyle } from './styles/global.ts'
import { defaultTheme } from './styles/themes/default.ts'
import { CyclesContextProvider } from './contexts/CyclesContext.tsx'

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}