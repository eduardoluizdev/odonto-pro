"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LogIn, Menu } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const session = null;

  const navItems = [
    {
      label: "Profissionais",
      href: "#profissionais",
    },
  ];

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Button
          key={item.href}
          className="bg-transparent hover:bg-transparent text-black shadow-none"
          asChild
          onClick={() => setIsOpen(false)}
        >
          <Link href={item.href} className="text-base">
            {item.label}
          </Link>
        </Button>
      ))}

      {session ? (
        <Link
          href="/dashboard"
          className="flex items-center gap-2 justify-center"
        >
          <LogIn />
          Painel da clínica
        </Link>
      ) : (
        <Button>
          <LogIn />
          Painel da clínica
        </Button>
      )}
    </>
  );

  return (
    <header className="fixed top-0 right-0 left-0 z-[999] py-4 px-6 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-zinc-900">
          Odonto<span className="text-emerald-500">PRO</span>
        </Link>

        <nav className="hidden md:flex space-x-4">
          <NavLinks />
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              size="icon"
              className="text-black hover:bg-transparent"
              variant="ghost"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[240px] sm:w-[320px] z-[9999] p-6"
          >
            <SheetTitle>Menu</SheetTitle>
            {/* <SheetHeader></SheetHeader> */}
            <SheetDescription>Veja nossos links</SheetDescription>

            <nav className="flex flex-col space-y-4 mt-6">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
