/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
        'passkey-kit', 
        'passkey-factory-sdk', 
        'passkey-kit-sdk',
        'sac-sdk',
    ]
};

module.exports = nextConfig;
