import React, { useEffect, useState } from "react";
import Tabgif1 from "@/assets/airlift-tab-gif1.gif";
import Tabgif2 from "@/assets/airlift-tab-gif2.gif";
import scissors from "@/assets/airlift-tab-gif2-scissor.gif";
import Tab3gif1 from "@/assets/airlift-tabs-3-img1.png";
import JsIcon from "@/assets/js-icon.png";
import Tab3gif2 from "@/assets/airlift-tabs-3-img2.png";
import Tab4gif from "@/assets/airlift-tabs-4-gif.gif";
import { FileCode, Gauge, RefreshCcwDot, Scissors } from "lucide-react";

const TabsSection = () => {
  const [activeTab, setActiveTab] = useState(1); //1,2,3,4
  const [play, setPlay] = useState(false);

  const styles = {
    tabTitle: {
      active: "text-[18px] leading-[28px] font-bold text-indigo-900",
      inactive: "text-[16px] leading-[24px] font-medium text-[#71717A]",
    },
  };

  const titleClass = (i) =>
    activeTab === i ? styles.tabTitle.active : styles.tabTitle.inactive;

  // For js Animation Looping
  useEffect(() => {
    if (activeTab === 3) {
      setPlay(true);
    } else {
      setPlay(false);
    }
  }, [activeTab]);

  // Looping control for tab-3 animations
  useEffect(() => {
    let intervalId;
    let pulseTimeout;

    const totalDuration = 4301 + 800 + 2000; // last delay + animation duration + 2s hold

    if (activeTab === 3) {
      // start immediately
      setPlay(true);

      // every totalDuration ms, pulse play off -> on so CSS animations restart
      intervalId = setInterval(() => {
        setPlay(false);
        // small gap so CSS sees the class removal before re-adding
        pulseTimeout = setTimeout(() => setPlay(true), 50);
      }, totalDuration);
    } else {
      setPlay(false);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(pulseTimeout);
    };
  }, [activeTab]);

  return (
    <>
      <div className="flex max-w-[1200px] w-full min-w-[1200px] min-h-[385px] h-full max-h-[385px] justify-between gap-14 px-6 items-center bg-[url('@/assets/airlift-tabs-bg.webp')] bg-no-repeat bg-[position:300px_center]">
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
                className={`text-[14px] font-normal leading-[120%] text-zinc-600 transition-all duration-300 ease-in-out ${
                  activeTab === 1
                    ? "mt-4 h-[34px]"
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
                className={`text-[14px] font-normal leading-[120%] text-zinc-600 transition-all duration-300 ease-in-out ${
                  activeTab === 2
                    ? "mt-4 h-[34px]"
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
                className={`text-[14px] font-normal leading-[120%] text-zinc-600 transition-all duration-300 ease-in-out ${
                  activeTab === 3
                    ? "mt-4 h-[51px]"
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
                className={`text-[14px] font-normal leading-[120%] text-zinc-600 transition-all duration-300 ease-in-out ${
                  activeTab === 4
                    ? "mt-4 h-[34px]"
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
                  <>
                    <img
                      src={Tabgif2}
                      alt="Airlift Tab Animation 2"
                      className="min-w-[304px] w-full max-w-[304px] h-[244px] object-cover absolute top-[37px] opacity-80"
                    />
                    <div className="flex min-w-[76px] w-full max-w-[76px] min-h-[76px] h-full max-h-[76px] bg-indigo-50 border-[1px] border-solid border-indigo-400 rounded-full absolute top-[109px] [box-shadow:0px_10px_10px_-5px_rgba(0,0,0,0.04),_0px_20px_25px_-5px_rgba(0,0,0,0.1)]">
                      <img
                        src={scissors}
                        alt="Scissors Gif"
                        className="w-full h-[76px] object-cover transform-gpu rotate-90"
                      />
                    </div>
                  </>
                )}

                {/* Icon text */}
                <span
                  className={`border-[0.91px] border-indigo-400 flex items-start p-2 rounded-[8px] font-normal text-[12px] leading-[120%] gap-2 bg-indigo-50 text-zinc-800 cursor-default [box-shadow:0px_10px_10px_-5px_rgba(0,0,0,0.04),_0px_20px_25px_-5px_rgba(0,0,0,0.1)] self-start transition-all duration-300 ease-in-out transform-gpu ${
                    activeTab === 1
                      ? "translate-x-[308px] translate-y-[66px]"
                      : "translate-x-[408px] translate-y-[197.5px]"
                  }`}
                >
                  {activeTab === 1 ? (
                    <FileCode
                      size={14.54}
                      strokeWidth={1.36}
                      className="shrink-0 text-indigo-700"
                    />
                  ) : (
                    <RefreshCcwDot
                      size={14.54}
                      strokeWidth={1.36}
                      className="shrink-0 text-indigo-700"
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
                      : "translate-x-[287.5px] translate-y-[210px]"
                  }`}
                >
                  {activeTab === 1 ? (
                    <Gauge
                      size={14.54}
                      strokeWidth={1.36}
                      className="shrink-0 text-indigo-700"
                    />
                  ) : (
                    <Scissors
                      size={14.54}
                      strokeWidth={1.36}
                      className="shrink-0 text-indigo-700"
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
                {/* <div className="flex min-w-[319px] w-full max-w-[319px] min-h-[257px] h-full max-h-[257px] overflow-hidden justify-center items-end">
                  <img
                    src={Tab3gif1}
                    alt="Js Request"
                    className="w-full h-[265.5px] object-contain"
                  />
                </div> */}
                {/* Top Part */}
                <div
                  className={`activeTab4-container ${
                    play ? "play" : ""
                  } w-full min-h-[232.5px] h-full max-h-[232.5px] pl-[69px] pr-[68px] pt-[11.5px] relative flex justify-center`} //flex items-center justify-center
                >
                  <div className="flex flex-col min-w-[319px] w-full max-w-[319px] h-full">
                    <div className="box-center-div flex justify-between mx-8 mb-[26px]">
                      <div className="box-div opacity-0 flex items-center justify-center min-w-10 w-full max-w-10 min-h-10 h-full max-h-10 border-[0.5px] border-solid border-[#E4E4E7] p-2 rounded-[8px] transform-gpu relative">
                        <FileCode
                          size={16}
                          strokeWidth={1}
                          className="shrink-0 text-indigo-400"
                        />
                        <div className="flex w-[75px] h-[45px] absolute left-full top-1/2 bg-transparent">
                          <div className="w-full h-full relative bg-transparent before:content-[''] before:absolute before:left-0 before:top-0 before:h-[1px] before:w-[0] before:bg-[repeating-linear-gradient(to_right,#C7D2FE_0_4px,transparent_4px_9px)] ani-x after:content-[''] after:absolute after:right-0 after:top-0 after:h-0 after:w-[1px] after:bg-[repeating-linear-gradient(to_bottom,#C7D2FE_0_4px,transparent_4px_9px)] ani-y">
                            <div className="flex min-w-1.5 w-full max-w-1.5 min-h-1.5 h-full max-h-1.5 bg-indigo-200 transform-gpu rotate-45 absolute left-[calc(100%-.5px)] translate-x-[-50%] top-[0px] icon-move-down-center opacity-0"></div>
                          </div>
                        </div>
                      </div>

                      <div className="box-div opacity-0 flex items-center justify-center min-w-10 w-full max-w-10 min-h-10 h-full max-h-10 border-[0.5px] border-solid border-[#E4E4E7] p-2 rounded-[8px] transform-gpu relative">
                        <FileCode
                          size={16}
                          strokeWidth={1}
                          className="shrink-0 text-indigo-400"
                        />
                        <div className="flex w-[75px] h-[45px] absolute right-full top-1/2 bg-transparent">
                          <div className="w-full h-full relative bg-transparent before:content-[''] before:absolute before:right-0 before:top-0 before:h-[1px] before:w-[0] before:bg-[repeating-linear-gradient(to_left,#C7D2FE_0_4px,transparent_4px_9px)] ani-x  after:content-[''] after:absolute after:left-0 after:top-0 after:h-0 after:w-[1px] after:bg-[repeating-linear-gradient(to_bottom,#C7D2FE_0_4px,transparent_4px_9px)] ani-y">
                            <div className="flex min-w-1.5 w-full max-w-1.5 min-h-1.5 h-full max-h-1.5 bg-indigo-200 transform-gpu rotate-45 absolute left-[calc(0%+.5px)] translate-x-[-50%] top-[0px] icon-move-down-center opacity-0"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="box-last-div flex justify-between items-center relative">
                      <div className="box-div opacity-0 flex items-center justify-center min-w-10 w-full max-w-10 min-h-10 h-full max-h-10 border-[0.5px] border-solid border-[#E4E4E7] p-2 rounded-[8px] transform-gpu relative">
                        <FileCode
                          size={16}
                          strokeWidth={1}
                          className="shrink-0 text-indigo-400"
                        />
                        <div className="flex w-[90px] h-[1px] absolute left-full top-1/2 bg-transparent">
                          <div className="w-full h-full relative bg-transparent before:content-[''] before:absolute before:left-0 before:top-0 before:h-[1px] before:w-[0] before:max-w-[45px] before:bg-[repeating-linear-gradient(to_right,#C7D2FE_0_4px,transparent_4px_9px)] ani-x after:content-[''] after:absolute after:left-[45px] after:top-0 after:h-[1px] after:w-0 after:max-w-[44px] after:bg-[repeating-linear-gradient(to_right,#C7D2FE_0_4px,transparent_4px_9px)] ani-x-after">
                            <div className="flex min-w-1.5 w-full max-w-1.5 min-h-1.5 h-full max-h-1.5 bg-indigo-200 transform-gpu rotate-45 absolute left-[45px] translate-y-[-50%] top-1/2 opacity-0 icon-move-left"></div>
                          </div>
                        </div>
                      </div>

                      {/* Js Icon Part */}
                      <div className="flex flex-col items-center justify-end min-w-14 w-full max-w-14 min-h-14 h-full max-h-14 bg-white border-[0.96px] border-solid border-[#E4E4E7] rounded-[8px] shadow-[0px_10px_10px_-5px_#0000000A,0px_20px_25px_-5px_#0000001A] z-10 ani-js-icon opacity-0">
                        <img
                          src={JsIcon}
                          alt="JS Icon"
                          className="w-8 h-8 m-auto"
                        />
                        <div className="flex w-[1px] h-[97px] absolute left-1/2 -translate-x-1/2 top-full bg-transparent">
                          <div className="w-full h-full relative bg-transparent before:content-[''] before:absolute before:left-0 before:top-0 before:h-0 before:max-h-[26px] before:w-[1px] before:bg-[repeating-linear-gradient(to_bottom,#3730A3_0_4px,transparent_4px_7px)] ani-js-before after:content-[''] after:absolute after:left-0 after:top-[26px] after:h-0 after:max-h-[71px] after:w-[1px] after:bg-[repeating-linear-gradient(to_bottom,#3730A3_0_4px,transparent_4px_8px)] ani-js-after">
                            <div className="w-[0px] h-[0px] border-solid border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[3px] border-t-indigo-800 transform-gpu absolute left-1/2 translate-x-[-50%] top-[30px] js-icon-move-down opacity-0"></div>
                          </div>
                        </div>
                        {/* Absolute Div again */}
                        <div className="flex items-center justify-center px-[calc(8px-(0.91px*2))] py-2 border-[0.91px] border-solid border-indigo-400 absolute left-1/2 transform-gpu -translate-x-1/2 top-[calc(100%+26px)] text-[12px] leading-[100%] font-medium text-indigo-800 bg-indigo-50 w-[140px] h-[31px] rounded-[6px] ani-text-show opacity-0">
                          Sending 1 JS Request
                        </div>
                      </div>

                      <div className="box-div opacity-0 flex items-center justify-center min-w-10 w-full max-w-10 min-h-10 h-full max-h-10 border-[0.5px] border-solid border-[#E4E4E7] p-2 rounded-[8px] transform-gpu relative">
                        <FileCode
                          size={16}
                          strokeWidth={1}
                          className="shrink-0 text-indigo-400"
                        />
                        <div className="flex w-[90px] h-[1px] absolute right-full top-1/2 bg-transparent">
                          <div className="w-full h-full relative bg-transparent before:content-[''] before:absolute before:right-0 before:top-0 before:h-[1px] before:w-[0] before:max-w-[45px] before:bg-[repeating-linear-gradient(to_right,#C7D2FE_0_4px,transparent_4px_9px)] ani-x after:content-[''] after:absolute after:right-[45px] after:top-0 after:h-[1px] after:w-0 after:max-w-[44px] after:bg-[repeating-linear-gradient(to_right,#C7D2FE_0_4px,transparent_4px_9px)] ani-x-after">
                            <div className="flex min-w-1.5 w-full max-w-1.5 min-h-1.5 h-full max-h-1.5 bg-indigo-200 transform-gpu rotate-45 absolute right-[45px] translate-y-[-50%] top-1/2 opacity-0 icon-move-right"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex min-w-[386px] w-full max-w-[386px] min-h-[104px] h-full max-h-[104px]">
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
