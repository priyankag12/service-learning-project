// app/instructor/create-course/page.js
"use client";

import { useState } from "react";
import "./createcourse.scss";
import Section from "@/components/baseLayout/baseLayout";

export default function CreateCourse() {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., call an API to save course data
    console.log({
      courseName,
      description,
      instructorName,
      duration,
    });
  };

  return (
    <Section title={"Create a New Course"}>
      <div className="container-container">
        <div className="create-course-container">
          <h2>Add Course Details</h2>
          <form onSubmit={handleSubmit} className="create-course-form">
            <div className="form-group">
              <label htmlFor="courseName">Course Name</label>
              <input
                type="text"
                id="courseName"
                value={courseName}
                placeholder="Course Name"
                onChange={(e) => setCourseName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Course Description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="instructorName">Instructor Name</label>
              <input
                type="text"
                id="instructorName"
                value={instructorName}
                placeholder="Instructor's Name"
                onChange={(e) => setInstructorName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="duration">Duration (in hours)</label>
              <input
                type="number"
                id="duration"
                value={duration}
                placeholder="Course Duration"
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-button">
              Create Course
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
}
