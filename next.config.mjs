/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static optimization for dynamic routes
  // i18n is handled by middleware and App Router
  output: undefined, // Remove standalone output
};

export default nextConfig;
