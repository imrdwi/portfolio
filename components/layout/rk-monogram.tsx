import type { SVGProps } from "react";

/**
 * Monogram geometry, shared by the site header and the /og cards.
 *
 * The OG cards are rendered by Satori, which does not process Tailwind classes,
 * so it needs the raw path and dot coordinates rather than this component.
 */
export const monogramViewBox = "0 0 46 28";
export const monogramPath =
  "M3 24V4H11C15.5 4 18 6.25 18 10C18 13.75 15.5 16 11 16H3M11 16L19 24M43 4V24M26 4L43 18M37 13L25 24";
export const monogramDots = [
  { x: 1.5, y: 2.5 },
  { x: 41.5, y: 22.5 },
] as const;

export function RkMonogram({
  className = "h-7 w-[2.875rem]",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox={monogramViewBox}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d={monogramPath}
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {monogramDots.map((dot) => (
        <rect key={`${dot.x}-${dot.y}`} x={dot.x} y={dot.y} width="3" height="3" className="fill-signal" />
      ))}
    </svg>
  );
}
