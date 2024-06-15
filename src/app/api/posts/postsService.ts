import fs from 'fs';
import { Post } from '@/models/post';
import { ITEMS_PER_PAGE } from '@/common/const';

function getContentSummary(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');
  const removeMarkDown = content.replace(/#|`/g, '');
  const sliceContent = removeMarkDown.slice(0, 200);

  return sliceContent;
}

export default function getPosts(page: number): { posts: Post[]; total: number } {
  const fileNames = fs.readdirSync('public/posts');
  const mdFileNames = fileNames.filter((file) => file.endsWith('.md'));
  const sortedMdFileNames = mdFileNames.sort((a, b) => {
    return (
      fs.statSync(`public/posts/${b}`).birthtime.getTime() -
      fs.statSync(`public/posts/${a}`).birthtime.getTime()
    );
  });

  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = page * ITEMS_PER_PAGE;
  const posts = sortedMdFileNames.slice(start, end).map((fileName, idx) => {
    const post = fs.readFileSync(`public/posts/${fileName}`, 'utf-8');

    return {
      title: fileName.replace('.md', ''),
      date: fs.statSync(`public/posts/${fileName}`).birthtime.toDateString(),
      content: post,
      summary: getContentSummary(`public/posts/${fileName}`),
      id: idx + (page - 1) * 5,
    };
  });
  return { posts, total: mdFileNames.length };
}
