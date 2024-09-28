import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Map <span className="text-[hsl(280,100%,70%)]">Project</span>
        </h1>
        <div className="flex flex-col gap-4">
        <span className="px-4 py-2 bg-purple-600 rounded-lg">
        •	Uygulamamda konum ekleme, konum listeleme, konumları düzenleme, konumları harita üstünde gösterilmesi ile rota çizgilerinin oluşması konuları ele alınmıştır.
        </span>
        <span className="px-4 py-2 bg-purple-600 rounded-lg">
        •	Menu üzerinden ilerleyebilirsiniz.
        </span>
        </div>
      </div>
    </main>
  );
}
