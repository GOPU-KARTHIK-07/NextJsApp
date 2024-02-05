import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import UserProb from "@/models/UserProb";

export async function GET(req) {
  try {
    
    await connectMongoDB();

    const { email } = req.query || {};

    
    const count = await UserProb.countDocuments({ email });

    
    console.log(`Count for email ${email}: ${count}`);


   
    return new NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
   
    return NextResponse.error({
      status: 500,
      body: { error: "Internal Server Error", details: error.message },
    });
  }
}
