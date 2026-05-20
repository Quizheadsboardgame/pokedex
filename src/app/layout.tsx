
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Newton's Rarefinds | Bury St Edmunds Pokemon Stall",
  description: 'Bury St Edmunds most friendly Pokemon market stall. Vintage, Modern, and Rare singles.',
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
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
