import { OgCard, ogResponse } from "@/lib/og-template";
import { ogCardForProject } from "@/lib/og-content";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = ogCardForProject(slug);
  if (!card) return new Response("Not found", { status: 404 });

  return ogResponse(<OgCard {...card} />);
}
