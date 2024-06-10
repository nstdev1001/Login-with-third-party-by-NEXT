"use client";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 pb-10">
        <div className="text-center">
          <ModeToggle />

          <h1 className="text-hero mt-10 xs:text-xl sm:text-3xl md:text-5xl lg:text-6xl">
            Login with third-party <p>by NextAuth.js</p>
          </h1>
          <div className="xs:mt-5 md:mt-10">
            <Link href="/login">
              <Button
                variant={"outline"}
                size={"lg"}
                className="xs:text-xs md:text-lg"
              >
                Go to LOGIN
              </Button>
            </Link>
          </div>
        </div>

        <footer>
          <p className="text-center relative text-sm opacity-30">
            Power by Nguyen Son Tung
          </p>
        </footer>
      </main>
    </Fragment>
  );
}
