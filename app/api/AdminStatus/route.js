// api/AdminStatus/route.js
import { connectMongoDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import AdminStatus from '@/models/AdminStatus';

export async function POST(req) {
  try {
    const { status, description } =  await req.json();
    await connectMongoDB(); 

    const admminStatus = await AdminStatus.create({
      status,
      description,
    });

    return NextResponse.json(
      { message: 'AdminStatus document created successfully', admminStatus },
      { status: 201 } // 201 Created status code
    );
  } catch (error) {
    console.error('Error creating AdminStatus document:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

