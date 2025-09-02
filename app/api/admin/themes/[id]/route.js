import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Theme from '../../../../models/Theme';

export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const theme = await Theme.findById(params.id);
    
    if (!theme) {
      return NextResponse.json(
        { status: 'error', message: 'Theme not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      status: 'success',
      data: theme
    });
  } catch (error) {
    console.error('Theme GET API Error:', error);
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

    // If this theme is set as active, deactivate all other themes
    if (body.isActive) {
      await Theme.updateMany({}, { isActive: false });
    }

    const updateData = {
      ...body,
      updatedAt: new Date()
    };

    const theme = await Theme.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!theme) {
      return NextResponse.json(
        { status: 'error', message: 'Theme not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      message: 'Theme updated successfully',
      data: theme
    });
  } catch (error) {
    console.error('Theme PUT API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const theme = await Theme.findById(params.id);
    
    if (!theme) {
      return NextResponse.json(
        { status: 'error', message: 'Theme not found' },
        { status: 404 }
      );
    }

    // Don't allow deletion of active theme
    if (theme.isActive) {
      return NextResponse.json(
        { status: 'error', message: 'Cannot delete active theme' },
        { status: 400 }
      );
    }

    await Theme.findByIdAndDelete(params.id);

    return NextResponse.json({
      status: 'success',
      message: 'Theme deleted successfully'
    });
  } catch (error) {
    console.error('Theme DELETE API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
