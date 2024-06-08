import { BORDER_COLOR } from '@/common/color';
import { Box, Button, Link } from '@mui/material';
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
      <body
        style={{
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: 0,
          fontFamily: 'sans-serif'
        }}
      >
        <Box>
          <Box
            display="flex"
            flexDirection="row"
            height={92}
            width="100vw"
            alignItems="center"
            justifyContent="center"
            gap={32}
            borderBottom={`1px solid ${BORDER_COLOR}`}
          >
            <Link sx={{ textDecoration: 'None' }} href="/">
              Home
            </Link>
            <Link sx={{ textDecoration: 'None' }} href="/blog">
              Blog
            </Link>
            <Link sx={{ textDecoration: 'None' }} href="/profile">
              Profile
            </Link>
          </Box>
          {children}
        </Box>
      </body>
    </html>
  );
}
