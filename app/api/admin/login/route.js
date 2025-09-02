import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Admin from '../../../models/Admin';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { status: 'error', message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find admin by email
    const admin = await Admin.findOne({ email, isActive: true });
    if (!admin) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Return admin data (without password)
    const adminData = {
      id: admin._id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      lastLogin: admin.lastLogin
    };

    return NextResponse.json({
      status: 'success',
      message: 'Login successful',
      data: adminData
    });
  } catch (error) {
    console.error('Admin Login API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();
  const admin = await Admin.findOne({ isActive: true });
  if (!admin) {
    return NextResponse.json({ status: 'error', message: 'Admin not found' }, { status: 404 });
  }
  return NextResponse.json({ status: 'success', admin: {
    email: admin.email,
    name: admin.name
  }});
}

export async function PUT(request) {
  await connectDB();
  const body = await request.json();
  const { email, password, name } = body;
  try {
    const admin = await Admin.findOne({ isActive: true });
    if (!admin) {
      return NextResponse.json({ status: 'error', message: 'Admin not found' }, { status: 404 });
    }
    if (email) admin.email = email;
    if (name) admin.name = name;
    if (password) admin.password = password;
    await admin.save();
    return NextResponse.json({ status: 'success', admin: {
      email: admin.email,
      name: admin.name
    }});
  } catch (error) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}