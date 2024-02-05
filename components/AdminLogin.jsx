"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const hardcodedSuperKey = "23456!@#$%^";
  const [empid, setempid] = useState("");
  const [superKey, setSuperKey] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (superKey === hardcodedSuperKey  ) {
      
      router.push("/admindashboard");
    } else if(!empid) {
      setError("Please fill Emp-id");

    }
    else{
      setError("Invalid Admin Key")
    }
    try {

      
      const reso = await fetch("api/admin",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          empid,
        }),

      });
      if(reso.ok){
        const form = e.target;
        form.reset();
      }
      else{
        console.log("An error occured");
      }
    }
    catch (err) {
      console.log("error occured:",error);
    }

  };

  return (
    <div className="grid place-content-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-500">
        <h1 className="text-xl font-bold my-4 text-center">ADMIN FORM</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input onChange={e=>setempid(e.target.value)} type="text" placeholder="Emp-id"/>
          <input
            onChange={(e) => setSuperKey(e.target.value)}
            type="text"
            placeholder="SUPER KEY"
            value={superKey}
          />

          <div className="flex items-center justify-center h-full">
            <button className="bg-blue-700 text-white rounded-md px-4 py-2 w-50 h-10">
              Enter
            </button>
          </div>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm text-right" href={"/"}>
            Have an account? <span className="underline text-blue-500">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
