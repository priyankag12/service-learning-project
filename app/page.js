// app/page.js (Home page)
"use client";

import { useRouter } from "next/navigation";
import { global } from "styled-jsx/css";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome</h1>
          <p className="text-gray-600 mb-8">Select your role to continue</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => router.push("/instructor")}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Instructor
          </button>

          <button
            onClick={() => router.push("/student")}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Student
          </button>
        </div>
      </div>
    </div>
  );
}
