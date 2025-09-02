import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Theme from '../../../models/Theme';

export async function GET(request) {
  try {
    await connectDB();
    
    const themes = await Theme.find().sort({ createdAt: -1 });
    
    return NextResponse.json({
      status: 'success',
      data: themes
    });
  } catch (error) {
    console.error('Themes GET API Error:', error);
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
    const { name, primaryColor, secondaryColor, accentColor, backgroundColor, textColor } = body;

    if (!name || !primaryColor || !secondaryColor || !accentColor || !backgroundColor || !textColor) {
      return NextResponse.json(
        { status: 'error', message: 'All color fields are required' },
        { status: 400 }
      );
    }

    // If this theme is set as active, deactivate all other themes
    if (body.isActive) {
      await Theme.updateMany({}, { isActive: false });
    }

    const theme = new Theme({
      name,
      primaryColor,
      secondaryColor,
      accentColor,
      backgroundColor,
      textColor,
      isActive: body.isActive || false
    });

    await theme.save();

    return NextResponse.json({
      status: 'success',
      message: 'Theme created successfully',
      data: theme
    }, { status: 201 });
  } catch (error) {
    console.error('Themes POST API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
