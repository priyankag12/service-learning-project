// app/instructor/dashboard/page.js (Instructor Dashboard)
"use client";

import { useRouter } from "next/navigation";
import { Upload, Calendar } from "lucide-react";
import Section from "@/components/baseLayout/baseLayout.jsx"; // Import Section component
import "./dashboard.scss";

export default function InstructorDashboard() {
  const router = useRouter();

  return (
    <Section title="Welcome, Instructor!" childId={1}>
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="title-container">
            <h1 className="dashboard-title">Instructor Dashboard</h1>
          </div>
          <div className="button-container">
            <div className="button-div">
              <button
                className="button"
                onClick={() => router.push("/instructor/upload")}
              >
                <span className="button-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{
                      fill: "rgba(255, 255, 255, 1)",
                      transform: "",
                      msFilter: "",
                    }}
                  >
                    <path d="M11 15h2V9h3l-4-5-4 5h3z"></path>
                    <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path>
                  </svg>{" "}
                </span>
              </button>
              <h3>Upload</h3>
            </div>
            <div className="button-div">
              <button
                className="button"
                onClick={() => router.push("/instructor/schedule")}
              >
                <span className="button-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{
                      fill: "rgba(255, 255, 255, 1)",
                      transform: "",
                      msFilter: "",
                    }}
                  >
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                    <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path>
                  </svg>
                </span>
              </button>
              <h3>Schedule</h3>
            </div>
          </div>
        </div>
      </div>
      {/* New button to create a course */}
      <button
        className="create-course-button"
        onClick={() => router.push("/instructor/createcourse")}
      >
        Create a New Course
      </button>
    </Section>
  );
}
