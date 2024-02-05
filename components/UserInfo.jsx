"use client";
import { useState,useEffect } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import 'tailwindcss/tailwind.css';
import axios from "axios";

export default function UserInfo(){
  const { data: session } = useSession();
  const [name] = useState(session?.user?.name || "");
  const [email] = useState(session?.user?.email || "");
  const [empid, setEmpid] = useState("");
  const [role, setRole] = useState("Associate");
  const [keyword1, setKeyword1] = useState("");
  const [keyword2, setKeyword2] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(" "); 
  const [nonTechProblemDescription, setNonTechProblemDescription] = useState("");



  const [problemCount, setProblemCount] = useState(null);
  const [PendingCount, setPendingCount] = useState(null);
  const [CompletedCount, setCompletedCount] = useState(null);
  
  useEffect(() => {

    const fetchProblemCount = async () => {
      try{
        const response = await axios.get('/api/ProblemCount',{
          params:{email:session?.user?.email},
        });
        console.log(response.data);
        setProblemCount(response.data.count);
        

      }
      catch(error){
        console.log(error);
        console.error('Error fetching problem count:' ,error.message);

      }

    };
    fetchProblemCount();
  },[session]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!empid || !role || !keyword1 || !keyword2 || !nonTechProblemDescription){
      setError("Please fill all the fields");
      console.log(userId);
      return;
    }else{

    setDone("Form Submitted Successfully");
    }
    try{
      const userform = await fetch("api/pushdata",{
        method:"POST",
        headers:{
          "content-Type":"application/json",
        },
        body: JSON.stringify({
          
          
          name:session?.user?.name,
          email:session?.user?.email,
          empid,
          role,
          keyword1,
          keyword2,
          nonTechProblemDescription, 
        }),
      });
      if (userform.ok){
        const form = e.target;
        form.reset();
      }
      else{
        console.log("An error occured");
      }

    }
    catch(error){
      console.log(error);
    }
    console.log("Form Submitted:", {
      name,
      email,
      empid,
      role,
      keyword1,
      keyword2,
      nonTechProblemDescription,
    });
  };

  return (
    <div className="flex min-h-screen">
     
      <div className="flex-grow">
        <div className="container">
          
          <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
             
            </div>
          </div>
        </div>
      </div>

      {/* User Info Box at Top Right */}
      <div className="absolute top-4 right-4 bg-primary p-5 text-light shadow-lg rounded-lg border-t-4 border-blue-500 box-border h-42 w-85 gap-3">
        <p className="text-sm font-medium"> {session?.user?.name}</p>
        <p className="text-sm font-medium">{session?.user?.email}</p>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3 rounded-md"
        >
          Log Out
        </button>
      </div>
      {/*User problem count box top left end*/}
      <div className= "absolute top-4 left-4 bg-primary p-5 text-light shadow-lg rounded-lg border-t-4 border-blue-500 box-border h-92 w-85  gap-10">
        <p className= "text-sm font-medium">{session?.user?.name}</p>
        <p className="text-lg font-bold">{problemCount !== null ? `Problem Count: ${problemCount}` : 'Loading...'}</p>
      </div>
      {/*Pending Count box below top left end box*/}
      <div className= "absolute top-32 left-4 bg-secondary p-5 text-light shadow-lg rounded-lg border-t-4 border-blue-500 box-border h-92 w-85 "> 
      <p  className= "text-sm font-medium">Pending </p>
      <p className= "text-lg font-bold">{PendingCount !==null ? `Pending Count:${PendingCount}`:0} </p>
      </div>
      {/* Completed Count*/ }
      <div className="absolute top-60 left-4 bg-your-color p-5 text-light shadow-lg rounded-lg border-t-4 border-blue-500 box-border h-92 w-85">
       <p className="text-sm font-medium">Completed</p>
        <p className="text-lg font-bold">{CompletedCount !== null ? `Completed Count: ${CompletedCount}` : 0}</p>
      </div>

      {/* User Input Box in the Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-lg rounded-md flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Submit User Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-4 mb-4">
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-2">
                Employee Code:
              </label>
              <input
                onChange={(e) => setEmpid(e.target.value)}
                type="text"
                name="empCode"
                className="border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-2">
                Role:
              </label>
              <select
                onChange={(e) => setRole(e.target.value)}
                name="role"
                className="border border-gray-300 p-2 rounded-md"
                value={role}
              >
                <option value="blank"></option>
                <option value="associate">Associate</option>
                <option value="intern">Intern</option>
                <option value="dev">Developer</option>
                <option value="non-tech">Non-Tech</option>
                <option value="others">Others</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Keyword 1:
            </label>
            <input
              onChange={(e) => setKeyword1(e.target.value)}
              type="text"
              name="keyword1"
              className="border border-gray-300 p-2 w-full rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Keyword 2:
            </label>
            <input
              onChange={(e) => setKeyword2(e.target.value)}
              type="text"
              name="keyword2"
              className="border border-gray-300 p-2 w-full rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Non-Tech Problem Description:
            </label>
            <textarea
              onChange={(e) => setNonTechProblemDescription(e.target.value)}
              name="nonTechProblemDescription"
              className="border border-gray-300 p-2 w-full rounded-md"
              rows="3"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold px-6 py-2 rounded-md"
          >
            Submit
          </button>
          { done &&
          (
          <div className="bg-green-500 text-white w-fit text-sm  py-1 px-3 rounded-md mt-2">
            {done}
          </div>
          )

          }
          {error &&(
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>)}
        </form>
      </div>
    </div>
  );
};


