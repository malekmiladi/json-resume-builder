import localFont from "next/font/local";
import "./globals.css";

const shareTech = localFont({
  src: "../../public/fonts/share-tech/share-tech.ttf"
});

const shareTechMono = localFont({
  src: "../../public/fonts/share-tech/share-tech-mono.ttf"
});

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
