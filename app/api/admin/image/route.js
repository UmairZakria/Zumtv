import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Image from '../../../models/Image';

export async function POST(req) {
  await dbConnect();
  const formData = await req.formData();
  const file = formData.get('file');
  const name = formData.get('name');

  if (!file || !name) {
    return NextResponse.json({ error: 'File and name are required.' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString('base64');
  const type = file.type;

  try {
    const image = await Image.findOneAndUpdate(
      { name },
      { data: base64, type },
      { upsert: true, new: true }
    );
    return NextResponse.json({ success: true, image });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');
  try {
    let images;
    if (name) {
      images = await Image.findOne({ name });
      if (!images) return NextResponse.json({ error: 'Image not found.' }, { status: 404 });
    } else {
      images = await Image.find({});
    }
    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
