'use client';

import { ITEMS_PER_PAGE } from '@/common/const';
import { Post } from '@/models/post';
import { Box, Link, Pagination, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

async function getData(request: { page: number }) {
  const res = await fetch(`/api/posts?page=${request.page}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [length, setLength] = useState(0);

  useEffect(() => {
    setLoading(true);
    getData({ page }).then((data) => {
      setPosts(data.responsePostList.posts);
      setLength(data.responsePostList.total);
      setLoading(false);
    });
  }, [page]);

  return (
    <Box display="flex" padding="64px" width="100%" justifyContent="center" flexDirection="column">
      {posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <Box key={post.title} padding="16px" width="100%" minWidth="200px">
              <Typography variant="h4" marginBottom="16px">
                <Link
                  href={`/blog/${post.id}`}
                  sx={{ textDecoration: 'inherit', color: 'inherit' }}
                >
                  {post.title}
                </Link>
              </Typography>
              <Typography variant="body1">
                <Link
                  href={`/blog/${post.id}`}
                  sx={{ textDecoration: 'inherit', color: 'inherit' }}
                >
                  {`${post.summary}...`}
                </Link>
              </Typography>
            </Box>
          ))}
          <Pagination
            count={Math.ceil(length / ITEMS_PER_PAGE)}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </>
      ) : (
        <Typography variant="h6"> {loading ? 'Loading...' : 'No posts found'} </Typography>
      )}
    </Box>
  );
}
