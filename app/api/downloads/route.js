import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Download from '../../models/Download';

export async function GET(request) {
  try {
    await connectDB();
    
    const downloads = await Download.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json({
      status: 'success',
      data: downloads
    });
  } catch (error) {
    console.error('Public Downloads API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
