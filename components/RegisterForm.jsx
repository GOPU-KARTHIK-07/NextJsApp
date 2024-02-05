"use client";

import Link from "next/link";
import { useState } from "react";


export default function Register() {
    
    const [name,setName]= useState("");
    const [email,setEmail]= useState("");  
    const [password,setPassword]= useState("");
    const [error,setError]= useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!name || !email || !password){
            setError("Please fill all the fields");
            return;
        }

        try{
            const resUserExists = await fetch("api/UserExists", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
              });
        
              const { user } = await resUserExists.json();
        
              if (user) {
                setError("User already exists.");
                return;
              }

        
        const res = await fetch("api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            name,
            email,
            password,
             }),
        });

         if(res.ok)
         {
            const form = e.target;
            form.reset();
            
                

        }
            else{
                console.log("An error occured");
            }
        }
        catch (error){
            console.log("error occure during reg:", error);

        }

    };



    return (
        <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-500"> 
            <h1 className= "textfont-bold my-4 text-center" >
                REGISTER
            </h1>
            <form onSubmit={handleSubmit}className="flex flex-col gap-3" >

                <input onChange={e => setName(e.target.value)} type="text" placeholder="Full-Name" /> 
               <input onChange={e => setEmail(e.target.value)} type="text" placeholder="Email" /> 
               <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" /> 
               <div className="flex items-center justify-center h-full">
                    <button className="bg-blue-700 text-white rounded-md px-4 py-2 w-50 h-90">Register</button>
                </div>

              { error &&
               (
               <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md animate-shake">
                {error}
                </div>

                )

            }

               <Link  className="text-sm text-right " href={"/"}>
                Have an account?
                <span className="underline ">Login</span> 
               
               </Link>
            </form>
        </div>
    </div>
    ); 

}