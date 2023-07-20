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
