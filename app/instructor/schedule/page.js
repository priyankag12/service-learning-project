"use client";

import styles from "/styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Section from "@/components/baseLayout/baseLayout";

export default function ScheduleEvent() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [attendees, setAttendees] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      <div className={styles.container}>
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
                  onChange={(e) => handleAttendeeChange(index, e.target.value)}
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
    </Section>
  );
}
