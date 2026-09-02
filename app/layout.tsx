import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Стенгазета 2.0 — первая продажа',
  description: 'Рабочая воронка Pike Media Lab: небольшие компании, тёплые сигналы и две встречи до пилота.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  openGraph: {
    title: 'Стенгазета 2.0 — первая продажа',
    description: 'Небольшие компании, события покупки, тёплые каналы и фиксированная цена пилота.',
    images: [{ url: '/og.png', width: 1730, height: 909, alt: 'Стенгазета 2.0 — первая продажа' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Стенгазета 2.0 — первая продажа',
    description: 'Небольшие компании, тёплые сигналы и две встречи до пилота.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
