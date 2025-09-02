import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Content from '../../../models/Content';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const component = searchParams.get('component');
    const section = searchParams.get('section');
    
    let query = {};
    if (component) query.component = component;
    if (section) query.section = section;
    
    const content = await Content.find(query).sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json({
      status: 'success',
      data: content
    });
  } catch (error) {
    console.error('Content GET API Error:', error);
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
    const { component, section, title, subtitle, description, content, imageUrl, buttonText, buttonUrl, order } = body;

    if (!component || !section) {
      return NextResponse.json(
        { status: 'error', message: 'Component and section are required' },
        { status: 400 }
      );
    }

    const contentItem = new Content({
      component,
      section,
      title,
      subtitle,
      description,
      content,
      imageUrl,
      buttonText,
      buttonUrl,
      order: order || 0
    });

    await contentItem.save();

    return NextResponse.json({
      status: 'success',
      message: 'Content created successfully',
      data: contentItem
    }, { status: 201 });
  } catch (error) {
    console.error('Content POST API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
