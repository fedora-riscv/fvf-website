import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const archivo = localFont({
  src: "./fonts/ArchivoItalic-VF.woff2",
  variable: "--font-archivo",
  weight: "800 900",
  style: "italic",
  declarations: [{ prop: "font-stretch", value: "100% 125%" }],
});
const redHatText = localFont({
  src: [
    { path: "./fonts/RedHatText-VF.woff2", style: "normal" },
    { path: "./fonts/RedHatText-Italic-VF.woff2", style: "italic" },
  ],
  variable: "--font-rh-text",
  weight: "400 600",
});
const redHatMono = localFont({
  src: "./fonts/RedHatMono-VF.woff2",
  variable: "--font-rh-mono",
  weight: "400 600",
});

export const metadata: Metadata = {
  title: "Fedora-V Force",
  description: "Fedora-V Force (多啦V盟) ports and builds the Fedora distribution, the Linux kernel and firmware for RISC-V.",
};

export const viewport: Viewport = {
  themeColor: "#070D22",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${redHatText.variable} ${redHatMono.variable}`} suppressHydrationWarning>
      <head>
        {/* lets CSS hide scroll-reveal blocks only when JS will reveal them again;
            if the app never boots (a chunk fails to load), show everything after 4s */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__fvfReveal)document.documentElement.classList.remove('js')},4000)" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
