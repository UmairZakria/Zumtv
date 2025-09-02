import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Contact from '../../models/Contact';

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { fname, email, phone, subject, message } = body;

    // Validation
    if (!fname || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { status: 'error', message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create new contact
    const contact = new Contact({
      fname,
      email,
      phone,
      subject,
      message
    });

    await contact.save();

    return NextResponse.json(
      { status: 'success', message: 'Message sent successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    
    let query = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    
    const skip = (page - 1) * limit;
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Contact.countDocuments(query);
    
    return NextResponse.json({
      status: 'success',
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Contact GET API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
