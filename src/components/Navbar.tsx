"use client";

import { LogoFull } from "./Logo";

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-100/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <LogoFull />
        <div className="hidden items-center gap-6 sm:flex">
          <span className="text-sm text-[#64748b]">Gratis voor kleine VvE&apos;s</span>
        </div>
      </div>
    </nav>
  );
}
