/* eslint-disable react/no-unknown-property */
import type { AppProps } from 'next/app'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { globalStyles } from '@/styles/global'

import logoImg from '../assets/logo.svg'
import { Container, Header } from '@/styles/pages/app'
import Image from 'next/image'
import Cart from './components/cart'
import Link from 'next/link'
import { CartProvider } from 'use-shopping-cart'

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
        <CartProvider
          mode="payment"
          cartMode="client-only"
          stripe=""
          successUrl=""
          cancelUrl=""
          currency="BRL"
          allowedCountries={['BR']}
          shouldPersist
        >
          <Header>
            <Link href="/" prefetch={false}>
              <Image src={logoImg} alt="" />
            </Link>
            <Cart />
          </Header>
          <Component {...pageProps} />
        </CartProvider>
      </Container>
    </>
  )
}
