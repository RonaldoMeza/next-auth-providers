import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import { auth } from "@/auth";
import Image from "next/image";
import Provider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Auth App",
  description: "My Next Auth App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log(session);
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <nav className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
          <div className="mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-white tracking-tight">
              MyAuthApp
            </Link>
            <ul className="flex items-center justify-center gap-6 text-sm">
              <li>
                <Link href="/dashboard" className="text-blue-100 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              {session?.user && (
                <li>
                  <Link href="/profile" className="text-blue-100 hover:text-white transition-colors">
                    Profile
                  </Link>
                </li>
              )}
              {session?.user && (
                <li>
                  <LogoutButton />
                </li>
              )}
              {session?.user?.image && (
                <li>
                  <Image
                    height={100}
                    width={100}
                    src={session?.user?.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                </li>
              )}
            </ul>
          </div>
        </nav>
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
