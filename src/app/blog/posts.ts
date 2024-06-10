import fs from 'fs';
import { Post } from '@/models/post';

export function getPosts() {
  const files = fs.readdirSync(`public/posts`);
  const posts: Post[] = files.map((file) => {
    const post = fs.readFileSync(`public/posts/${file}`, 'utf-8');

    return {
      title: file.replace('.md', ''),
      date: fs.statSync(`public/posts/${file}`).birthtime.toDateString(),
      content: post
    };
  });
  return posts;
}
