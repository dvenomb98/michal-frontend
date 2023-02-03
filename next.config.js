/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
      },
    ],
  },
  env: {
    API_KEY: 'AIzaSyA-8ky6Xh0zRtfyGNNepNHaRs0PuPsJ004',
    AUTH_DOMAIN: 'michal-backend.firebaseapp.com',
    PROJECT_ID: 'michal-backend',
    STORAGE_BUCKET: 'michal-backend.appspot.com',
    MESSAGING_SENDER_ID: '968599058899',
    APP_ID: '1:968599058899:web:81ef5a69b290c67cc39726',
    MEASUREMENT_ID: 'G-TPWNW2RLSL',
  },
};

module.exports = nextConfig;
