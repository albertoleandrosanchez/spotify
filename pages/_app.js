import {SessionProvider} from 'next-auth/react'
import {RecoilRoot} from 'recoil'
import '../styles/globals.css'

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  console.log(session, '_app')
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
