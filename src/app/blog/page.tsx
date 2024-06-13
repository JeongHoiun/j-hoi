import { Box, Link, Typography } from '@mui/material';
import { getPosts } from './posts';
import Markdown from 'react-markdown';

export default function Home() {
  const posts = getPosts();
  return (
    <Box display="flex" padding="64px" width="100%" justifyContent="center" flexDirection="column">
      {posts.map((post) => (
        <Box key={post.title} padding="16px" width="100%" minWidth="200px">
          <Typography variant="h3">
            <Link href={`/blog/${post.id}`} sx={{ textDecoration: 'inherit', color: 'inherit' }}>
              {post.title}
            </Link>
          </Typography>
          <Typography variant="body1">
            <Link href={`/blog/${post.id}`} sx={{ textDecoration: 'inherit', color: 'inherit' }}>
              {post.summary + '...'}
            </Link>
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
