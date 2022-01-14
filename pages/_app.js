import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react'

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  console.log(session, '_app')
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
