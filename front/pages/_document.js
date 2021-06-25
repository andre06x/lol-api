import Document, { Head, Main, NextScript, Html } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));

    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }
  render() {
    return (
      <Html>
        <Head>
          <title>OP.GG</title>
          {<style>{
            `body {background: #5383E8}
            *{ box-sizing: border-box }
            html
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}
a {
  color: inherit;
  text-decoration: none;
}`
          }</style>}
        </Head>
        <link rel="icon" type="image/png" href="https://opgg-static.akamaized.net/icon/reverse.rectangle.png"/>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
