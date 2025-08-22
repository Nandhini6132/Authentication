"use client"

import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

type User={
  username: string,
  email: string;
  password: string;
}
const SignUp = () => {
  const [user, setUser]= useState<User>({
    username: "",
    email: "",
    password: "",
  })
  
  const router= useRouter();
  const [buttonDisabled, setButtonDisabled]= useState(false)

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  },[user])

  const onSignup=async()=>{
    try {
    const response=  await axios.post('/api/users/signup', user)
    console.log(response, 'ss signup')
    router.push('/login')
    } catch (error:any) {
      console.log(error.message,'err from siu')
    }
  }
  return (
    <div className="flex items-center flex-col gap-10 h-screen justify-center text-center">
     <div className="bg-slate-900 w-[400px] p-10 rounded-lg flex flex-col gap-10 shadow-lg">
     <h1 className="text-xl">SignUp here</h1> 
      <div className="flex flex-col w-[100%]">
        <div className="mb-7 flex justify-between">
          <label className="">UserName</label>
          <input type="text" value={user?.username} onChange={(e)=>setUser({...user, username:e.target.value})} className="focus:outline-none rounded text-black indent-3"/>
        </div>

        <div className="mb-7 flex justify-between">
          <label className="">Email</label>
          <input type="email" value={user?.email} onChange={(e)=>setUser({...user, email:e.target.value})} className="focus:outline-none rounded text-black indent-3"/>
        </div>

        <div className="mb-7 flex justify-between">
          <label className="">Password</label>
          <input type="password" value={user?.password} onChange={(e)=>setUser({...user, password:e.target.value})} className="focus:outline-none rounded text-black indent-3"/>
        </div>

        <div className="text-center mb-4">
          <button className="border bg-transparent shadow-2xl border-sky-300 hover:bg-slate-800 hover:border-slate-900 text-white font-bold py-2 px-4 rounded w-max" onClick={onSignup}>
            {buttonDisabled?'No signup':'Signup'}
          </button>
        </div>

        <div>
          <h5>Already have an account? <Link href={'/login'} className="text-sm underline text-blue-300">Login</Link></h5>
        </div>
      </div>
     </div>
    </div>
  );
};

export default SignUp;
