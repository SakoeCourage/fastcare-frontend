/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [

        ]
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/portal/dashboard',
                permanent: true
            },
            {
                source: '/portal',
                destination: '/portal/dashboard',
                permanent: true
            }
        ]
    },
}

module.exports = nextConfig
