// app/instructor/dashboard/page.js (Instructor Dashboard)
"use client";

import { useRouter } from 'next/navigation';
import { Upload, Calendar } from 'lucide-react';

export default function InstructorDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Instructor Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => router.push('/instructor/upload')}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center space-y-4"
          >
            <Upload className="w-12 h-12 text-blue-600" />
            <span className="text-xl font-medium">Upload Material</span>
          </button>

          <button
            onClick={() => router.push('/instructor/schedule')}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center space-y-4"
          >
            <Calendar className="w-12 h-12 text-green-600" />
            <span className="text-xl font-medium">Schedule Event</span>
          </button>
        </div>
      </div>
    </div>
  );
}