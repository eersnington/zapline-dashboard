import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZaplineAI - Welcome",
  description: "Get started in a few clicks.",
};

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main>{children}</main>
      </div>
    </>
  );
}
