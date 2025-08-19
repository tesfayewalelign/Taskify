"use client";

import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function AddPage() {
  const router = useRouter();
  const [taskName, setTaskName] = useState("");

  const handleCreateTask = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!taskName.trim()) {
      alert("Task name is required");
      return;
    }

    try {
      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
      const url = `${API_BASE}/task`;

      console.log("Creating task:", taskName, "POST ->", url);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ title: taskName }),
      });

      console.log(
        "Response status:",
        res.status,
        "headers:",
        Object.fromEntries(res.headers.entries())
      );

      if (res.status === 204) {
        console.log("Task created — 204 No Content");
        router.push("/Active-Tasks");
        return;
      }

      const contentType = res.headers.get("content-type") ?? "";
      if (contentType.includes("application/json")) {
        let data;
        try {
          data = await res.json();
        } catch (parseErr) {
          console.error("Failed to parse JSON:", parseErr);
          const raw = await res.text();
          console.error("Raw response body:", raw);
          alert("Server returned invalid JSON. See console.");
          return;
        }

        if (!res.ok) {
          console.error("Server error JSON:", data);
          alert(data.message || `Failed to create task (${res.status})`);
          if (res.status === 401 || res.status === 403) {
            router.push("/login");
          }
          return;
        }

        console.log("Task created", data);
        router.push("/Active-Tasks");
        return;
      } else {
        const text = await res.text();
        console.error("Server returned non-JSON response:", text);
        alert(
          `Server error: received non-JSON response (status ${res.status}). See console.`
        );
        return;
      }
    } catch (err) {
      console.error("Network / fetch error:", err);
      alert(
        "Network error. Check server is running and CORS is configured. See console."
      );
    }
  };

  return (
    <div className="w-full max-w-[1440px] min-h-screen bg-[#F0F0F0] flex flex-col items-center px-4 py-8 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1120px] h-auto gap-6 mb-[50px]">
        <div className="flex items-center w-full md:w-[508px] h-[44px] rounded-full border border-[#CDCDCD] px-6 gap-4">
          <FaSearch className="w-[20px] h-[20px] text-black" />
          <input
            type="text"
            placeholder="Search for task"
            className="w-full text-[16px] text-black outline-none bg-transparent"
          />
        </div>
        <div className="flex items-center gap-[30px]">
          <p className="text-[16px] font-semibold text-black">Selam Girma</p>
          <button className="w-[24px] h-[24px]">
            <Image src="/signout.svg" alt="Sign Out" />
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center w-full px-4">
        <div className="w-full max-w-[827px] rounded-[30px] bg-white shadow-lg flex flex-col gap-[64px] p-6 sm:p-10 md:p-14">
          <div className="flex flex-col gap-[20px] w-full">
            <p className="text-[20px] font-bold text-black">Create New Task</p>
            <p className="text-base font-normal leading-none text-black/70">
              Organize your productivity effortlessly by creating a new task.
              Name it whatever helps you stay on top of your game!
            </p>
            <div className="flex flex-col md:flex-row w-full gap-[20px]">
              <div className="flex-1 rounded-[10px] border border-[#D2D2D2] bg-[#F9F9F9] p-[16px]">
                <input
                  type="text"
                  placeholder="Task Name"
                  className="w-full text-[20px] font-normal text-[#2E2E2EB2] bg-transparent outline-none"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
              <button
                className="h-[56px] w-full md:w-[145px] bg-[#EC4C7D] hover:bg-[#d43e6b] text-white font-semibold rounded-lg flex justify-center items-center"
                onClick={handleCreateTask}
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
