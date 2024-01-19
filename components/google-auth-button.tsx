"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { Icons } from "./icons";

export default function GoogleSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() =>
        signIn("google", { callbackUrl: callbackUrl ?? "/dashboard" })
      }
    >
      <Icons.google className="h-4 w-4 mx-4" />
      <p className="mx-1">Continue with Google</p>
    </Button>
  );
}
