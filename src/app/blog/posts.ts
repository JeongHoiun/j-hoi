import fs from 'fs';
import { Post } from '@/models/post';

export function getPosts() {
  const fileNames = fs.readdirSync(`public/posts`);
  const mdFileNames = fileNames.filter((file) => file.endsWith('.md'));
  const posts: Post[] = mdFileNames.map((fileName) => {
    const post = fs.readFileSync(`public/posts/${fileName}`, 'utf-8');

    return {
      title: fileName.replace('.md', ''),
      date: fs.statSync(`public/posts/${fileName}`).birthtime.toDateString(),
      content: post,
      summary: getFirstTwoLines(`public/posts/${fileName}`)
    };
  });
  return posts;
}

function getFirstTwoLines(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');
  const removeMarkDown = content.replace(/#|`/g, '');
  const sliceContent = removeMarkDown.slice(0, 200);

  return sliceContent;
}
