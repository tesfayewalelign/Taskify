"use client";
import { useState, useEffect } from "react";
import { FaSearch, FaTrash, FaChevronDown } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";

const initialTasks = [
  {
    id: 1,
    title: "FetanSystem Technology internship test project",
    status: "pending",
  },
  {
    id: 2,
    title: "FetanSystem Technology internship test project",
    status: "Completed",
  },
  {
    id: 3,
    title: "FetanSystem Technology internship test project",
    status: "pending",
  },
  {
    id: 4,
    title: "FetanSystem Technology internship test project",
    status: "pending",
  },
  {
    id: 5,
    title: "FetanSystem Technology internship test project",
    status: "Completed",
  },
  {
    id: 6,
    title: "FetanSystem Technology internship test project",
    status: "pending",
  },
  {
    id: 7,
    title: "FetanSystem Technology internship test project",
    status: "Completed",
  },
  {
    id: 8,
    title: "FetanSystem Technology internship test project",
    status: "Completed",
  },
];

export default function InactiveTask() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("pageFilter");

  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    if (filter) {
      setFilterStatus(filter);
    }
  }, [filter]);

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) =>
    filterStatus === "completed"
      ? task.status.toLowerCase() === "completed" &&
        task.title.toLowerCase().includes(search.toLowerCase())
      : false
  );

  return (
    <div className="w-full max-w-[1440px] min-h-screen bg-[#F0F0F0] flex flex-col items-center px-4 py-8 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1120px] h-[44px] mb-[50px] gap-4 md:gap-0">
        <div className="flex items-center w-full md:w-[508px] h-[44px] rounded-full border border-[#CDCDCD] px-4 md:px-6 gap-3 md:gap-4">
          <FaSearch className="w-[20px] h-[20px] text-black" />
          <input
            type="text"
            placeholder="Search for task"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-[16px] text-black outline-none bg-transparent"
          />
        </div>
        <div className="flex items-center gap-6 md:gap-[30px]">
          <p className="text-[16px] font-semibold text-black">Selam Girma</p>
          <button className="w-[24px] h-[24px]">
            <Image src="/signout.svg" alt="Sign Out" />
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full max-w-[868px] gap-4 md:gap-[20px] mb-6">
        <p className="w-[107px] h-[24px] font-inter font-semibold text-[20px] text-[#000000]">
          Completed
        </p>
        <p className="flex justify-center items-center w-[108px] h-[35px] rounded-full text-[#fd03bffd] bg-[#EC4C7D1A] px-6 text-center">
          Inactive
        </p>
      </div>
      {filterStatus === "completed" && (
        <div className="flex flex-col w-full max-w-[868px] bg-[#F0F0F0]">
          {filteredTasks.length > 0 ? (
            <div className="divide-y">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col md:flex-row justify-between items-center p-4 hover:bg-gray-50 gap-4 md:gap-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 relative">
                      <div className="absolute w-2 h-2 top-1 left-0 bg-[#EC4C7D] rounded-full"></div>
                    </div>
                    <p className="font-inter font-semibold text-base text-[#000000]">
                      {task.title}
                    </p>
                  </div>
                  <div className="flex justify-center items-center w-[165px] h-[36px] rounded-full bg-[#7f9e7e] bg-opacity-10">
                    <button className="flex items-center justify-center gap-[6px] w-[100px] h-[40px] rounded-[6px] text-[#177412] font-inter font-medium text-base">
                      completed
                      <FaChevronDown className="w-[14px] h-[8px] text-[#177412]" />
                    </button>
                  </div>
                  <button
                    onClick={() => router.push("/Delete")}
                    className="w-[24px] h-[24px] text-[#EC4C7D]"
                  >
                    <FaTrash className="cursor-pointer w-full h-full" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500">No completed tasks found.</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row w-full max-w-[868px] justify-between items-center mt-6 gap-4 sm:gap-0">
            <p className="font-inter font-medium text-base text-[#242424]">
              Showing 1 to {filteredTasks.length} of {tasks.length} entries
            </p>
            <div className="flex gap-4">
              <button className="font-inter font-bold text-base text-[#EC4C7D]">
                Previous
              </button>
              <p className="font-inter font-medium text-base text-[#242424]">
                1
              </p>
              <p className="font-inter font-medium text-base text-[#242424]">
                2
              </p>
              <button className="font-inter font-bold text-base text-[#EC4C7D]">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
