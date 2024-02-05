import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import UserProb from "@/models/UserProb";


export const GET = async (req) => {
    try {
        await connectMongoDB();
        
        const data =  await UserProb.find({});
        // console.log(JSON.stringify(data));
        return new NextResponse(JSON.stringify(data),{status:200});
        
    }
    catch (err) {
        console.log(err);
        return NextResponse.error(err);
    }
}