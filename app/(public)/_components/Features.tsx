import { Activity, DraftingCompass, Mail, Zap } from "lucide-react";
import Image from "next/image";

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
          <div className="lg:col-span-2">
            <div className="md:pr-6 lg:pr-0">
              <h2 className="text-4xl font-semibold lg:text-5xl">
                Build for Care My Planet Earth
              </h2>
              <p className="mt-6">
                Orrupti aut temporibus assumenda atque ab, accusamus sit,
                molestiae veniam laboriosam pariatur.
              </p>
            </div>
            <ul className="mt-8 divide-y border-y *:flex *:items-center *:gap-3 *:py-3">
              <li>
                <Mail className="size-5" />
                Message and web support
              </li>
              <li>
                <Zap className="size-5" />
                Fast response time
              </li>
              <li>
                <Activity className="size-5" />
                Menitoring and analytics
              </li>
              <li>
                <DraftingCompass className="size-5" />
                Architectural review
              </li>
            </ul>
          </div>
          <div className="border-border/50 relative rounded-3xl border p-3 lg:col-span-3">
            <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
              <Image
                src="https://images.pexels.com/photos/16047143/pexels-photo-16047143.jpeg?_gl=1*11m2k45*_ga*OTc1MTAxNjk1LjE3NTk4MzA1MTY.*_ga_8JE65Q40S6*czE3NjIyNjM2NjUkbzMkZzEkdDE3NjIyNjY5OTEkajU5JGwwJGgw"
                className="hidden rounded-[15px] dark:block"
                alt="planet Earth"
                width={1207}
                height={929}
              />
              <Image
                src="https://images.pexels.com/photos/16047143/pexels-photo-16047143.jpeg?_gl=1*11m2k45*_ga*OTc1MTAxNjk1LjE3NTk4MzA1MTY.*_ga_8JE65Q40S6*czE3NjIyNjM2NjUkbzMkZzEkdDE3NjIyNjY5OTEkajU5JGwwJGgw"
                className="rounded-[15px] shadow dark:hidden"
                alt="planet Earth"
                width={1207}
                height={929}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
