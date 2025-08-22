import type { Metadata } from "next";
import { Toaster } from 'sonner'
import { Geist, Geist_Mono } from "next/font/google";
import { Web3Provider } from "./Web3Provider"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "getAccess!    Swift Event Tickeing and Management",
  description: "Swift Event Tickeing and Management for Web3/Blockchain Events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Web3Provider>
        {children}
        <Toaster toastOptions={{
           style: {
             background: 'white',
             border: '1px solid #e5e7eb',
             color: '#111827',
           },
           classNames: {
             error: 'border-red-500 bg-red-50 text-red-800',
             success: 'border-green-500 bg-green-50 text-green-800',
             warning: 'border-yellow-500 bg-yellow-50 text-yellow-800',
             info: 'border-blue-500 bg-blue-50 text-blue-800',
           },
         }}/>
        </Web3Provider>        
      </body>
    </html>
  );
}
