import type {Metadata} from 'next';
import './globals.css';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Newton's Collectables | Bury St Edmunds Pokemon Stall",
  description: 'The friendliest Pokemon stall in Bury St Edmunds. Vintage singles, 10p bulk, and graded grails.',
  icons: {
    icon: 'https://i.ibb.co/cSGJN4Cm/IMG-2551.png',
  },
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="icon" href="https://i.ibb.co/cSGJN4Cm/IMG-2551.png" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
