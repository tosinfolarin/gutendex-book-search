import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 " 
    style={{ backgroundImage: "url('/images/LibraryBackground.png')" }}
    >
      <Link href="findBooks" className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start text-4xl font-bold my-6 text-blue-300 hover:text-gray-400
">
        Welcome to the Gutendex Book Search
      </Link>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-white">
          Created by Theo Osinfolarin
      </footer>
    </div>
  );
}