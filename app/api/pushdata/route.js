import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import UserProb from "@/models/UserProb";
import User from "@/models/user";

export async function POST(req) {
  try {
    const { name, email, empid, role, keyword1, keyword2, nonTechProblemDescription } = await req.json();
    await connectMongoDB();
    await UserProb.create({ name, email, empid, role, keyword1, keyword2, nonTechProblemDescription });
    console.log("User  Problem registered successfully");
    console.log(name);  
    return NextResponse.json({ message: "User  Problem registered successfully" }, { status: 201 }); 

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}