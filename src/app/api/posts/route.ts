import { NextResponse } from 'next/server';
import { getPosts } from './getPostsFromFileSystem';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  if (page) {
    const posts = await getPosts(Number(page));
    return NextResponse.json({ message: 'Data received', posts });
  }
  return NextResponse.json({ error: `'page' parameter is required` }, { status: 400 });
}
