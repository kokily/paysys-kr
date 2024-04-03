import localFont from 'next/font/local';
import SessionWrapper from '@/wrapper/SessionWrapper';
import { PageTemplate } from '@/components/common/PageTemplate';

const nanoSans = localFont({
  src: '../../../public/fonts/NotoSansKR-Regular.ttf',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={nanoSans.className}>
        <SessionWrapper>
          <PageTemplate>{children}</PageTemplate>
        </SessionWrapper>
      </body>
    </html>
  );
}
