"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Userdropdown from "./Userdropdown";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Docs", href: "/docs" },
  { name: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const [menuState, setMenuState] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  return (
    <>
      <header>
        <nav
          data-state={menuState && "active"}
          className="fixed z-20 w-full border-b border-dashed bg-white backdrop-blur md:relative dark:bg-zinc-950/50 lg:dark:bg-transparent"
        >
          <div className="m-auto max-w-5xl px-6">
            <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
              <div className="flex w-full justify-between lg:w-auto">
                <Link
                  href="/"
                  aria-label="home"
                  className="flex items-center space-x-2"
                >
                  <Image src={Logo} alt="logo" className="size-6" />
                  <span className="text-lg font-bold">Carboness</span>
                </Link>

                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                  <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>
              </div>

              <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                <div className="lg:pr-4">
                  <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                    {navigationItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-muted-foreground hover:text-accent-foreground block duration-150"
                        >
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  {isPending ? null : session ? (
                    <Userdropdown
                      email={session.user.email}
                      image={session.user.image || ""}
                      name={session.user.name}
                    />
                  ) : (
                    <Link
                      href="/login"
                      className={buttonVariants({ variant: "secondary" })}
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
