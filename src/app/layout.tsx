
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { CartProvider } from "@/context/cart-context";

export const metadata: Metadata = {
  title: "Doorstep Desserts",
  description: "Simple dessert catalog for a school project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <CartProvider>
          <div className="flex flex-col min-h-dvh">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
