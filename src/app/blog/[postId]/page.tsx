'use client';

import { Post } from '@/models/post';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';

async function getData(request: { id: number }) {
  const res = await fetch(`/api/post?id=${request.id}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default function BlogPost({ params }: { params: { postId: number } }) {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    getData({ id: params.postId }).then((data) => {
      setPost(data.post);
    });
  }, [params.postId]);

  return (
    <Box
      display="flex"
      padding="64px"
      alignContent="center"
      flexDirection="column"
      alignItems="center"
    >
      {post ? (
        <>
          <Typography variant="h4" marginBottom="16px">
            {post.title}
          </Typography>
          <Box maxWidth="800px">
            <Markdown>{post.content}</Markdown>
          </Box>
        </>
      ) : (
        <Typography variant="h4">Loading...</Typography>
      )}
    </Box>
  );
}
