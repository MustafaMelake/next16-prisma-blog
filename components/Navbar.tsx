"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ModeTogggle";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
          router.refresh();
        },
      },
    });
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-8 mx-auto">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold tracking-tight">
            CRUD
          </Link>
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Feed
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          {isPending ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
          ) : session ? (
            <>
              <span className="text-sm font-medium">
                Hello, {session.user.name}
              </span>
              <Link href="/admin">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button variant="destructive" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
