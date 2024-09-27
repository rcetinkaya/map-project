import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Map <span className="text-[hsl(280,100%,70%)]">Project</span>
        </h1>
        <div className="flex gap-4">
          <Link href="/add-location">
            <span className="px-4 py-2 bg-purple-600 rounded-lg">Add Location</span>
          </Link>
          <Link href="/locations">
            <span className="px-4 py-2 bg-purple-600 rounded-lg">View Locations</span>
          </Link>
          <Link href="/route">
            <span className="px-4 py-2 bg-purple-600 rounded-lg">Show Route</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
