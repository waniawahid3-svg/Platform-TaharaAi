/** @type {import('next').NextConfig} */
const nextConfig = {
  // The login runtime is imperative (canvas scene, DOM i18n) and manages its
  // own lifecycle; StrictMode's double-mount in dev would double the scene.
  reactStrictMode: false
};
export default nextConfig;
