import { NextResponse } from 'next/server';
import getPost from './postService';

export default async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (id) {
    const post = await getPost(Number(id));
    return NextResponse.json({ message: 'Data received', post });
  }
  return NextResponse.json({ error: "'id' parameter is required" }, { status: 400 });
}
