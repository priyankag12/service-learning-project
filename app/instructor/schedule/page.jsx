"use client";

import styles from "/styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Section from "@/components/baseLayout/baseLayout";
import "./schedule.scss";

export default function ScheduleEvent() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attendees, setAttendees] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startPlaceholder, setStartPlaceholder] = useState("Start-Time");
  const [endPlaceholder, setEndPlaceholder] = useState("End-Time");

  const handleAddAttendee = () => {
    setAttendees([...attendees, ""]);
  };

  const handleRemoveAttendee = (index) => {
    const updatedAttendees = attendees.filter((_, i) => i !== index);
    setAttendees(updatedAttendees);
  };

  const handleAttendeeChange = (index, value) => {
    const updatedAttendees = [...attendees];
    updatedAttendees[index] = value;
    setAttendees(updatedAttendees);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate dates
      const startDate = new Date(startTime);
      const endDate = new Date(endTime);

      if (startDate >= endDate) {
        throw new Error("End time must be after start time");
      }

      const eventData = {
        summary: title,
        description: description,
        start: {
          dateTime: startTime,
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: endTime,
          timeZone: "Asia/Kolkata",
        },
        attendees: attendees
          .filter((email) => email.trim()) // Remove empty emails
          .map((email) => ({ email: email.trim() })),
      };

      const response = await fetch("/api/schedule_event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Failed to schedule event");
      }

      alert("Event scheduled successfully!");
      router.push("/instructor/dashboard");
    } catch (error) {
      setError(error.message);
      console.error("Error scheduling event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section title="Schedule Meeting">
      <div className="schedule-container">
        <div className="temporary">
          <h1>Schedule an Event</h1>
          {error && <div className={styles.error}>{error}</div>}
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>

            <label>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>

            <label>
              Start Time:
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </label>

            <label>
              End Time:
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </label>

            <label>
              Attendees:
              {attendees.map((email, index) => (
                <div key={index}>
                  <input
                    type="email"
                    placeholder="Attendee email"
                    value={email}
                    onChange={(e) =>
                      handleAttendeeChange(index, e.target.value)
                    }
                  />
                  {attendees.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveAttendee(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </label>

            <button type="button" onClick={handleAddAttendee}>
              Add Attendee
            </button>

            <button type="submit" disabled={loading}>
              {loading ? "Scheduling..." : "Schedule Event"}
            </button>
          </form>
        </div>
        <div className="permaForm">
          <div className="form-container">
            <div className="form-header">
              <h1>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    style={{
                      fill: "rgba(0, 0, 0, 1)",
                      transform: "translateY(20%)",
                      msFilter: "",
                    }}
                  >
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                    <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path>
                  </svg>
                </span>
                Schedule the Event
              </h1>
              <p>
                Enter the details to start the meeting or schedule the meeting
              </p>
            </div>
            <div className="form-body">
              <input
                className="full-box title"
                type="text"
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                className="full-box title"
                type="text"
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <div className="input-wrapper half-box time">
                <span
                  className={`custom-placeholder ${startTime ? "filled" : ""}`}
                >
                  {startTime || "Start-Time"}
                </span>
                <input
                  className="inside-time"
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div className="input-wrapper half-box time">
                <span
                  className={`custom-placeholder ${endTime ? "filled" : ""}`}
                >
                  {endTime || "End-Time"}
                </span>
                <input
                  className="inside-time"
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>

              <div className="attendees">
                {attendees.map((email, index) => (
                  <div className="inside-attendees" key={index}>
                    <input
                      className="attendees-input"
                      type="email"
                      placeholder="Attendee email"
                      value={email}
                      onChange={(e) =>
                        handleAttendeeChange(index, e.target.value)
                      }
                    />
                    {attendees.length > 1 && (
                      <button
                        className="tooltip remove-button"
                        type="button"
                        onClick={() => handleRemoveAttendee(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                          height="25"
                          width="25"
                        >
                          <path
                            fill="red"
                            d="M8.78842 5.03866C8.86656 4.96052 8.97254 4.91663 9.08305 4.91663H11.4164C11.5269 4.91663 11.6329 4.96052 11.711 5.03866C11.7892 5.11681 11.833 5.22279 11.833 5.33329V5.74939H8.66638V5.33329C8.66638 5.22279 8.71028 5.11681 8.78842 5.03866ZM7.16638 5.74939V5.33329C7.16638 4.82496 7.36832 4.33745 7.72776 3.978C8.08721 3.61856 8.57472 3.41663 9.08305 3.41663H11.4164C11.9247 3.41663 12.4122 3.61856 12.7717 3.978C13.1311 4.33745 13.333 4.82496 13.333 5.33329V5.74939H15.5C15.9142 5.74939 16.25 6.08518 16.25 6.49939C16.25 6.9136 15.9142 7.24939 15.5 7.24939H15.0105L14.2492 14.7095C14.2382 15.2023 14.0377 15.6726 13.6883 16.0219C13.3289 16.3814 12.8414 16.5833 12.333 16.5833H8.16638C7.65805 16.5833 7.17054 16.3814 6.81109 16.0219C6.46176 15.6726 6.2612 15.2023 6.25019 14.7095L5.48896 7.24939H5C4.58579 7.24939 4.25 6.9136 4.25 6.49939C4.25 6.08518 4.58579 5.74939 5 5.74939H6.16667H7.16638ZM7.91638 7.24996H12.583H13.5026L12.7536 14.5905C12.751 14.6158 12.7497 14.6412 12.7497 14.6666C12.7497 14.7771 12.7058 14.8831 12.6277 14.9613C12.5495 15.0394 12.4436 15.0833 12.333 15.0833H8.16638C8.05588 15.0833 7.94989 15.0394 7.87175 14.9613C7.79361 14.8831 7.74972 14.7771 7.74972 14.6666C7.74972 14.6412 7.74842 14.6158 7.74584 14.5905L6.99681 7.24996H7.91638Z"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                          ></path>
                        </svg>
                        <span class="tooltiptext">Remove</span>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  className="add-button"
                  type="button"
                  onClick={handleAddAttendee}
                >
                  Add Attendee
                </button>
                <button
                  className="add-button submit-button"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Scheduling..." : "Schedule Event"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
