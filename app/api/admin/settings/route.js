import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import AdminSettings from '../../../models/AdminSettings';

export async function GET() {
  await dbConnect();
  let settings = await AdminSettings.findOne();
  if (!settings) {
    // Return default if not set
    settings = {
      siteEmail: '',
      sitePhone: '',
      socials: {}
    };
  }
  return NextResponse.json({ status: 'success', data: settings });
}

export async function PUT(req) {
  await dbConnect();
  const body = await req.json();
  try {
    let settings = await AdminSettings.findOne();
    if (!settings) {
      settings = new AdminSettings(body);
    } else {
      Object.assign(settings, body);
      settings.updatedAt = new Date();
    }
    await settings.save();
    return NextResponse.json({ status: 'success', data: settings });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
