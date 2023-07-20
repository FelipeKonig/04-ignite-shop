import {
  HomeContainer,
  IconContainer,
  ProductContainer,
} from '@/styles/pages/home'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'
import { GetStaticProps } from 'next'
import Link from 'next/link'

import 'keen-slider/keen-slider.min.css'
import Head from 'next/head'

import { Handbag } from 'phosphor-react'
import { useShoppingCart } from 'use-shopping-cart'
import { Product } from 'use-shopping-cart/core'

interface ProductHome {
  id: string
  name: string
  imageUrl: string
  price: string
  defaultPriceId: string
}

interface HomeProps {
  products: ProductHome[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  const { addItem } = useShoppingCart()

  function handleAdditem(product: ProductHome) {
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
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <ProductContainer className="keen-slider__slide" key={product.id}>
              <Link href={`/product/${product.id}`} prefetch={false}>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
              </Link>
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>
                <IconContainer>
                  <Handbag
                    size={32}
                    color="white"
                    weight="bold"
                    onClick={() => handleAdditem(product)}
                  />
                </IconContainer>
              </footer>
            </ProductContainer>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    const unitAmount = price.unit_amount || 0

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(unitAmount / 100),
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
