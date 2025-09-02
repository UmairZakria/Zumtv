import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Download from '../../../models/Download';

export async function GET(request) {
  try {
    await connectDB();
    
    const downloads = await Download.find().sort({ createdAt: -1 });
    
    return NextResponse.json({
      status: 'success',
      data: downloads
    });
  } catch (error) {
    console.error('Downloads GET API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { title, description, downloadUrl, version, platform } = body;

    if (!title || !downloadUrl || !platform) {
      return NextResponse.json(
        { status: 'error', message: 'Title, download URL, and platform are required' },
        { status: 400 }
      );
    }

    const download = new Download({
      title,
      description,
      downloadUrl,
      version,
      platform
    });

    await download.save();

    return NextResponse.json({
      status: 'success',
      message: 'Download link created successfully',
      data: download
    }, { status: 201 });
  } catch (error) {
    console.error('Downloads POST API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
