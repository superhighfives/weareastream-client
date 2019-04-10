import { createGlobalStyle } from 'styled-components'
import reset from 'css-wipe/js'
import color from './Color'

// tslint:disable-next-line:no-unused-expression
export default createGlobalStyle`
  ${reset}
  
  @font-face {
    font-family: 'sf-pro';
    src: url('${require('../assets/fonts/sf-pro.woff2')}') format('woff2'),
         url('${require('../assets/fonts/sf-pro.woff')}') format('woff');
    font-weight: 800;
    font-style: normal;
  }

  html,
  body {
    min-height: 100vh;
  }

  body {
    color: black;
    background-color: ${color.red};
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'sf-pro', sans-serif;
    font-weight: 800;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    &.black {
      color: ${color.red};
      background-color: black;
    }
  }
`
