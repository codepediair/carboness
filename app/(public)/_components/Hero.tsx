import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <main className="overflow-hidden">
      <section>
        <div className="relative pt-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl text-center sm:mx-auto lg:mr-auto lg:mt-0 lg:w-4/5">
              <Link
                href="/"
                className="rounded-(--radius) mx-auto flex w-fit items-center gap-2 border p-1 pr-3"
              >
                <span className="bg-muted rounded-[calc(var(--radius)-0.25rem)] px-2 py-1 text-xs">
                  New
                </span>
                <span className="text-sm">Chat with AI and Ask Anything</span>
                <span className="bg-(--color-border) block h-4 w-px"></span>

                <ArrowRight className="size-4" />
              </Link>

              <h1 className="mt-8 text-balance text-4xl font-semibold md:text-5xl xl:text-6xl xl:[line-height:1.125]">
                Modern Software for Carbon Footprinting
              </h1>
              <p className="mx-auto mt-8 hidden max-w-2xl text-wrap text-lg sm:block">
                carbon tracking and reporting tools to help you reduce your
                carborn footprintin
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-wrap sm:hidden">
                Highly customizable components for building modern footprint
                monitoring and all systems, with your personal spark.
              </p>

              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="#">
                    <Rocket className="relative size-4" />
                    <span className="text-nowrap">Start Monitoring</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mask-b-from-55% relative mx-auto mt-16 max-w-6xl overflow-hidden px-4">
            <Image
              className="z-2 border-border/25 relative hidden rounded-2xl border dark:block"
              src="https://images.pexels.com/photos/1487834/pexels-photo-1487834.jpeg?_gl=1*x3nvou*_ga*OTc1MTAxNjk1LjE3NTk4MzA1MTY.*_ga_8JE65Q40S6*czE3NjIyNjM2NjUkbzMkZzEkdDE3NjIyNjM4NzAkajU5JGwwJGgw"
              alt="app screen"
              width={2796}
              height={2008}
            />
            <Image
              className="z-2 border-border/25 relative rounded-2xl border dark:hidden"
              src="https://images.pexels.com/photos/305821/pexels-photo-305821.jpeg?_gl=1*87sdrq*_ga*OTc1MTAxNjk1LjE3NTk4MzA1MTY.*_ga_8JE65Q40S6*czE3NjIyNjM2NjUkbzMkZzEkdDE3NjIyNjM2OTckajI4JGwwJGgw"
              alt="app screen"
              width={2796}
              height={2008}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
