import localFont from 'next/font/local';
import Providers from './providers';
import './globals.css';
import { Header } from '@/shared/components/Header';

const iranSans = localFont({
  src: [
    {
      path: "../assets/fonts/IRANSansX-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/IRANSansX-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/IRANSansWeb_Black.woff",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-iransans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={iranSans.variable}>
      <body suppressHydrationWarning className="relative">
        <Providers>
          <Header />
          {children}</Providers>
      </body>
    </html>
  );
}
