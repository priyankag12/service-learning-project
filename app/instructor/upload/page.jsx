// app/instructor/upload/page.js (Upload Material Page)
//HTML5 Drag and Drop API

"use client";
import Section from "@/components/baseLayout/baseLayout";
import { useState } from "react";
import "./upload.scss";

export default function UploadMaterial() {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleUpload = () => {
    // Implement the upload logic here
    console.log("Files to upload:", files);
  };

  return (
    <Section title="Upload Material" childId={1}>
      <div className="upload-container">
        <div className="min-h-screen bg-gray-50 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Upload Material
            </h1>

            <div
              className={`border-4 border-dashed p-6 rounded-lg cursor-pointer ${
                dragging ? "border-blue-500 bg-blue-100" : "border-gray-300"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <p className="text-center text-gray-500">
                Drag and drop files here or{" "}
                <label className="text-blue-500 cursor-pointer underline">
                  browse
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleFileSelect}
                  />
                </label>
              </p>
            </div>

            {files.length > 0 && (
              <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-700 mb-2">
                  Files Selected:
                </h2>
                <ul>
                  {files.map((file, index) => (
                    <li key={index} className="text-gray-600">
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={handleUpload}
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
