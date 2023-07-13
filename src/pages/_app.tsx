/* eslint-disable react/no-unknown-property */
import type { AppProps } from 'next/app'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { globalStyles } from '@/styles/global'

import logoImg from '../assets/logo.svg'
import { Container, Header } from '@/styles/pages/app'
import Image from 'next/image'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Ignite Shop',
  description: '04 Projeto Ignite',
}

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <Container>
        <Header>
          <Image src={logoImg} alt="" />
        </Header>
        <Component {...pageProps} />
      </Container>
    </>
  )
}
