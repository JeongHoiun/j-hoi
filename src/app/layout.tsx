import { BORDER_COLOR } from '@/common/color';
import { Box, Link } from '@mui/material';
import type { Metadata } from 'next';
import './style.css';

export const metadata: Metadata = {
  title: 'HOI!',
  description: 'Hoi self-hosting page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          height: '100vh',
          margin: 0,
          padding: 0,
          fontFamily: 'sans-serif',
        }}
      >
        <Box>
          <Box
            display="flex"
            flexDirection="row"
            height={92}
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
