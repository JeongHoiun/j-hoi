import { Box } from '@mui/material';
import Image from 'next/image';

export default function Home() {
  return (
    <Box textAlign="center" marginTop="16px" width="100%">
      <Image src="/thumbnail.png" alt="Thumbnail" width={820} height={820} />
    </Box>
  );
}
