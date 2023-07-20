import { stripe } from '@/lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'
import { Product } from 'use-shopping-cart/core'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description?: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const { addItem } = useShoppingCart()

  function handleAdditem({ product }: ProductProps) {
    const prod: Product = {
      id: product.id,
      name: product.name,
      image: product.imageUrl,
      currency: 'BRL',
      price: parseFloat(
        product.price.replace(/[^\d,.]/g, '').replace(',', '.'),
      ),
      price_id: product.defaultPriceId,
    }

    addItem(prod)
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>

          <button onClick={() => handleAdditem({ product })}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_OGM8YLcdmvgUR0' } }],
    fallback: 'blocking',
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id ?? ''

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price
  const unitAmount = price.unit_amount || 0

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pr-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(unitAmount / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
