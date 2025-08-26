import {NextConfig} from "next";

const NEXT_PUBLIC_API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'localhost';
const NEXT_PUBLIC_API_PORT = process.env.NEXT_PUBLIC_API_PORT || '8000';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: NEXT_PUBLIC_API_HOST,
                port: NEXT_PUBLIC_API_PORT,
                pathname: '/image/**',
            },
        ],
    },
};

export default nextConfig;
