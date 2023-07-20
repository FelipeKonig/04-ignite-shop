import { styled } from '..'

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    marginTop: '4rem',
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$green500',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
    },
  },
})

export const ImageBox = styled('div', {
  display: 'flex',
})

export const ImageContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',
  maxWidth: 140,
  height: 140,
  padding: '0.25rem',

  borderRadius: '1000px',
  background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
  'box-shadow': '0px 0px 60px 0px rgba(0, 0, 0, 0.80)',

  img: {
    objectFit: 'cover',
  },

  '& + &': {
    marginLeft: '-2.5rem',
  },
})
