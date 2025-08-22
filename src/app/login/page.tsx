"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import {Axios} from 'axios';
import axios from "axios";
import Link from "next/link";

type User = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  console.log(user);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      const response = await axios.post('/api/users/login', user);
      console.log(response);
      await router.push("/homepage");
    } catch (error: any) {
      console.log(error.message, "loginerror");
    }
  };
  return (
    <div className="flex items-center flex-col gap-10 h-screen justify-center text-center">
      <div className="bg-slate-900 w-[400px] p-10 rounded-lg flex flex-col gap-10 shadow-lg">
        <h1 className="text-xl">Welcome Back Login here</h1>
        <div className="flex flex-col w-[100%]">
          <div className="mb-7 flex justify-between">
            <label className="">Email</label>
            <input
              type="email"
              value={user?.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="focus:outline-none rounded text-black indent-3"
            />
          </div>

          <div className="mb-7 flex justify-between">
            <label className="">Password</label>
            <input
              type="password"
              value={user?.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="focus:outline-none rounded text-black indent-3"
            />
          </div>

          <div className="text-center mb-4">
            <button
              className="border border-sky-300 rounded hover:bg-slate-800 hover:border-slate-900 text-white font-bold py-2 px-4 rounded w-max"
              onClick={onLogin}
            >
              {buttonDisabled?'No login':'Login'}
              
            </button>
          </div>

          <div>
            <h5>
              Don't have an account?{" "}
              <Link
                href={"/signup"}
                className="text-sm underline text-blue-300"
              >
                Signup
              </Link>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
