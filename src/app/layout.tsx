import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HOI!',
  description: 'Hoi self-hosting page'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
