import React from "react";
import Proimage from "@/assets/airlift-progress-icon1.gif";
import { ExternalLink, RefreshCcw, Timer, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Proindicator from "@/assets/airlift-progress-bar-indicator.png";
import Proendicon from "@/assets/airlift-progress-bar-end-icon.gif";
import { Button } from "@/components/ui/button";
import Prolasticon from "@/assets/airlift-pro-complete-tab-icon.gif";

const ProgressFull = () => {
  return (
    <>
      {/*Box for border */}
      <div className="flex justify-center items-center min-w-[1280px] w-full max-w-[1280px] min-h-[458px] h-full max-h-[458px] bg-[linear-gradient(92.17deg,rgba(45,212,191,0.4)-1.04%,rgba(129,140,248,0.4)41.74%,rgba(67,56,202,0.4)101.07%)] rounded-[20px] p-[1.5px]">
        {/* Main box for contents */}
        <div className="w-full h-full relative overflow-hidden bg-white min-h-[456.5px] h-full rounded-[20px] p-6">
          {/* below is the absolute top blur */}
          <div className="absolute w-full top-0 bg-[linear-gradient(188.91deg,rgba(165,180,252,0.5)32.24%,rgba(79,70,229,0.5)38.37%,rgba(165,243,252,0.5)48.58%,rgba(79,70,229,0.5)56.24%,rgba(199,210,254,0.5)61.51%,rgba(165,243,252,0.5)67.64%)] h-[51px] blur-[55px]"></div>

          {/* Below are contents sections */}
          {/* head+text and right img */}
          <div className="w-full flex flex-row justify-between align-middle px-4">
            <div className="flex flex-col gap-[10px] w-fit">
              <span className="font-bold text-[18px] leading-[100%] text-indigo-900">
                Woohoo!
              </span>
              <span className="font-bold text-[24px] leading-[100%] text-indigo-900">
                Your site is fully optimized and ready to go.
              </span>
            </div>
            {/* Progress image */}
            <div className="h-[55px] w-[55px] object-fill overflow-hidden flex items-center justify-center">
              <img
                src={Prolasticon}
                alt="Prolasticon"
                className="w-full object-cover h-[55px]"
              />
            </div>
          </div>

          {/* Progress bar + counter */}
          <div className="w-full flex flex-row justify-between align-middle px-6 mt-10">
            {/* Percentage */}
            <div className="flex flex-row gap-1 items-end w-fit">
              <span className="font-semibold text-[36px] leading-[100%] text-indigo-700">
                100
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
              value={100}
              className="w-full rounded-full bg-zinc-100 h-1.5  [&>div]:!bg-indigo-700"
            />
            <img
              src={Proindicator}
              alt="indicator"
              className="absolute top-[-8px] right-[20px] w-[21.35px] h-[20px] object-cover"
            />
          </div>

          {/* Below Progress Bar Section */}
          <div className="w-full flex flex-row justify-between align-middle px-6 mt-6">
            {/* left side div with gif */}
            <div className="flex flex-row justify-between items-center bg-[linear-gradient(92.17deg,rgba(67,56,202,0.06)-1.04%,rgba(129,140,248,0.06)56.4%,rgba(45,212,191,0.06)101.07%)] w-full rounded-[12px] p-4">
              {/* gif + text */}
              <div className="flex flex-row gap-[10px] items-center w-fit">
                <div className="h-[64px] w-[64px] object-fill overflow-hidden flex items-center justify-center">
                  <img
                    src={Proendicon}
                    alt="Proendicon"
                    className="w-full object-cover h-[64px]"
                  />
                </div>
                {/* text */}
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-[18px] leading-[100%] text-zinc-800">
                    Your Home Page just got faster!
                  </span>
                  <span className="font-normal text-[14px] leading-[100%] text-[#71717A]">
                    Check it out while we continue improving the rest of your
                    site.
                  </span>
                </div>
              </div>

              {/* button with icon */}
              <div className="w-fit flex flex-col items-end gap-4">
                <X size={16} strokeWidth={1} className="text-[#71717A]" />
                <Button className="!w-fit !bg-white cursor-pointer text-indigo-900 !text-[14px] !leading-[20px] !font-medium !py-1.5 !px-2 gap-2 h-6 !rounded-[8px] min-h-8">
                  <ExternalLink
                    size={16}
                    strokeWidth={1}
                    className="text-indigo-900 !shrink-0"
                  />
                  View Page
                </Button>
              </div>
            </div>
          </div>

          {/* Optimization Section */}
          <div className="w-full px-6 mt-6">
            <div className="bg-white p-4 w-full flex flex-row justify-between items-center border-[1.5px] border-[#F4F4F5] rounded-[12px]">
              <div className="flex flex-row gap-4 items-center w-fit">
                <RefreshCcw
                  size={16}
                  strokeWidth={1}
                  className="text-indigo-800"
                />
                <span className="font-medium text-[16px] leading-[100%] text-zinc-800">
                  Optimization Queue
                </span>
              </div>

              {/* count text*/}
              <span className="bg-white border-[1px] border-zinc-600 flex items-center px-[4.5px] py-2 rounded-[16px] text-center font-normal text-[12px] leading-[100%] h-[24px] bg-teal-50 text-zinc-600 cursor-default">
                2 Pages
              </span>
            </div>
          </div>

          {/* Last text */}
          <div className="w-full px-6 mt-6">
            <p className="font-normal text-[14px] leading-[100%] text-zinc-600">
              Everything’s set! Enjoy your faster, smoother homepage experience.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressFull;
