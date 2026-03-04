import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename || !request.body) {
        return NextResponse.json({ error: 'Filename and body are required' }, { status: 400 });
    }

    try {
        const body = await request.arrayBuffer();
        const blob = await put(filename, body, {
            access: 'public',
            addRandomSuffix: true,
        });

        return NextResponse.json(blob);
    } catch (error: any) {
        console.error('Vercel Blob put error:', error);
        return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
    }
}
