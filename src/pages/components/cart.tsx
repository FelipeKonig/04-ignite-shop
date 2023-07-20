import { X, Handbag } from 'phosphor-react'
import { useEffect, useState } from 'react'
import {
  CartContainer,
  IconContainer,
  ImageItem,
  Info,
  InfoContainer,
  Item,
  ItemContainer,
  ItemDescription,
} from '@/styles/pages/cart'
import Image from 'next/image'
import { useShoppingCart } from 'use-shopping-cart'
import axios from 'axios'

interface CartProduct {
  id: string
  name: string
  imageUrl: string
  quantity: number
  price: string
  defaultPriceId: string
}

export default function Cart() {
  const [openCart, setOpenCart] = useState(false)
  const [products, setProducts] = useState<CartProduct[]>([])
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)
  const { cartDetails, removeItem, totalPrice, cartCount, clearCart } =
    useShoppingCart()

  useEffect(() => {
    if (cartDetails) {
      const productList: CartProduct[] = Object.values(cartDetails).map(
        (item) => ({
          id: item.id,
          name: item.name,
          imageUrl: item.image || '',
          quantity: item.quantity,
          price: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(item.price),
          defaultPriceId: item.price_id,
        }),
      )

      setProducts(productList)
    }
  }, [cartDetails])

  async function handleBuyProduct() {
    if (cartCount !== undefined && cartCount > 0) {
      try {
        setIsCreatingCheckoutSession(true)
        const priceIds = products.map((product) => product.defaultPriceId)
        const quantities = products.map((product) => product.quantity)

        const response = await axios.post('/api/checkout', {
          priceIds,
          quantities,
        })

        const { checkoutUrl } = response.data

        clearCart()
        window.location.href = checkoutUrl
      } catch (err) {
        // conectar com uma ferramenta de observabilidade (Datalog / Sentry)

        setIsCreatingCheckoutSession(false)
        alert('Falha ao redirecionar ao checkout!')
      }
    } else {
      alert('Carrinho está vazio!')
    }
  }

  function handleChangeOpenCart() {
    if (openCart) {
      setOpenCart(false)
    } else {
      setOpenCart(true)
    }
  }

  return (
    <>
      <IconContainer onClick={handleChangeOpenCart}>
        {cartCount && cartCount > 0 ? (
          <>
            <Handbag size={24} color="white" weight="bold" />
            <span>{cartCount}</span>
          </>
        ) : (
          <Handbag size={24} color="gray" weight="bold" />
        )}
      </IconContainer>
      {openCart && (
        <CartContainer>
          <X
            size={24}
            color="gray"
            weight="bold"
            onClick={handleChangeOpenCart}
          />
          <h2>Sacola de compras</h2>
          <ItemContainer>
            {products &&
              products.map((product) => (
                <Item key={product.id}>
                  <ImageItem>
                    <Image
                      src={product.imageUrl}
                      width={86.875}
                      height={86.875}
                      alt=""
                    />
                  </ImageItem>
                  <ItemDescription>
                    <p>{product.name}</p>
                    <h3>{product.price}</h3>
                    <button onClick={() => removeItem(product.id)}>
                      Remover
                    </button>
                  </ItemDescription>
                </Item>
              ))}
          </ItemContainer>
          <InfoContainer>
            <Info>
              <p>Quantidade</p>
              {cartCount && cartCount === 1 ? (
                <p>{cartCount} item</p>
              ) : (
                <p>{cartCount} itens</p>
              )}
            </Info>
            <Info>
              <h3>Valor total</h3>
              <h3>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(Math.abs(totalPrice || 0))}
              </h3>
            </Info>
            <button
              disabled={isCreatingCheckoutSession}
              onClick={handleBuyProduct}
            >
              Finalizar compra
            </button>
          </InfoContainer>
        </CartContainer>
      )}
    </>
  )
}
