import React, { useState, useEffect, useRef } from "react";
import Proimage from "@/assets/airlift-progress-icon1.gif";
import { ExternalLink, RefreshCcw, Timer, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Proindicator from "@/assets/airlift-progress-bar-indicator.png";
import Proendicon from "@/assets/airlift-progress-bar-end-icon.gif";
import { Button } from "@/components/ui/button";
import Prolasticon from "@/assets/airlift-pro-complete-tab-icon.gif";

const ProgressBar = () => {
  const [inProgress, setInProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [progressCompleted, setProgressCompleted] = useState(false);

  const totalTimeRef = useRef(timeLeft); // snapshot of total duration (seconds)
  useEffect(() => {
    totalTimeRef.current = timeLeft;
  }, [timeLeft]);

  // start inProgress automatically after 3s
  useEffect(() => {
    const t = setTimeout(() => setInProgress(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // drive progress and timeLeft while inProgress === true
  useEffect(() => {
    if (!inProgress || progressCompleted) return;

    const total = totalTimeRef.current || 1;
    // update interval (ms) — use 250ms for smoothness
    const intervalMs = 250;
    const perTickProgress = (100 / total) * (intervalMs / 1000);

    const iv = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, +(p + perTickProgress).toFixed(2));
        if (next >= 100) {
          // finish
          clearInterval(iv);
          setInProgress(false);
          setProgressCompleted(true);
          setTimeLeft(0);
          return 100;
        }
        return next;
      });

      setTimeLeft((t) => Math.max(0, t - intervalMs / 1000));
    }, intervalMs);

    return () => clearInterval(iv);
  }, [inProgress, progressCompleted]);

  const ProgressData = {
    0: {
      heading: "Hang tight!",
      subheading: "We’re preparing everything you need.",
      barinfo:
        "Optimizing every corner of your site for a smoother, faster experience.",
    },
    90: {
      heading: "Hang tight!",
      subheading: "We’re preparing everything you need.",
      barinfo: "Finishing up!",
    },
    100: {
      heading: "Woohoo!",
      subheading: "Your site is fully optimized and ready to go.",
      barinfo:
        "Everything’s set! Enjoy your faster, smoother homepage experience.",
    },
  };
  const { heading, subheading, barinfo } =
    ProgressData[progress >= 100 ? 100 : progress >= 90 ? 90 : 0];

  return (
    <>
      {/*Box for border */}
      <div
        className={`flex justify-center items-center min-w-[1280px] w-full max-w-[1280px] duration-200 transition-all ease-in-out h-full ${
          progressCompleted
            ? "max-h-[458px] min-h-[458px]"
            : "max-h-[258px] min-h-[258px]"
        } bg-[linear-gradient(92.17deg,rgba(45,212,191,0.4)-1.04%,rgba(129,140,248,0.4)41.74%,rgba(67,56,202,0.4)101.07%)] rounded-[20px] p-[1.5px]`}
      >
        {/* Main box for contents */}
        <div
          className={`w-full h-full relative overflow-hidden duration-200 transition-all ease-in-out bg-white rounded-[20px] p-6 ${
            progressCompleted ? "min-h-[456.5px]" : "min-h-[256.5px]"
          }`}
        >
          {/* below is the absolute top blur */}
          <div className="absolute w-full top-0 bg-[linear-gradient(188.91deg,rgba(165,180,252,0.5)32.24%,rgba(79,70,229,0.5)38.37%,rgba(165,243,252,0.5)48.58%,rgba(79,70,229,0.5)56.24%,rgba(199,210,254,0.5)61.51%,rgba(165,243,252,0.5)67.64%)] h-[51px] blur-[55px]"></div>

          {/* Below are contents sections */}
          {/* head+text and right img */}
          <div className="w-full flex flex-row justify-between align-middle px-4">
            <div className="flex flex-col gap-[10px] w-fit">
              <span className="font-bold text-[18px] leading-[100%] text-indigo-900">
                {heading}
              </span>
              <span className="font-bold text-[24px] leading-[100%] text-indigo-900">
                {subheading}
              </span>
            </div>
            {/* Progress image */}
            <div className="h-[55px] w-[55px] object-fill overflow-hidden flex items-center justify-center">
              <img
                src={progressCompleted ? Prolasticon : Proimage}
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
                {Math.round(progress)}
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
                {(() => {
                  const s = Math.max(0, Math.round(timeLeft));
                  const hh = Math.floor(s / 3600);
                  const mm = Math.floor((s % 3600) / 60);
                  const ss = s % 60;
                  return `${hh.toString().padStart(2, "0")}:${mm
                    .toString()
                    .padStart(2, "0")}:${ss.toString().padStart(2, "0")}`;
                })()}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full px-6 mt-2 relative">
            <div className="w-full relative">
              <Progress
                value={progress}
                className="w-full rounded-full bg-zinc-100 h-1.5  [&>div]:!bg-indigo-700"
              />
              <img
                src={Proindicator}
                alt="indicator"
                className={`absolute top-[-8px] left-[0 - 10px)] w-[21.35px] h-[20px] object-cover`}
                style={{ left: `calc(${progress}% - 10px)` }}
              />
            </div>
          </div>

          {/* Below Progress Bar Section */}
          <div
            className={`w-full flex flex-row justify-between duration-300 transition-all ease-in-out align-middle px-6 ${
              progressCompleted ? "h-[96px]" : "h-0 overflow-hidden"
            } ${progress === 100 ? "mt-6" : "mt-0"}`}
          >
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
          <div
            className={`w-full px-6 duration-300 transition-all ease-in-out ${
              progressCompleted ? "h-[58px]" : "h-0 overflow-hidden"
            } ${progress === 100 ? "mt-6" : "mt-0"}`}
          >
            <div className="bg-white p-4 w-full flex flex-row justify-between items-center border-[1.5px] border-[#F4F4F5] rounded-[12px]">
              <div className="flex flex-row gap-4 items-center w-fit">
                <RefreshCcw
                  size={16}
                  strokeWidth={1}
                  className="text-indigo-800 animate-spin"
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
              {barinfo}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
