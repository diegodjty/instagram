import '../styles/globals.css'
import {SessionProvider} from 'next-auth/client'
import { RecoilRoot } from 'recoil'


function MyApp({ Component, pageProps:{session, ...pageProps} }) {
  return (
    <SessionProvider >
      <RecoilRoot >
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
