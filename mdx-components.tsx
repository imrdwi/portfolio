import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { ImageLightbox } from "@/components/shared/image-lightbox";

// MDX images go through next/image and open in a lightbox. MDXRemote ignores
// useMDXComponents, so pass MdxImage in its components map. MDX 3 maps only
// markdown images through `img`; JSX tags must use `<Img>`.
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
