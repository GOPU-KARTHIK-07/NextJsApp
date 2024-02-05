import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import UserProb from "@/models/UserProb";

export async function GET(req) {
  try {
    
    await connectMongoDB();

    const data = UserProb.find({});

    
    

   
    return new NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
   
    return NextResponse.error({
      status: 500,
      body: { error: "Internal Server Error", details: error.message },
    });
  }
}
