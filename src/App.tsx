import { ThemeProvider } from 'styled-components'

import { Router } from './Router.tsx'
import { BrowserRouter } from 'react-router-dom'

import { GlobalStyle } from './styles/global.ts'
import { defaultTheme } from './styles/themes/default.ts'

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <h1>Hello world</h1>
      <GlobalStyle />
    </ThemeProvider>
  )
}