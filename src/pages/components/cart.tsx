import { Handbag } from 'phosphor-react'
import { IconContainer } from '@/styles/pages/cart'

export default function Cart() {
  return (
    <>
      <IconContainer>
        <Handbag size={24} color="gray" weight="bold" />
        {/* <Handbag size={24} color="white" weight="bold" />
        <span>5</span> */}
      </IconContainer>
    </>
  )
}
