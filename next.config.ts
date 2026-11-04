import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "100.69.69.212", "portfolio.ortu.dev"],
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    mdxRs: true,
  },
  async headers() {
    return [
      {
        source: "/resume.pdf",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        // No CSP yet: Next's inline scripts and next-themes need nonces or
        // 'unsafe-inline', so it needs a production test of its own.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
