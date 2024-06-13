'use client';
import { ITEMS_PER_PAGE } from '@/common/const';
import { Post } from '@/models/post';
import { Box, Link, Pagination, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    getData({ page: 1 }).then((data) => {
      setPosts(data.posts);
    });
  }, []);

  return (
    <Box display="flex" padding="64px" width="100%" justifyContent="center" flexDirection="column">
      {posts.map((post) => (
        <Box key={post.title} padding="16px" width="100%" minWidth="200px">
          <Typography variant="h4" marginBottom="16px">
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

async function getData(request: { page: number }) {
  const res = await fetch(`/api/posts?page=${request.page}`, {
    method: 'GET'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
