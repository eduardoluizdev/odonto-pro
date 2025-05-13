"use client";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import clsx from "clsx";
import {
  Banknote,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Folder,
  List,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logoImg from "../../../../../public/logo-odonto.png";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  pathname: string;
  isCollapsed: boolean;
}

function SidebarLink({
  href,
  icon,
  label,
  pathname,
  isCollapsed,
}: SidebarLinkProps) {
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <div
        className={clsx(
          "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
          {
            "bg-blue-500 text-white": isActive,
            "text-gray-700 hover:bg-gray-100": !isActive,
          }
        )}
      >
        <span className="w-6 h-6">{icon}</span>
        {!isCollapsed && <span>{label}</span>}
      </div>
    </Link>
  );
}

const NAV_ITEMS = [
  {
    href: "/dashboard",
    icon: <CalendarCheck className="w-6 h-6" />,
    label: "Agendamentos",
  },
  {
    href: "/dashboard/services",
    icon: <Folder className="w-6 h-6" />,
    label: "Serviços",
  },
  {
    href: "/dashboard/profile",
    icon: <Settings className="w-6 h-6" />,
    label: "Perfil",
  },
  {
    href: "/dashboard/plans",
    icon: <Banknote className="w-6 h-6" />,
    label: "Planos",
  },
];

export function SidebarDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const renderNavLinks = () =>
    NAV_ITEMS.map((item) => (
      <SidebarLink
        key={item.href}
        href={item.href}
        icon={item.icon}
        label={item.label}
        pathname={pathname}
        isCollapsed={isCollapsed}
      />
    ));

  return (
    <div className="flex min-h-screen w-full">
      <aside
        className={clsx(
          "flex flex-col border-r bg-background transition-all duration-300 p-4 h-full",
          {
            "w-20": isCollapsed,
            "w-64": !isCollapsed,
            "hidden md:flex md:fixed": true,
          }
        )}
      >
        <div className="mb-6 mt-4 min-h-[61px]">
          {!isCollapsed && (
            <Image src={logoImg} alt="Logo" priority quality={100} />
          )}
        </div>

        <Button
          className="bg-gray-100 hover:bg-gray-50 text-zinc-900 self-end mb-2"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="w-12 h-12" />
          ) : (
            <ChevronLeft className="w-12 h-12" />
          )}
        </Button>

        {isCollapsed && (
          <nav className="flex flex-col gap-1 overflow-hidden mt-2 min-h-[228px]">
            {renderNavLinks()}
          </nav>
        )}

        <Collapsible open={!isCollapsed} onOpenChange={setIsCollapsed}>
          <CollapsibleContent>
            <nav className="flex flex-col gap-1 overflow-hidden">
              <span className="text-sm text-gray-400 font-medium mt-1 uppercase">
                Painel
              </span>

              {NAV_ITEMS.slice(0, 2).map((item) => (
                <SidebarLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
              ))}

              <span className="text-sm text-gray-400 font-medium mt-1 uppercase">
                Configurações
              </span>

              {NAV_ITEMS.slice(2).map((item) => (
                <SidebarLink
                  key={item.href}
                  icon={item.icon}
                  href={item.href}
                  label={item.label}
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
              ))}
            </nav>
          </CollapsibleContent>
        </Collapsible>
      </aside>

      <div
        className={clsx("flex flex-1 flex-col transition-all duration-300", {
          "md:ml-20": isCollapsed,
          "md:ml-64": !isCollapsed,
        })}
      >
        <header className="md:hidden flex items-center justify-between border-b px-4 md:px-6 h-14 z-10 sticky top-0 bg-white">
          <Sheet>
            <div className="flex items-center gap-4">
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="md:hidden"
                  onClick={() => setIsCollapsed(false)}
                >
                  <List className="w-5 h-5" />
                </Button>
              </SheetTrigger>

              <h1 className="text-base md:text-lg font-semibold">
                Menu OdontoPRO
              </h1>
            </div>

            <SheetContent side="right" className="text-black sm:max-w-xs p-6">
              <SheetTitle>OdontoPRO</SheetTitle>
              <SheetDescription>Menu administrativo</SheetDescription>

              <nav className="grid gap-2 text-base pt-5">
                {renderNavLinks()}
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 py-4 px-2 md:p-6">{children}</main>
      </div>
    </div>
  );
}
