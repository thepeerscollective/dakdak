/** @type {import('next').NextConfig} */
const base = process.env.NEXT_PUBLIC_BASE ?? '/dakdak';
const nextConfig = {
  output: 'export',
  basePath: base,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE: base },
};
export default nextConfig;
