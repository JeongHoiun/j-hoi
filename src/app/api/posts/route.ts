import { NextResponse } from 'next/server';
import getPosts from './postsService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  if (page) {
    const responsePostList = await getPosts(Number(page));
    return NextResponse.json({ message: 'Data received', responsePostList });
  }
  return NextResponse.json({ error: "'page' parameter is required" }, { status: 400 });
}
