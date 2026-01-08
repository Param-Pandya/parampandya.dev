import Link from "next/link";
import Image from "next/image";
import { signatureFont } from "../font";

export default function Header(): React.JSX.Element {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#110720]/80 backdrop-blur-sm border-b border-white/10">
      <nav className="px-6 py-4">
        <div className="container mx-auto max-w-6xl flex items-center justify-between h-full">
          <Link
            href="/"
            className={`text-3xl text-white ${signatureFont.className}`}
          >
            Param Pandya
          {/* <Image src="/logo/logo.svg" alt="Logo" width={10} height={10} style={{ width: "auto", height: "auto" }} /> */}
          </Link>
          <ul className="flex items-center gap-8">
            <li><Link href="#home">Home</Link></li>
            <li><Link href="#about">About</Link></li>
            <li><Link href="#projects">Projects</Link></li>
            <li><Link href="#contact">Contact</Link></li>
          </ul>

        </div>
      </nav>
    </header>
  );
}

