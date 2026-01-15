
"use client";

import Link from "next/link";
import { CartSheet } from "./cart-sheet";

const Logo = () => (
  <svg
    className="h-8 w-8 text-primary-foreground"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="hsla(var(--primary), 0.2)"
    />
    <path
      d="M2 7L12 12L22 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22V12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 4.5L16 9L12 12L8 9L6.5 4.5"
      stroke="hsl(var(--primary-foreground))"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


export function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/60"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
            <span className="font-bold font-headline text-primary-foreground">
              Doorstep Desserts
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
             <Link
              href="/cake-customizer"
              className="text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              Cake Customizer
            </Link>
          </nav>
        </div>

        <div className="flex items-center">
            <CartSheet />
        </div>
      </div>
    </header>
  );
}
