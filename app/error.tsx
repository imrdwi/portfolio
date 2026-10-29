"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="site-shell grid min-h-[70svh] place-items-center py-16 text-center">
      <div>
        <p className="technical-label text-destructive">Something went wrong</p>
        <h1 className="mt-4 font-heading text-5xl font-semibold">This page could not load.</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">Try again. If the problem continues, return to the work archive or email me from the footer.</p>
        <Button className="mt-8" onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
