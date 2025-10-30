"use client";

import Link from "next/link";

export default function Homepage() {
  return (
    <div
      className="
        font-sans 
        grid grid-rows-[20px_1fr_20px] 
        items-center justify-items-center 
        min-h-screen 
        p-6 sm:p-12 md:p-16 lg:p-20 
        gap-10 sm:gap-16
        bg-cover bg-center bg-no-repeat
        text-center
      "
      style={{ backgroundImage: "url('/images/LibraryBackground.png')" }}
    >
      <Link
        href="/bookResults"
        role="linkToBookSearch"
        className="
          flex flex-col gap-8 
          row-start-2 
          items-center sm:items-start 
          text-3xl sm:text-4xl md:text-5xl 
          font-bold my-6
        "
      >
        <div
          className="
            bg-white text-black 
            px-4 py-3 sm:px-6 sm:py-4 
            border border-black rounded-md 
            shadow-md 
            transition-transform transition-colors duration-300
            hover:bg-gray-200 hover:scale-105
            cursor-pointer 
            w-full sm:w-max
          "
        >
          Welcome to the Gutendex Book Search
        </div>
      </Link>

      <footer
        className="
          row-start-3 
          flex flex-col sm:flex-row 
          gap-3 sm:gap-6 
          flex-wrap items-center justify-center 
          text-white text-sm sm:text-base
          mt-6 sm:mt-0
        "
      >
        <p>Created by Theo Osinfolarin</p>
      </footer>
    </div>
  );
}
