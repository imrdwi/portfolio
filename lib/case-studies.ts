import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { projects, getProjectBySlug, type Project } from "@/data/projects";

const contentDirectory = path.join(process.cwd(), "content", "work");

export interface CaseStudy {
  slug: string;
  project: Project;
  content: string;
}

export const getCaseStudyBySlug = cache((slug: string): CaseStudy | undefined => {
  const project = getProjectBySlug(slug);
  if (!project) return undefined;

  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { content } = matter(fileContent);
    return { slug, project, content };
  } catch {
    return undefined;
  }
});

export function getAllCaseStudies(): CaseStudy[] {
  return projects.flatMap((project) => {
    const study = getCaseStudyBySlug(project.slug);
    return study ? [study] : [];
  });
}
