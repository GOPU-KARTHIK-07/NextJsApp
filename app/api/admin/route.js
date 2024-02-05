
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Admin from "@/models/adlist";


export async function POST(req) {
  try {
    const {empid} =await req.json();
    await connectMongoDB();
    await Admin.create({empid});
    console.log("Admin registered successfully" );
    console.log(empid);

    return NextResponse.json({ message: "Admin registered successfully" }, { status: 201 },);
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred" }, 
      { status: 500 }
    );
  }
}
