import React, { useState } from "react";
import Tabgif1 from "@/assets/airlift-tab-gif1.gif";
import Tabgif2 from "@/assets/airlift-tab-gif2.gif";
import Tab3gif1 from "@/assets/airlift-tabs-3-img1.png";
import Tab3gif2 from "@/assets/airlift-tabs-3-img2.png";
import Tab4gif from "@/assets/airlift-tabs-4-gif.gif";
import { FileCode, Gauge, RefreshCcwDot, Scissors } from "lucide-react";

const TabsSection = () => {
  const [activeTab, setActiveTab] = useState(1); //1,2,3,4

  const styles = {
    tabTitle: {
      active: "text-[18px] leading-[28px] font-bold text-indigo-900",
      inactive: "text-[16px] leading-[24px] font-medium text-[#71717A]",
    },
  };

  const titleClass = (i) =>
    activeTab === i ? styles.tabTitle.active : styles.tabTitle.inactive;

  return (
    <>
      <div className="flex max-w-[1200px] w-full min-w-[1200px] min-h-[385px] h-full max-h-[385px] justify-between gap-14 px-6 items-center bg-[url('@/assets/airlift-tabs-bg.webp')] bg-no-repeat bg-[position:right_center]">
        {/* Tab Titles */}
        <div className="max-w-[383px] w-full min-w-[383px] flex flex-col gap-6">
          {/* Title 1 */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setActiveTab(1)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " " || e.key === "Spacebar") &&
              setActiveTab(1)
            }
            className={`flex items-center gap-2 px-6 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden ${
              activeTab === 1
                ? "py-4 bg-zinc-50 rounded-[12px]"
                : "py-1 bg-white rounded-[20px]"
            }`}
          >
            <div
              className={`flex w-full max-w-1 min-w-1  rounded-lg self-start transition-all duration-300 ease-in-out ${
                activeTab === 1
                  ? "h-[28px] bg-indigo-700"
                  : "h-[22px] bg-zinc-200"
              }`}
            ></div>
            {/* Title after Border */}
            <div className="flex flex-col w-full">
              <span
                className={`transition-all duration-300 ease-in-out ${titleClass(
                  1
                )}`}
              >
                Execute JavaScript on Interaction
              </span>
              {/* Title Description */}
              <span
                className={`text-[16px] font-medium leading-[120%] text-zinc-600 transition-all duration-300 ease-in-out mt-4 ${
                  activeTab === 1
                    ? "mt-4 h-[57.61px]"
                    : " h-0 overflow-hidden mt-0"
                }`}
              >
                Defers heavy scripts until the user interacts, reducing initial
                load time dramatically.
              </span>
            </div>
          </div>

          {/* Title 2 */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setActiveTab(2)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " " || e.key === "Spacebar") &&
              setActiveTab(2)
            }
            className={`flex items-center gap-2 px-6 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden ${
              activeTab === 2
                ? "py-4 bg-zinc-50 rounded-[12px]"
                : "py-1 bg-white rounded-[20px]"
            }`}
          >
            <div
              className={`flex w-full max-w-1 min-w-1  rounded-lg self-start transition-all duration-300 ease-in-out ${
                activeTab === 2
                  ? "h-[28px] bg-indigo-700"
                  : "h-[22px] bg-zinc-200"
              }`}
            ></div>
            {/* Title after Border */}
            <div className="flex flex-col w-full">
              <span
                className={`transition-all duration-300 ease-in-out ${titleClass(
                  2
                )}`}
              >
                Minify JavaScript
              </span>
              {/* Title Description */}
              <span
                className={`text-[16px] font-medium leading-[120%] text-zinc-600 transition-all duration-300 ease-in-out mt-4 ${
                  activeTab === 2
                    ? "mt-4 h-[57.61px]"
                    : " h-0 overflow-hidden mt-0"
                }`}
              >
                Strips unnecessary spaces and characters to make JavaScript
                files smaller and faster.
              </span>
            </div>
          </div>

          {/* Title 3 */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setActiveTab(3)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " " || e.key === "Spacebar") &&
              setActiveTab(3)
            }
            className={`flex items-center gap-2 px-6 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden ${
              activeTab === 3
                ? "py-4 bg-zinc-50 rounded-[12px]"
                : "py-1 bg-white rounded-[20px]"
            }`}
          >
            <div
              className={`flex w-full max-w-1 min-w-1  rounded-lg self-start transition-all duration-300 ease-in-out ${
                activeTab === 3
                  ? "h-[28px] bg-indigo-700"
                  : "h-[22px] bg-zinc-200"
              }`}
            ></div>
            {/* Title after Border */}
            <div className="flex flex-col w-full">
              <span
                className={`transition-all duration-300 ease-in-out ${titleClass(
                  3
                )}`}
              >
                Aggregate JavaScript
              </span>
              {/* Title Description */}
              <span
                className={`text-[16px] font-medium leading-[120%] text-zinc-600 transition-all duration-300 ease-in-out mt-4 ${
                  activeTab === 3
                    ? "mt-4 h-[57.61px]"
                    : " h-0 overflow-hidden mt-0"
                }`}
              >
                Combines multiple JavaScript files into one, cutting down on
                server requests for better speed.
              </span>
            </div>
          </div>

          {/* Title 4 */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setActiveTab(4)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " " || e.key === "Spacebar") &&
              setActiveTab(4)
            }
            className={`flex items-center gap-2 px-6 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden ${
              activeTab === 4
                ? "py-4 bg-zinc-50 rounded-[12px]"
                : "py-1 bg-white rounded-[20px]"
            }`}
          >
            <div
              className={`flex w-full max-w-1 min-w-1  rounded-lg self-start transition-all duration-300 ease-in-out ${
                activeTab === 4
                  ? "h-[28px] bg-indigo-700"
                  : "h-[22px] bg-zinc-200"
              }`}
            ></div>
            {/* Title after Border */}
            <div className="flex flex-col w-full">
              <span
                className={`transition-all duration-300 ease-in-out ${titleClass(
                  4
                )}`}
              >
                Defer JavaScript
              </span>
              {/* Title Description */}
              <span
                className={`text-[16px] font-medium leading-[120%] text-zinc-600 transition-all duration-300 ease-in-out mt-4 ${
                  activeTab === 4
                    ? "mt-4 h-[57.61px]"
                    : " h-0 overflow-hidden mt-0"
                }`}
              >
                Delays non-critical JavaScript execution so core content loads
                first for a better user experience.
              </span>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex flex-col justify-center items-center min-w-[713px] w-full max-w-[713px] min-h-[385px] h-full max-h-[385px] relative">
          <div className="w-full h-full absolute inset-0">
            {/* Content 1 and 2 */}
            {(activeTab === 1 || activeTab === 2) && (
              <div
                className={`flex flex-col items-center relative min-w-[713px] w-full max-w-[713px]  ${
                  activeTab === 1
                    ? "min-h-[385px] h-full max-h-[385px]"
                    : "min-h-[337px] h-full max-h-[337px]"
                }`}
              >
                {activeTab === 1 ? (
                  <img
                    src={Tabgif1}
                    alt="Airlift Tab Animation 1"
                    className="w-[500px] h-[500px] object-contain absolute bottom-[-22px]"
                  />
                ) : (
                  <img
                    src={Tabgif2}
                    alt="Airlift Tab Animation 2"
                    className="w-[304px] h-[244px] object-contain absolute top-[37px] opacity-80"
                  />
                )}

                {/* Icon text */}
                <span
                  className={`border-[0.91px] border-indigo-400 flex items-start p-2 rounded-[8px] font-normal text-[12px] leading-[120%] gap-2 bg-indigo-50 text-zinc-800 cursor-default [box-shadow:0px_10px_10px_-5px_rgba(0,0,0,0.04),_0px_20px_25px_-5px_rgba(0,0,0,0.1)] self-start transition-all duration-300 ease-in-out transform-gpu ${
                    activeTab === 1
                      ? "translate-x-[308px] translate-y-[66px]"
                      : "translate-x-[408px] translate-y-[178px]"
                  }`}
                >
                  {activeTab === 1 ? (
                    <FileCode
                      size={14.54}
                      strokeWidth={1.36}
                      className="shrink-0"
                    />
                  ) : (
                    <RefreshCcwDot
                      size={14.54}
                      strokeWidth={1.36}
                      className="shrink-0"
                    />
                  )}
                  {activeTab === 1
                    ? "Scripts wake up when users do!"
                    : "Converting Long identifiers to short"}
                </span>

                <span
                  className={`border-[0.91px] border-indigo-400 flex items-start p-2 rounded-[8px] font-normal text-[12px] leading-[120%] gap-2 bg-indigo-50 text-zinc-800 cursor-default [box-shadow:0px_10px_10px_-5px_rgba(0,0,0,0.04),_0px_20px_25px_-5px_rgba(0,0,0,0.1)] self-start transition-all duration-300 ease-in-out transform-gpu ${
                    activeTab === 1
                      ? "translate-x-[104px] translate-y-[265px]"
                      : "translate-x-[287px] translate-y-[190px]"
                  }`}
                >
                  {activeTab === 1 ? (
                    <Gauge
                      size={14.54}
                      strokeWidth={1.36}
                      className="shrink-0"
                    />
                  ) : (
                    <Scissors
                      size={14.54}
                      strokeWidth={1.36}
                      className="shrink-0"
                    />
                  )}
                  {activeTab === 1 ? (
                    "Focus on speed as pages load in a Snap!"
                  ) : (
                    <>
                      Removing Whitespace, Comments, Line breaks <br />
                      Removing Optional semicolons
                    </>
                  )}
                </span>
              </div>
            )}

            {/* Content 3*/}
            {activeTab === 3 && (
              <div className="flex flex-col items-center relative min-w-[713px] w-full max-w-[713px] min-h-[337px] h-full max-h-[337px]">
                <div className="flex min-w-[319px] w-full max-w-[319px] min-h-[257px] h-full max-h-[257px] overflow-hidden justify-center items-end">
                  <img
                    src={Tab3gif1}
                    alt="Js Request"
                    className="w-full h-[265.5px] object-contain"
                  />
                </div>
                <div className="flex min-w-[386px] w-full max-w-[386px] min-h-[128.23px] h-full max-h-[128.23px]">
                  <img
                    src={Tab3gif2}
                    alt="Tab 3 Img 2"
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Content 4 */}
            {activeTab === 4 && (
              <div className="flex flex-col items-center relative min-w-[713px] w-full max-w-[713px] min-h-[337px] h-full max-h-[337px] justify-center">
                <img
                  src={Tab4gif}
                  alt="Tab 4 Gif"
                  className="w-[397px] h-[397px] object-contain absolute opacity-80"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TabsSection;
