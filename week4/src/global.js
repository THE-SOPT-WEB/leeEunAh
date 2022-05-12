import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body,html {
    width : 100%;
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.bgColor}; 
  }
`;

export default GlobalStyle;
