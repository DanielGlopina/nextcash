import Image from "next/image";
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import { ChartColumnBigIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Home() {
  return <main className="min-h-[400px] h-[calc(100vh-80px)] flex items-center justify-center bg-white relative">
    <Image alt="Cover Image" src="/cover.webp" fill className="object-cover opacity-50" />
    <div className="relarive z-10 text-center flex flex-col gap-4">
      <h1 className="text-5xl font-bold flex gap-1 items-center justify-center">
        <ChartColumnBigIcon className="text-lime-500" size={60} /> NextCash
      </h1>
      <p className="text-2xl">
        Track your finances with ease
      </p>
      <Show when="signed-in">
        <Button asChild size="lg">
          <Link href="/dashboard">
            Go To Your Dashboard
          </Link>
        </Button>
      </Show>
      <Show when="signed-out">
        <div className="flex gap-2 items-center justify-center">
          <Button asChild size="lg" className="bg-lime-600 hover:bg-lime-500">
            <SignInButton />
          </Button>
          <Button asChild size="lg">
            <SignUpButton />
          </Button>
        </div>
      </Show>
    </div>
  </main>;
}

export default Home;