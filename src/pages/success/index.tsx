import { stripe } from '@/lib/stripe'
import {
  ImageBox,
  ImageContainer,
  SuccessContainer,
} from '@/styles/pages/success'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'

interface SuccessProps {
  customerName: string
  products: {
    id: string
    name: string
    images: string[]
  }[]
  totalQuantity: number
}

export default function Success({
  customerName,
  products,
  totalQuantity,
}: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <ImageBox>
          {products &&
            products.map((product) => {
              return (
                <ImageContainer key={product.id}>
                  <Image
                    src={product.images[0]}
                    width={120}
                    height={110}
                    alt=""
                  />
                </ImageContainer>
              )
            })}
        </ImageBox>

        <h1>Compra efetuada!</h1>

        {totalQuantity && totalQuantity === 1 ? (
          <p>
            Uhuul <strong>{customerName}</strong>, sua{' '}
            <strong>{products[0].name}</strong> já está a caminho da sua casa.
          </p>
        ) : (
          <p>
            Uhuul <strong>{customerName}</strong>, sua compra de {totalQuantity}{' '}
            camisetas já está a caminho da sua casa.
          </p>
        )}
        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name

  const products: Stripe.Product[] =
    session.line_items?.data.map(
      (item) => item.price?.product as Stripe.Product,
    ) || []

  const quantities: { quantity: number }[] =
    session.line_items?.data.map((item) => ({
      quantity: item.quantity || 0,
    })) || []

  const totalQuantity = quantities.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  return {
    props: {
      customerName,
      products,
      totalQuantity,
    },
  }
}
