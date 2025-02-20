// next.config.mjs


/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        turboMode: false // ✅ Desactiva el Fast Refresh si sigue causando problemas
    }
};


export default nextConfig;
