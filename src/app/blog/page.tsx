import { Box, Typography } from '@mui/material';
import { getPosts } from './posts';
import Markdown from 'react-markdown';

export default function Home() {
  const posts = getPosts();
  return (
    <Box display="flex" padding="64px" width="100%" justifyContent="center" flexDirection="column">
      {posts.map((post) => (
        <Box key={post.title} padding="16px" width="100%" minWidth="200px">
          <Typography variant="h2">{post.title}</Typography>
          <Typography variant="body1">{post.summary + '...'}</Typography>
        </Box>
      ))}
    </Box>
  );
}
