import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import UserProb from "@/models/UserProb";



export async function GET(req) {
  try {
    
    await connectMongoDB();
    const {email} = await req?.query || {};
    const count = await UserProb.countDocuments({email});
    console.log(JSON.stringify(count));
    return new NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
    
  }
}