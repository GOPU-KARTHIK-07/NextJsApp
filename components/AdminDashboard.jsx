"use client";
import {useState, useEffect} from 'react';
import { useRouter} from 'next/navigation';


export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('not Done');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/GetUserProbData');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const updateStatus = async (itemId,email,item) =>{
    try {
      const response = await fetch('/api/AdminStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId,
          description:{
            email:email,
            keyword1:item.keyword1,
            keyword2:item.keyword2,
            nonTechProblemDescription:item.nonTechProblemDescription,
          } , 
          status:status,
        }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result); 
    setStatus('Done');
  }
  catch (error) {
    console.error('Error updating status:', error);
  }
};

  const handleDoneClick = (itemId,email,item) => {
    console.log(`Item with ID ${itemId} marked as DONE`);
    const status = 'Done';
    console.log(`the email you want to update ${email}`);
    updateStatus(itemId,email,item);
  };

  const handleEmailClick = (email) => {
    console.log(`Email button clicked for ${email}`);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full lg:w-4/5 xl:w-3/4">
        <div className="rounded-lg shadow-md p-4 border-blue-400 border-l-4">
          <h1 className="text-2xl font-bold mb-2">User Problems List</h1>
          <div className="overflow-x-auto border-blue-400">
            <table className="w-full table-auto border-collapse border">
              <thead>
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Keyword1</th>
                  <th className="p-2 border">Keyword2</th>
                  <th className="p-2 border">Non-Tech. Desc.</th>
                  <th className="p-2 border" colSpan="2">Action</th>
                  {/* Add more th for additional fields */}
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td className="p-2 border">{item.name}</td>
                    <td className="p-2 border">{item.email}</td>
                    <td className="p-2 border">{item.keyword1}</td>
                    <td className="p-2 border">{item.keyword2}</td>
                    <td className="p-2 border text-sm">{item.nonTechProblemDescription}</td>
                    <td className="p-2 border">
                      <button
                        className="bg-orange-500 text-white px-4 py-2 rounded mr-2"
                        onClick={() => handleDoneClick(item._id,item.email,item)}
                      >
                        DONE
                      </button>
                    </td>
                    <td className="p-2 border">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => handleEmailClick(item.email)}
                      >
                        EMAIL
                      </button>
                    </td>
                    {/* Add more td for additional fields */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
