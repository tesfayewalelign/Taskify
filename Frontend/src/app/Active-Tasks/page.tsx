"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  createdAt?: string;
};

export default function ActiveTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleToggleComplete = async (id: number, completed: boolean) => {
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed }),
      });

      if (res.ok) {
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...t, completed } : t))
        );
      }
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setTasks((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API_BASE}/tasks`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          if (mounted) setTasks([]);
          return;
        }

        if (!res.ok) {
          if (mounted) setTasks([]);
          return;
        }

        if (mounted) setTasks(data);
      } catch {
        if (mounted) setTasks([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchTasks();
    return () => {
      mounted = false;
    };
  }, [API_BASE, token]);

  return (
    <div className="min-h-screen p-6 bg-[#F0F0F0]">
      <div className="max-w-[1120px] mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Active Tasks</h1>
        <Link href="/create">
          <button className="px-4 py-2 bg-[#EC4C7D] text-white rounded-lg">
            New Task
          </button>
        </Link>
      </div>

      <div className="max-w-[827px] mx-auto text-black bg-white rounded-2xl p-6 shadow">
        {loading ? (
          <p>Loading...</p>
        ) : tasks.length === 0 ? (
          <p>No active tasks yet. Create one!</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((t) => (
              <li
                key={t.id}
                className="p-4 border rounded-md flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{t.title}</h3>
                  <p className="text-xs text-gray-500">
                    {t.createdAt
                      ? new Date(t.createdAt).toLocaleString()
                      : null}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      t.completed ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  >
                    {t.completed ? "Completed" : "Pending"}
                  </span>
                  <button
                    className="px-2 py-1 bg-blue-500 text-white text-xs rounded"
                    onClick={() => handleToggleComplete(t.id, !t.completed)}
                  >
                    {t.completed ? "Mark Pending" : "Mark Done"}
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white text-xs rounded"
                    onClick={() => handleDeleteTask(t.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
