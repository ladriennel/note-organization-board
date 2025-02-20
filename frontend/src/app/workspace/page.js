'use client'


import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'


const WorkspaceHomePage = () => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [workspaces, setWorkspaces] = useState([])
   const [isGuest, setIsGuest] = useState(false);
   const [selectedWorkspace, setSelectedWorkspace] = useState(null)
   const [error, setError] = useState(null)


   const router = useRouter()


   useEffect(() => {
       if (sessionStorage.getItem('isGuest')) {
           setIsGuest(true);
           return;
       }


       const fetchWorkspaces = async () => {
           try {
               setError(null);
               const res = await fetch('http://localhost:5001/api/workspace', {
                   method: 'GET',
                   credentials: 'include',
               });


               if (res.status === 401) {
                   setIsLoggedIn(false);
                   return;
               }


               if (!res.ok) throw new Error('Failed to fetch workspaces');


               const data = await res.json();
               setWorkspaces(data);
               setIsLoggedIn(true);
           } catch (err) {
               console.error(err);
               setError('Failed to load workspaces');
               setIsLoggedIn(false);
           }
       };


       fetchWorkspaces();
   }, []);


   return (


       <div className='h-screen grid grid-cols-6' style={{ backgroundColor: 'var(--border-color)' }} >
           <title>Workspace</title>
           <div className="relative col-span-1 col-start-1 h-9/10 -top-8 rounded-2xl" style={{ backgroundColor: 'var(--bg-color)' }}></div>
           <div className="relative col-span-4 col-start-2 h-3/4  top-20 left-[100] rounded-2xl "
               style={{ backgroundColor: 'var(--secondary2-color)', border: '10px solid var(--bg-color)' }}></div>


           {isLoggedIn ? (
               <div className="absolute w-screen grid grid-cols-6 ">
                   <p className="relative text-3xl col-span-4 col-start-2 top-10 left-[260] whitespace-nowrap"> This is Noteboard: Welcome </p>


               </div>
           ) : (


               <div className="absolute w-screen grid grid-cols-6 ">
                   <p className="relative text-3xl col-span-4 col-start-2 top-10 left-[260] whitespace-nowrap"> This is Noteboard: Imagine and Create</p>
                   {/*<h1 className="text-2xl font-bold mb-4">Welcome to the Workspace App</h1>
                   <p className="text-gray-600">As a guest, your work will not be saved.</p>
                   <button
                       className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                       onClick={() => router.push('/auth/login')}
                   >
                       Log in to Save Workspaces!
                   </button>*/}
               </div>
           )}
       </div>


   )
}


export default WorkspaceHomePage
