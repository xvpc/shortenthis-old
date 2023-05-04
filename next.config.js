// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   experimental: { runtime: 'edge'}
// }

// module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = { 
  experimental: { runtime: 'edge' },  
  reactStrictMode: true,  
  swcMinify: true,
}
module.exports = nextConfig
