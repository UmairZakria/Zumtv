import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Theme from '../../models/Theme';

export async function GET(request) {
  try {
    await connectDB();
    
    const themes = await Theme.find({}).sort({ isActive: -1, createdAt: -1 });
    
    return NextResponse.json({
      status: 'success',
      data: themes
    });
  } catch (error) {
    console.error('Public Themes API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
