/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['files.stripe.com'],
  },
  publicRuntimeConfig: {
    NEXT_URL: process.env.NEXT_URL,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  },
}

module.exports = nextConfig
