import { X, Handbag } from 'phosphor-react'
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
import { useState } from 'react'
import Image from 'next/image'

import shirt from '../../assets/1.png'

export default function Cart() {
  const [openCart, setOpenCart] = useState<boolean>(false)

  function changeOpenCart() {
    if (openCart) {
      setOpenCart(false)
    } else {
      setOpenCart(true)
    }
  }

  return (
    <>
      <IconContainer onClick={changeOpenCart}>
        <Handbag size={24} color="gray" weight="bold" />
        {/* <Handbag size={24} color="white" weight="bold" />
        <span>5</span> */}
      </IconContainer>
      {openCart && (
        <CartContainer>
          <X size={24} color="gray" weight="bold" onClick={changeOpenCart} />
          <h2>Sacola de compras</h2>
          <ItemContainer>
            <Item>
              <ImageItem>
                <Image src={shirt} alt="" />
              </ImageItem>
              <ItemDescription>
                <p>Camiseta Beyond the Limits</p>
                <h3>R$ 79,90</h3>
                <button>Remover</button>
              </ItemDescription>
            </Item>
            <Item>
              <ImageItem>
                <Image src={shirt} alt="" />
              </ImageItem>
              <ItemDescription>
                <p>Camiseta Beyond the Limits</p>
                <h3>R$ 79,90</h3>
                <button>Remover</button>
              </ItemDescription>
            </Item>
            <Item>
              <ImageItem>
                <Image src={shirt} alt="" />
              </ImageItem>
              <ItemDescription>
                <p>Camiseta Beyond the Limits</p>
                <h3>R$ 79,90</h3>
                <button>Remover</button>
              </ItemDescription>
            </Item>
          </ItemContainer>
          <InfoContainer>
            <Info>
              <p>Quantidade</p>
              <p>3 itens</p>
            </Info>
            <Info>
              <h3>Valor total</h3>
              <h3>R$ 270,00</h3>
            </Info>
            <button>Finalizar compra</button>
          </InfoContainer>
        </CartContainer>
      )}
    </>
  )
}
