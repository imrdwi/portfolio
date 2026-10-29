import { OgCard, ogResponse } from "@/lib/og-template";
import { ogCards } from "@/lib/og-content";

export const dynamic = "force-static";

export function GET() {
  return ogResponse(<OgCard {...ogCards.resume()} />);
}
