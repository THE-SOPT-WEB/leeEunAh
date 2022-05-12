import { ThemeProvider } from 'styled-components';
import GlobalStyle from './global';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
