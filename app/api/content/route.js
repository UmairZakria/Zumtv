import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Content from '../../models/Content';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const component = searchParams.get('component');
    const section = searchParams.get('section');
    
    let query = { isActive: true }; // Only fetch active content
    if (component) query.component = component;
    if (section) query.section = section;
    
    const content = await Content.find(query).sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json({
      status: 'success',
      data: content
    });
  } catch (error) {
    console.error('Public Content API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
