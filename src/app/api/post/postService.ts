import fs from 'fs';
import { Post } from '@/models/post';

export function getPost(id: number): Post {
  const fileNames = fs.readdirSync(`public/posts`);
  const mdFileNames = fileNames.filter((file) => file.endsWith('.md'));
  const fileName = mdFileNames[id];
  console.log(id);
  const post = fs.readFileSync(`public/posts/${fileName}`, 'utf-8');

  return {
    title: fileName.replace('.md', ''),
    date: fs.statSync(`public/posts/${fileName}`).birthtime.toDateString(),
    content: post,
    id
  };
}
