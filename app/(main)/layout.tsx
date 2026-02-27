'use client';

import { LinkIcon } from "lucide-react";
import Link from "next/link";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <header className="header">
        <div className="container mx-auto flex h-14 items-center justify-center gap-4 px-4">
            <Link href="/first" className="btn-link">
                <span className="font-bold text-lg">
                    First task
                </span>
                <LinkIcon className="w-4 h-4 pl-4" />
            </Link>
            <Link href="/second" className="btn-link">
                <span className="font-bold text-lg">
                    Second task
                </span>
                <LinkIcon className="w-4 h-4 pl-4" />
            </Link>
            <Link href="/third" className="btn-link">
                <span className="font-bold text-lg">
                    Third task
                </span>
                <LinkIcon className="w-4 h-4 pl-4" />
            </Link>
            <Link href="/bonus" className="btn-link ">
                <span className="font-bold text-lg">
                    Bonus
                </span>
                <LinkIcon className="w-4 h-4 pl-4" />
            </Link>
        </div>
      </header>
      {children}
    </>
  );
}
