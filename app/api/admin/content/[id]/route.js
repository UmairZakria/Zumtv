import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Content from '../../../../models/Content';

export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const content = await Content.findById(params.id);
    
    if (!content) {
      return NextResponse.json(
        { status: 'error', message: 'Content not found' },
        { status: 404 }
      );
    }
    
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

export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const body = await request.json();

    const updateData = {
      ...body,
      updatedAt: new Date()
    };

    const content = await Content.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!content) {
      return NextResponse.json(
        { status: 'error', message: 'Content not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      message: 'Content updated successfully',
      data: content
    });
  } catch (error) {
    console.error('Content PUT API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const content = await Content.findByIdAndDelete(params.id);
    
    if (!content) {
      return NextResponse.json(
        { status: 'error', message: 'Content not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      message: 'Content deleted successfully'
    });
  } catch (error) {
    console.error('Content DELETE API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
