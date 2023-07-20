import { styled } from '..'

export const IconContainer = styled('button', {
  display: 'flex',
  alignItems: 'center',

  border: '0',
  background: '$gray800',
  padding: '0.75rem',
  borderRadius: 6,
  cursor: 'pointer',

  span: {
    position: 'absolute',
    marginLeft: 16,
    marginTop: -50,
    borderRadius: 1000,
    border: '3px solid var(--grayscale-background, #121214)',
    background: 'var(--brand-principal, #00875F)',
    width: 28,
    padding: 2,
    color: '$white',
    textAlign: 'center',
    fontSize: '0.875rem',

    cursor: 'initial',
  },
})

export const CartContainer = styled('main', {
  display: 'block',

  position: 'fixed',
  height: '100vh',
  width: '30rem',
  padding: '2rem',
  float: 'right',
  background: '$gray800',
  right: 0,
  top: 0,
  'z-index': 9999,
  transition: 'transform 0.3s ease',

  svg: {
    float: 'right',
    cursor: 'pointer',
  },

  h2: {
    marginTop: '4rem',
    clear: 'both',
  },
})

export const ItemContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1.5rem',

  'overflow-x': 'auto',
  marginTop: '3rem',
  maxHeight: 436,
})

export const Item = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem',
  alignSelf: 'stretch',
})

export const ImageItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',
  borderRadius: 8,
  padding: '0.25rem',
  maxWidth: '5.93rem',
  height: '5.93rem',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',

  img: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
})

export const ItemDescription = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.5rem',
  flex: '1 0 0',

  button: {
    display: 'block',
    paddingTop: 15,

    color: '$green500',
    background: 'transparent',
    border: 0,
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',

    '&:hover': {
      color: '$green300',
    },
  },
})

export const InfoContainer = styled('div', {
  position: 'absolute',
  bottom: '3rem',
  width: '80%',

  button: {
    width: '100%',
    marginTop: '3rem',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',
    fontFamily: '__Roboto_b4911f',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },
  },
})

export const Info = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '1rem',
})
