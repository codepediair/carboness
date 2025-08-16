import { ThemeToggle } from "@/components/ui/themeToggle";
import Image from "next/image";

export default function Home() {
  return (
   <div className="font-bold text-2xl">
    Hello Carboness
    <ThemeToggle/>
   </div>
  );
}
