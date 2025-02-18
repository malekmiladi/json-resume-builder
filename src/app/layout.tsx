import localFont from "next/font/local";
import "./globals.css";
import { Metadata } from "next";

const shareTech = localFont({
  src: "../../public/fonts/share-tech/share-tech.ttf"
});

const shareTechMono = localFont({
  src: "../../public/fonts/share-tech/share-tech-mono.ttf"
});

export const metadata: Metadata = {
  title: "JSON Resume Builder",
  description: "A client-side React resume builder. Create resumes via an intuitive UI or by importing a JSON fle with a well-defined schema. Export as PDF\n" +
    "or JSON. No fees—save multiple resumes by exporting and importing JSON files anytime. Te only catch? Organize your JSON files with\n" +
    "meaningful names—a small trade-off for complete control over your resumes.\n",
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${shareTech.className} antialiased`}>{children}</body>
    </html>
  );
}
