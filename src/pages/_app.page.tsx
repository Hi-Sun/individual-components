import '@src/styles/globals.less'
import 'antd/dist/antd.less'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
