/** @type {import('next').NextConfig} */
const nextConfig = {
    /**
     * Enable static exports for the App Router.
     *
     * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
     */
    output: "export",
  
    /**
     * Set base path. This is the slug of your GitHub repository.
     *
     * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
     */
    basePath: "",
  
    /**
     * Disable server-based image optimization. Next.js does not support
     * dynamic features with static exports.
     *
     * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
     */
    images: {
      unoptimized: true,
    },

    /**
     * Emit /zh/index.html rather than /zh.html, so GitHub Pages serves both
     * /zh and /zh/ (it redirects the former to the latter).
     */
    trailingSlash: true,

    /**
     * Each locale is its own root layout, so there is no shared layout for the
     * 404 page to inherit; src/app/global-not-found.tsx provides one.
     */
    experimental: {
      globalNotFound: true,
    },
  };
  

export default nextConfig;
