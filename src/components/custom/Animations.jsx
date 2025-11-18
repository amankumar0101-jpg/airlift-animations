import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { FileChartColumnIncreasing } from "lucide-react";
import AnimationCircle from "./AnimationCircle";

const Animations = () => {
  const [airliftEnabled, setAirliftEnabled] = useState(false);
  return (
    <>
      <div className=" min-w-[458px] w-full max-w-[458px] min-h-[540px] h-full max-h-[540px] border-[0.91px] border-solid border-zinc-200 rounded-[36px] relative bg-white flex flex-col items-center  overflow-hidden">
        <div className="w-full h-full flex flex-col gap-9 px-4 py-[69px] items-center grow justify-start relative">
          {/* Absolute Con with bg */}
          <div className="flex w-full h-full items-center justify-center absolute top-0 left-0 pointer-events-none select-none">
            <div className="flex min-w-[353.76px] w-full max-w-[353.76px] min-h-[443.4px] h-full max-h-[443.4px] bg-[conic-gradient(from_43.24deg_at_24.88%_66.33%,rgba(99,102,241,0.5)_-3.37deg,\#C7D2FE_54.89deg,rgba(165,243,252,0.65)_63.64deg,\#FFFFFF_182.15deg,\#67E8F9_236.56deg,rgba(99,102,241,0.5)_356.63deg,\#C7D2FE_414.89deg)] opacity-60 transform-gpu rotate-[-155.51deg]"></div>
          </div>
          {/* Toggle Part */}
          <div className="flex flex-row flex-nowrap gap-4 items-center justify-between rounded-[8px] px-2 py-[6.905px] bg-white border-[0.91px] border-solid border-zinc-100 shadow-[0px_9.09px_9.09px_-4.54px_rgba(0,0,0,0.04),0px_18.17px_22.72px_-4.54px_rgba(0,0,0,0.10)] min-w-[153.31px] w-full max-w-[153.31px] min-h-[37.81px] h-full h-max-[37.81px]">
            <div className="flex flex-row flex-nowrap items-center gap-2">
              {/* Svg icon */}
              <svg
                width="24"
                height="22"
                viewBox="0 0 24 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.9447 2.12476C22.754 1.99966 22.5106 1.98005 22.2967 2.08518L2.38218 11.8963C2.13234 12.018 1.98763 12.2878 2.02032 12.5672C2.05659 12.8467 2.2638 13.0705 2.53997 13.1298C4.90485 13.6264 8.57508 14.4158 9.81845 14.7183V21.1515C9.81845 21.4277 9.98949 21.6778 10.2526 21.7699C10.325 21.7963 10.4006 21.8095 10.4762 21.8095C10.6668 21.8095 10.8544 21.7273 10.9794 21.5726L15.0971 16.6194C16.2088 17.0568 19.4745 18.3133 22.2668 19.3887C22.3457 19.4184 22.4248 19.4316 22.5037 19.4316C22.6354 19.4316 22.7635 19.3921 22.8753 19.3199C23.053 19.1981 23.1581 18.9975 23.1614 18.7804L23.3191 2.71396C23.3229 2.45706 23.1716 2.2332 22.9447 2.12476Z"
                  fill="#BAFCE5"
                />
                <path
                  d="M8.32565 11.4873C9.32894 10.6223 13.4004 6.70834 17.1367 3.08404L2.65554 10.2178C6.18132 10.9644 7.668 11.3064 8.32565 11.4873ZM8.75315 11.6253C8.69065 11.5924 8.62475 11.5661 8.5625 11.5562C8.6447 11.5827 8.70721 11.6057 8.75315 11.6253ZM20.929 0.107463C21.1559 0.21591 21.3073 0.439769 21.304 0.696239L21.146 16.7626C21.1427 16.9795 21.0375 17.1805 20.8599 17.3019C20.7481 17.3743 20.6197 17.4137 20.4883 17.4137C20.4094 17.4137 20.3303 17.4004 20.2514 17.3708C17.4591 16.2953 14.1931 15.0389 13.0816 14.6014L8.96376 19.5552C8.83867 19.7098 8.65141 19.792 8.46051 19.792C8.38492 19.792 8.30917 19.7788 8.2369 19.7525C7.97381 19.6603 7.80277 19.4105 7.80277 19.1341V12.7008C6.55957 12.3981 2.88908 11.609 0.524291 11.1123C0.248119 11.0531 0.0409052 10.8295 0.00464278 10.5498C-0.0283077 10.2703 0.116403 10.0006 0.366503 9.8788L20.281 0.0678882C20.4946 -0.0372475 20.7381 -0.0173754 20.929 0.107463ZM19.8403 15.8025L19.9654 3.11368C17.6205 7.05066 14.7753 11.8689 13.8841 13.5035C15.0516 13.9573 17.6727 14.9702 19.8403 15.8025Z"
                  fill="url(#paint0_linear_16002_10324)"
                />
                <path
                  d="M19.9661 3.11377L19.841 15.8026C17.6735 14.9706 15.0524 13.9573 13.8848 13.5036C14.776 11.8689 17.6209 7.05067 19.9661 3.11377Z"
                  fill="#5E5899"
                  fill-opacity="0.74"
                />
                <path
                  d="M2.65662 10.2179L17.1378 3.08411C13.4014 6.7084 9.32976 10.6225 8.32672 11.4873C7.66907 11.3064 6.1824 10.9644 2.65662 10.2179Z"
                  fill="#5E5899"
                  fill-opacity="0.74"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_16002_10324"
                    x1="10.652"
                    y1="0"
                    x2="10.652"
                    y2="19.792"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#4B4DB8" stop-opacity="0.43" />
                    <stop offset="1" stop-color="#3A3C7C" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-[16px] font-montserrat leading-[100%] font-[Montserrat] font-semibold text-[#1F1F1FD9]">
                Airlift
              </span>
            </div>
            <Switch
              checked={airliftEnabled}
              onCheckedChange={setAirliftEnabled}
              className="h-5 w-9 data-[state=checked]:bg-emerald-900 data-[state=unchecked]:bg-input [&>span]:h-4 [&>span]:w-4 [&[data-state=checked]>span]:translate-x-4 [&[data-state=unchecked]>span]:translate-x-0.5 cursor-pointer"
            />
          </div>
          {/* Con Part */}
          <div className="flex flex-col gap-8 p-[23px] border-[0.98px] border-solid border-[#E4E4E7] rounded-2xl min-w-[389px] w-full max-w-[389px] min-h-[250.59px] h-full max-h-[250.59px]">
            <div className="flex items-center gap-[7.86px]">
              <FileChartColumnIncreasing
                strokeWidth={1.97}
                className="shrink-0 text-[#18181B]"
                size={23.59}
              />
              <span className="text-[#09090B] text-[17.69px] leading-[100%] font-semibold">
                Performance
              </span>
            </div>

            <div className="flex flex-col w-full grow gap-6">
              <div className="flex items-center w-full gap-6 justify-between">
                <div className="relative w-[70px] h-[70px]">
                  {airliftEnabled ? (
                    <>
                      {/* bottom circle (base) - score 98% */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <AnimationCircle
                          size={70}
                          strokeWidth={12}
                          score={"98%"}
                          progressColor={"#4338CA"}
                          trackColor={"#FAFAFA"}
                          scale={1}
                          className="absolute inset-0"
                        />
                      </div>

                      {/* top circle that "comes in between" and scales from 70 -> 43 */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <AnimationCircle
                          size={70}
                          strokeWidth={12}
                          score={"76%"}
                          progressColor={"#312E81"}
                          trackColor={"#FAFAFA"}
                          scale={40 / 70}
                          className="absolute inset-0"
                        />
                      </div>
                    </>
                  ) : (
                    // default single circle when disabled
                    <AnimationCircle
                      size={70}
                      strokeWidth={12}
                      score={"98%"}
                      progressColor={"#312E81"}
                      trackColor={"#FAFAFA"}
                      scale={1}
                      className=""
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Animations;
