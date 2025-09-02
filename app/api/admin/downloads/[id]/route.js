import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Download from '../../../../models/Download';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params; 

    const download = await Download.findById(id);
    if (!download) {
      return NextResponse.json(
        { status: 'error', message: 'Download not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: 'success', data: download });
  } catch (error) {
    console.error('Download GET API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params; 
    const body = await request.json();

    const updateData = {
      ...body,
      updatedAt: new Date(),
    };

    const download = await Download.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!download) {
      return NextResponse.json(
        { status: 'error', message: 'Download not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      message: 'Download updated successfully',
      data: download,
    });
  } catch (error) {
    console.error('Download PUT API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const download = await Download.findByIdAndDelete(id);
    if (!download) {
      return NextResponse.json(
        { status: 'error', message: 'Download not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      message: 'Download deleted successfully',
    });
  } catch (error) {
    console.error('Download DELETE API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
