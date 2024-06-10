/* eslint-disable @next/next/no-img-element */

"use client";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ModeToggle } from "@/components/mode-toggle";

const UserPage = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (session && session.user) {
        // Simulate an async fetch operation
        try {
          setLoading(true);
        } catch (error) {
          console.error("Failed to fetch additional data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [session]);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  console.log("provider: ", session?.user.provider);

  if (status === "loading" || loading) {
    return (
      <>
        <main className="flex min-h-screen flex-col items-center p-24 mt-40">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </main>
      </>
    );
  }

  if (session && session.user) {
    return (
      <main className="flex min-h-screen flex-col items-center xs:p-10 sm:p-15 md:p-24">
        <div className="">
          <ModeToggle />
        </div>
        <div className=""></div>
        <h1 className="text-hero mt-10  xs:text-xl sm:text-3xl md:text-4xl">
          Welcome
        </h1>
        <p className="text-hero xs:mt-2 md:mt-10 xs:text-2xl sm:text-4xl md:text-5xl lg:text-7xl md:h-20 lg:h-20">
          {session.user.name}
        </p>
        <p className="text-hero xs:mt-2 xs:text-xs sm:text-1xl md:text-2xl">
          {session.user.email}
        </p>
        <div className="xs:mt-5 md:mt-10">
          <img
            className="rounded-full xs:w-10 md:w-20"
            src={
              session.user.image ??
              "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            }
            alt="user's avatar"
          />
        </div>
        <div className="xs:mt-5 md:mt-10">
          <p className="xs:text-xs sm:text-sm md:text-1xl">
            {session.user.provider === "google"
              ? "Logged in by Google account"
              : "Logged in by Facebook account"}
          </p>
        </div>
        <div className="mt-20">
          <Link href="/login">
            <Button variant={"secondary"} size={"lg"} onClick={handleSignOut}>
              Log out
            </Button>
          </Link>
        </div>
      </main>
    );
  }
};

export default UserPage;
