import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return(
  <>
  <Head>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Join Stiled Insider List</title>
  <meta name="description" content="This is a description of my site" />
  </Head>
  <Component {...pageProps} />
  </>
  )
}

export default MyApp;

