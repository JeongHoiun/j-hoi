import fs from 'fs';
import { Post } from '@/models/post';
import { ITEMS_PER_PAGE } from '@/common/const';

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
    summary: getContentSummary(`public/posts/${fileName}`),
    id
  };
}

export function getPosts(page: number) {
  const fileNames = fs.readdirSync(`public/posts`);
  const mdFileNames = fileNames.filter((file) => file.endsWith('.md'));
  // TODO: sort by date
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = page * ITEMS_PER_PAGE;
  const posts = mdFileNames.slice(start, end).map((fileName, idx) => {
    const post = fs.readFileSync(`public/posts/${fileName}`, 'utf-8');

    return {
      title: fileName.replace('.md', ''),
      date: fs.statSync(`public/posts/${fileName}`).birthtime.toDateString(),
      content: post,
      summary: getContentSummary(`public/posts/${fileName}`),
      id: idx + (page - 1) * 5
    };
  });
  return posts;
}

function getContentSummary(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');
  const removeMarkDown = content.replace(/#|`/g, '');
  const sliceContent = removeMarkDown.slice(0, 200);

  return sliceContent;
}
