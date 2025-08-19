"use client";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";

export default function DeleteTask() {
  return (
    <div className="w-full max-w-[1440px] min-h-screen bg-[#F0F0F0] flex flex-col items-center px-4 py-8 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1120px] h-[44px] mb-[50px] gap-4 md:gap-0">
        <div className="flex items-center w-full md:w-[508px] h-[44px] rounded-full border border-[#CDCDCD] px-4 md:px-6 gap-3 md:gap-4">
          <FaSearch className="w-[20px] h-[20px] text-black" />
          <input
            type="text"
            placeholder="Search for task"
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
      <div className="flex flex-col md:flex-row w-full max-w-[900px] bg-white justify-center items-center gap-6 md:gap-[48px] p-6 rounded-md shadow-md">
        <div className="flex flex-col w-full md:w-full gap-4 md:gap-[20px]">
          <h1 className="text-xl md:text-2xl font-inter font-bold text-[#000000]">
            Delete Task
          </h1>
          <p className="text-base font-inter font-normal text-[#000000B2]">
            This action can’t be undone. Enter the word “delete” in the given
            field below to delete task
          </p>
          <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-[20px]">
            <input
              type="text"
              placeholder="Type delete in here"
              className="flex-1 h-[56px] rounded-[10px] border border-[#D2D2D2] px-4 py-2 font-normal text-[#2E2E2EB2] bg-transparent outline-none"
            />
            <button className="w-full sm:w-[143px] h-[56px] bg-[#EC4C7D] text-white rounded-[10px] font-inter font-semibold flex justify-center items-center">
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
