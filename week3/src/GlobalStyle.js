import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
	${reset}
  * {
    box-sizing: border-box;
  }
  body,html {
    width : 100%;
    height: 100vh;
    background-color: black; 
  }
`;

export default GlobalStyle;
