import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Contact from '../../../models/Contact';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { status } = body;

    if (!status || !['unread', 'read', 'replied'].includes(status)) {
      return NextResponse.json(
        { status: 'error', message: 'Valid status is required' },
        { status: 400 }
      );
    }

    const contact = await Contact.findByIdAndUpdate(
      params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return NextResponse.json(
        { status: 'error', message: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      message: 'Contact status updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('Contact Status Update API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
