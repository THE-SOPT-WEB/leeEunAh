import { ThemeProvider } from 'styled-components';
import GlobalStyle from './global';
import Search from './Search';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Search />
    </ThemeProvider>
  );
}

export default App;
