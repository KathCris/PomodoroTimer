import { ThemeProvider } from 'styled-components'

import { GlobalStyle } from './styles/global.ts'
import { defaultTheme } from './styles/themes/default.ts'

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>Hello world</h1>
      <GlobalStyle />
    </ThemeProvider>
  )
}