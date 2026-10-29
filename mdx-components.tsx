import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { ImageLightbox } from "@/components/shared/image-lightbox";

// MDX images are local /public assets with explicit dimensions.
// Route through next/image for automatic responsive sizing, WebP,
// and lazy loading (default), and open it full size in a lightbox on click.
// Keep alt required for a11y.
// Case studies render through MDXRemote, which ignores this file's
// useMDXComponents — pass MdxImage in its components map. MDX 3 only maps
// markdown images through `img`; tags written as JSX must use `<Img>`.
export function MdxImage(props: ComponentProps<"img">) {
  const { src, alt, width, height, ...rest } = props;
  if (typeof src === "string" && width && height) {
    return (
      <ImageLightbox src={src} alt={alt ?? ""} width={Number(width)} height={Number(height)}>
        <Image
          src={src}
          alt={alt ?? ""}
          width={Number(width)}
          height={Number(height)}
          sizes="(max-width: 768px) 100vw, 768px"
          style={{ width: "100%", height: "auto" }}
          {...rest}
        />
      </ImageLightbox>
    );
  }
  // Fallback for images without dimensions (e.g. external).
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} decoding="async" {...rest} />;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Img: MdxImage,
    img: MdxImage,
    ...components,
  };
}
