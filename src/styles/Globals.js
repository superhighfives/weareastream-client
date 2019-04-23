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

  body {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    color: black;
    background-color: ${color.red};
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'sf-pro', sans-serif;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
