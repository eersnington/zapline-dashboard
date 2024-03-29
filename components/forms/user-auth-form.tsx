"use client";
import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";


export default function UserAuthForm() {
  return (
    <>
      <LoginLink>
        <Button className="ml-auto w-full">Sign In</Button>
      </LoginLink>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            New to ZaplineAI?
          </span>
        </div>
      </div>
      <RegisterLink>
        <Button className="ml-auto w-full">Sign Up</Button>
      </RegisterLink>
    </>
  );
}
