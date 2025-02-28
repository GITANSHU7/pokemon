
"use client";

import Link from "next/link";
import { Navbar } from "flowbite-react";
import { useRouter } from "next/navigation";

export function AppNavBar() {
    const router = useRouter();
  return (
    <Navbar fluid rounded className="bg-slate-900">
      <Navbar.Brand >
        {/* <img src="https://www.pngall.com/wp-content/uploads/13/Pokemon-Logo-PNG-File.png" className="mr-3 w-auto sm:h-[70px] xs" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white cursor-pointer"  onClick={() => router.push(`/`)} >Pokemon Hunter</span>
      </Navbar.Brand>
      
    </Navbar>
  );
}
