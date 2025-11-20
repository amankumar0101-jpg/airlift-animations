import React from "react";
import Proimage from "@/assets/airlift-progress-icon1.gif";
import { Timer } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Proindicator from "@/assets/airlift-progress-bar-indicator.png";

const ProgressBar = () => {
  return (
    <>
      {/*Box for border */}
      <div className="flex justify-center items-center min-w-[1280px] w-full max-w-[1280px] min-h-[258px] h-full max-h-[258px] bg-[linear-gradient(92.17deg,rgba(45,212,191,0.4)-1.04%,rgba(129,140,248,0.4)41.74%,rgba(67,56,202,0.4)101.07%)] rounded-[20px] p-[1.5px]">
        {/* Main box for contents */}
        <div className="w-full h-full relative overflow-hidden bg-white min-h-[256.5px] h-full rounded-[20px] p-6">
          {/* below is the absolute top blur */}
          <div className="absolute w-full top-0 bg-[linear-gradient(188.91deg,rgba(165,180,252,0.5)32.24%,rgba(79,70,229,0.5)38.37%,rgba(165,243,252,0.5)48.58%,rgba(79,70,229,0.5)56.24%,rgba(199,210,254,0.5)61.51%,rgba(165,243,252,0.5)67.64%)] h-[51px] blur-[55px]"></div>

          {/* Below are contents sections */}
          {/* head+text and right img */}
          <div className="w-full flex flex-row justify-between align-middle px-4">
            <div className="flex flex-col gap-[10px] w-fit">
              <span className="font-bold text-[18px] leading-[100%] text-indigo-900">
                Hang tight!
              </span>
              <span className="font-bold text-[24px] leading-[100%] text-indigo-900">
                We’re preparing everything you need.
              </span>
            </div>
            {/* Progress image */}
            <div className="h-[55px] w-[55px] object-fill overflow-hidden flex items-center justify-center">
              <img
                src={Proimage}
                alt="Backup Inactive"
                className="w-full object-cover h-[55px]"
              />
            </div>
          </div>

          {/* Progress bar + counter */}
          <div className="w-full flex flex-row justify-between align-middle px-6 mt-10">
            {/* Percentage */}
            <div className="flex flex-row gap-1 items-end w-fit">
              <span className="font-semibold text-[36px] leading-[100%] text-indigo-700">
                00
              </span>
              <p className="font-normal text-[12px] leading-[100%] text-indigo-700 mb-[6px]">
                %
              </p>
            </div>
            {/* Counter + timer */}
            <div className="flex flex-row items-end gap-2 w-fit">
              <Timer
                size={16}
                strokeWidth={1.5}
                className="text-indigo-800 mb-[6px]"
              />
              <span className="font-semibold text-[30px] leading-[100%] text-zinc-300">
                00:05:00
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full px-6 mt-2 relative">
            <Progress
              value={0.2}
              className="w-full rounded-full bg-zinc-100 h-1.5  [&>div]:!bg-indigo-700"
            />
            <img
              src={Proindicator}
              alt="indicator"
              className="absolute top-[-8px] left-[21px] w-[21.35px] h-[20px] object-cover"
            />
          </div>
          {/* Last text */}
          <div className="w-full px-6 mt-6">
            <p className="font-normal text-[14px] leading-[100%] text-zinc-600">
              Optimizing every corner of your site for a smoother, faster
              experience.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
