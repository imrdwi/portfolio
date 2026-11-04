import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="site-shell grid min-h-[70svh] place-items-center py-16 text-center">
      <div>
        <h1 className="font-heading text-6xl font-semibold tracking-[-0.04em]">404</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">That page does not exist.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild><Link href="/work">View the work archive</Link></Button>
          <Button asChild variant="outline"><Link href="/resume">Resume</Link></Button>
          <Button asChild variant="outline"><Link href="/contact">Contact</Link></Button>
        </div>
      </div>
    </div>
  );
}
