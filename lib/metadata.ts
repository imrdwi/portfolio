import { createHash } from "node:crypto";
import type { Metadata } from "next";
import { ogSize, ogTemplateVersion } from "@/lib/og-template";
import type { OgCardContent } from "@/lib/og-content";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: string;
  /** The page's /og card. Hashed into the image URL so scrapers refetch when its copy changes. */
  card?: OgCardContent;
};

/**
 * Builds the `og:image` entry for a page's `/og` route handler.
 *
 * The route lives at `<path>/og`, and `?v=` is a short hash of the card's own
 * content. The previous `opengraph-image.tsx` file convention added a hash
 * automatically; route handlers do not, and LinkedIn, Slack and X cache
 * aggressively, so the hash has to be supplied here or edited cards never
 * refresh.
 */
export function ogImage(path: string, card: OgCardContent) {
  const version = createHash("sha1")
    .update(JSON.stringify({ card, template: ogTemplateVersion }))
    .digest("hex")
    .slice(0, 8);
  const base = path === "/" ? "" : path.replace(/\/$/, "");

  return {
    url: `${base}/og?v=${version}`,
    width: ogSize.width,
    height: ogSize.height,
    alt: card.alt,
  };
}

export function createMetadata({ title, description, path, absoluteTitle, card }: PageMetadata): Metadata {
  const socialTitle = absoluteTitle ?? `${title} | Rizki Kurniawan`;
  const images = card ? [ogImage(path, card)] : undefined;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      type: "website",
      url: path,
      siteName: "Rizki Kurniawan",
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      ...(images ? { images } : {}),
    },
  };
}
