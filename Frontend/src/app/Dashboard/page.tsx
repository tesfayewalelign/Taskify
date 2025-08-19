"use client";

import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function WelcomeDashboard() {
  const router = useRouter();
  return (
    <div className="w-full max-w-[1440px] h-screen bg-white flex flex-col items-center px-4 py-8 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-[1120px] h-auto md:h-[44px] mb-[50px] gap-4 md:gap-0">
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

      <div className="flex flex-col justify-center items-center w-full md:w-[375px] h-auto md:h-[161px] gap-[42px] mt-10 md:mt-0">
        <div className="flex flex-col w-full gap-2">
          <h2 className="w-full md:w-[138px] h-[29px] text-[24px] font-bold text-center text-black mx-auto">
            No Task Yet
          </h2>
          <p className="w-full md:w-[375px] h-[38px] text-[16px] font-normal text-center text-black/70 mx-auto">
            No tasks created yet, You can start by clicking the add new button
            below to create one
          </p>
        </div>

        <button
          className="h-[48px] w-[150px] bg-[#ec4c7d] hover:bg-[#d43e6b] text-white font-semibold rounded-lg mx-auto"
          onClick={() => router.push("/Creat")}
        >
          Add New
        </button>
      </div>
    </div>
  );
}
