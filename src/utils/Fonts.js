import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'DMSans';
        src: url({{ "DMSans-Regular.woff2" ¦ asset_url }}) format('woff2');
      }
      /* latin */
      @font-face {
        font-family: 'KumbhSans';
        src: url({{ "KumbhSans-Regular.woff2" ¦ asset_url }}) format('woff2');
      }
      `}
  />
)

//const Fonts = () => (
//  <Global
//    styles={`
//      /* latin */
//      @font-face {
//        font-family: 'DMSans';
//        font-style: normal;
//        font-weight: 400;
//        font-display: swap;
//        src: local("DMSans"), url('./assets/DMSans-Regular.woff2') format('woff2');
//        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
//      }
//      `}
//  />
//)

export default Fonts