import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="site-shell grid min-h-[70svh] place-items-center py-16 text-center">
      <div>
        <h1 className="font-heading text-6xl font-semibold tracking-[-0.04em]">404</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">That page does not exist.</p>
        <Button asChild className="mt-8"><Link href="/work">View the work archive</Link></Button>
      </div>
    </div>
  );
}
