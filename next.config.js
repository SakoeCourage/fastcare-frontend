/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: '/portal/:path*',
            }
        ]
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/dashboard',
                permanent: true
            },
            {
                source: '/login',
                destination: '/user/login',
                permanent: true
            },
        ]
    },
}

module.exports = nextConfig
