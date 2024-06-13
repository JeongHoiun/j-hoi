import { Box, Link, Typography } from '@mui/material';
import { getPost } from '../posts';
import Markdown from 'react-markdown';

export default function Post({ params }: { params: { postId: number } }) {
  const posts = getPost(params.postId);
  return (
    <Box
      display="flex"
      padding="64px"
      alignContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Typography variant="h4" marginBottom="16px">
        {posts.title}
      </Typography>
      <Box maxWidth="800px">
        <Markdown>{posts.content}</Markdown>
      </Box>
    </Box>
  );
}
