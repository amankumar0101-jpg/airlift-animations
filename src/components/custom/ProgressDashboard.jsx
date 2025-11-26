import React, { useState, useEffect, useRef } from "react";
import Dottedborder from "@/assets/airlift-dotted-border-left.png";
import { CircleAlert, Lightbulb, Settings2, TrendingDown } from "lucide-react";
import Scrolldataimage from "@/assets/airlift-scrolling-data-img-right.png";
import Scrolldataimagetwo from "@/assets/airlift-scrolling-data-img-right-2.png";
import Scrolldataimagethree from "@/assets/airlift-scrolling-data-img-right-3.png";
import Scrolldataimagefour from "@/assets/airlift-scrolling-data-img-right-4.png";

const ProgressDashboard = () => {
  const [scrollTo, setScrollTo] = useState(1); // 1,2,3,4

  const viewportRef = useRef(null);
  const innerRef = useRef(null);
  const cycleTimerRef = useRef(null);

  // advance scrollTo every 5s
  useEffect(() => {
    cycleTimerRef.current = setInterval(() => {
      setScrollTo((s) => (s === 4 ? 1 : s + 1));
    }, 5000);
    return () => clearInterval(cycleTimerRef.current);
  }, []);

  // animate translateY on inner wrapper when scrollTo changes
  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const items = inner.querySelectorAll(":scope > .row-item");
    const idx = Math.max(0, Math.min(items.length - 1, scrollTo - 1));
    const target = items[idx];
    if (!target) return;
    const offset = target.offsetTop;
    inner.style.transition = "transform 800ms linear";
    inner.style.transform = `translateY(-${offset}px)`;
  }, [scrollTo]);

  return (
    <>
      {/* Main div */}
      <div className="flex min-w-[1280px] w-full max-w-[1280px]">
        {/* inner main */}
        <div className="bg-[url('@/assets/airlift-dotted-border-left.png')] bg-repeat-y bg-[position:42.5px] bg-[length:1.5px_auto] w-full">
          {/* top div with button and text */}
          <div className="flex bg-[url('@/assets/airlift-dotted-border-left.png')] bg-repeat-y bg-[position:42.5px] bg-[length:1.5px_auto] flex-row justify-between items-center px-8 pl-[68px] pt-10">
            <p className="font-semibold text-[14px] leading-[100%] text-zinc-600">
              PROGRESS HIGHLIGHTS
            </p>
            {/* Button */}
            <div className="flex flex-row gap-2 items-center w-fit py-2.5 px-4 bg-indigo-900 rounded-[6px] cursor-pointer">
              <Settings2 size={16} strokeWidth={1} className="text-white" />
              <span className="font-medium text-[14px] leading-[20px] text-white">
                View Detailed Status
              </span>
            </div>
          </div>

          {/* Data Section */}
          <div className="min-h-[674px] h-full max-h-[674px] w-full relative">
            {/*gap-[48px]*/}
            <div
              className="flex flex-col pt-7 min-h-[674px] h-full max-h-[674px]  overflow-hidden"
              ref={viewportRef}
            >
              <div
                ref={innerRef}
                className="flex flex-col will-change-transform"
              >
                {/* Row 1 Contents */}
                <div
                  className={`bg-[url('@/assets/airlift-dashed-border-scroll.png')] bg-repeat-y bg-[position:42.5px] bg-[length:1.5px_auto] relative row-item`}
                >
                  <div className="px-8 pl-[69px] flex flex-row justify-between gap-6 w-full min-h-[581px] h-full max-h-[581px]">
                    {/* Absolute Dot Marker */}
                    <div className="absolute top-[3px] left-[37px] bg-indigo-900 min-w-[13px] w-full max-w-[13px] min-h-[13px] h-full max-h-[13px] rounded-full"></div>
                    {/* Left Div */}
                    <div className="flex flex-col min-w-[577.7px] w-full max-w-[577.5px]">
                      {/* Heading Text */}
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-[20px] leading-[100%] text-indigo-900">
                          Images now fit the moment.
                        </p>
                        <p className="font-bold text-[24px] leading-[100%] text-indigo-900">
                          Smaller Files, Smarter Timing & No Waiting!
                        </p>
                      </div>
                      {/* Content Boxes */}
                      <div className="flex flex-col gap-4 p-2 mt-6">
                        {/* 1st Content Box */}
                        <div className="flex justify-center items-center min-w-[484px] w-full max-w-[484px] bg-[linear-gradient(164.77deg,#F4F4F5_-5.85%,#FAFAFA_89.65%)] rounded-[16px] p-[1.5px]">
                          <div className="flex flex-col gap-4 w-full rounded-[16px] p-4 bg-white">
                            {/* icon + text */}
                            <div className="flex flex-row gap-4 w-fit justify-between items-center">
                              <CircleAlert
                                size={16}
                                strokeWidth={1}
                                className="text-[#71717A]"
                              />
                              <p className="font-semibold text-[16px] leading-[100%] text-[#71717A]">
                                Issues Found:
                              </p>
                            </div>
                            {/* text list */}
                            <ul className="font-normal text-[14px] leading-[100%] text-[#71717A] list-disc pl-12">
                              <li>All CSS images loading at once.</li>
                              <li>
                                High-resolution images unnecessarily loaded
                                above-the-fold{" "}
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* 2nd Content Box */}
                        <div className="flex justify-center items-center min-w-[484px] w-full max-w-[484px] bg-[linear-gradient(164.77deg,#F4F4F5_-5.85%,#FAFAFA_89.65%)] rounded-[16px] p-[1.5px]">
                          <div className="flex flex-col gap-4 w-full rounded-[16px] p-4 bg-white">
                            {/* icon + text */}
                            <div className="flex flex-row gap-4 w-fit justify-between items-center">
                              <TrendingDown
                                size={16}
                                strokeWidth={1}
                                className="text-[#71717A]"
                              />
                              <p className="font-semibold text-[16px] leading-[100%] text-[#71717A]">
                                Impact:
                              </p>
                            </div>
                            {/* text list */}
                            <ul className="font-normal text-[14px] leading-[100%] text-[#71717A] list-disc pl-12">
                              <li>
                                Increases initial page load time and payload
                              </li>
                              <li>
                                Wastes bandwidth on images users may never see
                              </li>
                              <li>Slows down overall page rendering</li>
                            </ul>
                          </div>
                        </div>

                        {/* 3rd Content Box */}

                        <div className="flex justify-center items-center min-w-[484px] w-full max-w-[484px] bg-[linear-gradient(164.77deg,#E0E7FF_-5.85%,#EEF2FF_89.65%)] rounded-[16px] p-[1.5px]">
                          <div className="flex flex-col gap-4 w-full rounded-[16px] p-4 bg-[linear-gradient(96.26deg,rgba(238,242,255,0.8)_-7.03%,rgba(238,242,255,0.2)_107.44%)]">
                            {/* icon + text */}
                            <div className="flex flex-row gap-4 w-fit justify-between items-center">
                              <Lightbulb
                                size={16}
                                strokeWidth={1}
                                className="text-[#71717A]"
                              />
                              <p className="font-semibold text-[16px] leading-[100%] text-[#71717A]">
                                Resolution:
                              </p>
                            </div>
                            {/* text list */}
                            <ul className="font-normal text-[14px] leading-[100%] text-[#71717A] list-disc pl-12">
                              <li>
                                Serving high-quality images without using the
                                same heavy resolution for all devices.
                              </li>
                              <li>
                                Handling every image inside CSS individually for
                                each device and viewport size.
                              </li>
                            </ul>

                            {/* Last para */}
                            <p className="font-medium text-[14px] leading-[100%] text-indigo-700 pl-7">
                              Lazyloads all CSS background images so they load
                              only when needed.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Div That Contains Image */}
                    <div
                      className={`flex justify-center items-center min-w-[577.7px] w-full max-w-[577.5px] ${
                        scrollTo === 1
                          ? "origin-bottom-left scaleUpRight"
                          : "origin-center scaleUpLeft"
                      }`}
                    >
                      <img
                        src={Scrolldataimage}
                        alt="Scrolling Data Image"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2 Contents */}
                <div
                  className={`bg-[url('@/assets/airlift-dashed-border-scroll.png')] bg-repeat-y bg-[position:42.5px] bg-[length:1.5px_auto] relative row-item ${
                    scrollTo === 2 || scrollTo === 3
                      ? "opacity-100"
                      : "opacity-20"
                  }`}
                >
                  <div className="px-8 pl-[69px] flex flex-row justify-between gap-6 w-full min-h-[581px] h-full max-h-[581px]">
                    {/* Absolute Dot Marker */}
                    <div className="absolute top-[3px] left-[37px] bg-indigo-900 min-w-[13px] w-full max-w-[13px] min-h-[13px] h-full max-h-[13px] rounded-full"></div>
                    {/* Left Div */}
                    <div className="flex flex-col min-w-[577.7px] w-full max-w-[577.5px]">
                      {/* Heading Text */}
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-[20px] leading-[100%] text-indigo-900">
                          Trimming extras, unblocking load, &
                        </p>
                        <p className="font-bold text-[24px] leading-[100%] text-indigo-900">
                          Keeping Only The Fonts You Need.
                        </p>
                      </div>
                      {/* Content Boxes */}
                      <div className="flex flex-col gap-4 p-2 mt-6">
                        {/* 1st Content Box */}
                        <div className="flex justify-center items-center min-w-[484px] w-full max-w-[484px] bg-[linear-gradient(164.77deg,#F4F4F5_-5.85%,#FAFAFA_89.65%)] rounded-[16px] p-[1.5px]">
                          <div className="flex flex-col gap-4 w-full rounded-[16px] p-4 bg-white">
                            {/* icon + text */}
                            <div className="flex flex-row gap-4 w-fit justify-between items-center">
                              <CircleAlert
                                size={16}
                                strokeWidth={1}
                                className="text-[#71717A]"
                              />
                              <p className="font-semibold text-[16px] leading-[100%] text-[#71717A]">
                                Issues Found:
                              </p>
                            </div>
                            {/* text list */}
                            <ul className="font-normal text-[14px] leading-[100%] text-[#71717A] list-disc pl-12">
                              <li>Slow page loading</li>
                              <li>Text flickering</li>
                              <li>Increased bandwidth usage.</li>
                            </ul>
                          </div>
                        </div>

                        {/* 2nd Content Box */}
                        <div className="flex justify-center items-center min-w-[484px] w-full max-w-[484px] bg-[linear-gradient(164.77deg,#F4F4F5_-5.85%,#FAFAFA_89.65%)] rounded-[16px] p-[1.5px]">
                          <div className="flex flex-col gap-4 w-full rounded-[16px] p-4 bg-white">
                            {/* icon + text */}
                            <div className="flex flex-row gap-4 w-fit justify-between items-center">
                              <TrendingDown
                                size={16}
                                strokeWidth={1}
                                className="text-[#71717A]"
                              />
                              <p className="font-semibold text-[16px] leading-[100%] text-[#71717A]">
                                Impact:
                              </p>
                            </div>
                            {/* text list */}
                            <ul className="font-normal text-[14px] leading-[100%] text-[#71717A] list-disc pl-12">
                              <li>Slow page loading</li>
                              <li>Text flickering</li>
                              <li>Increased bandwidth usage.</li>
                            </ul>
                          </div>
                        </div>

                        {/* 3rd Content Box */}

                        <div className="flex justify-center items-center min-w-[484px] w-full max-w-[484px] bg-[linear-gradient(164.77deg,#E0E7FF_-5.85%,#EEF2FF_89.65%)] rounded-[16px] p-[1.5px]">
                          <div className="flex flex-col gap-4 w-full rounded-[16px] p-4 bg-[linear-gradient(96.26deg,rgba(238,242,255,0.8)_-7.03%,rgba(238,242,255,0.2)_107.44%)]">
                            {/* icon + text */}
                            <div className="flex flex-row gap-4 w-fit justify-between items-center">
                              <Lightbulb
                                size={16}
                                strokeWidth={1}
                                className="text-[#71717A]"
                              />
                              <p className="font-semibold text-[16px] leading-[100%] text-[#71717A]">
                                Resolution:
                              </p>
                            </div>
                            {/* text list */}
                            <ul className="font-normal text-[14px] leading-[100%] text-[#71717A] list-disc pl-12">
                              <li>Analyzing all fonts used on the site</li>
                              <li>Removing unused characters (subsetting)</li>
                              <li>Serving smaller font files. </li>
                            </ul>

                            {/* Last para */}
                            <p className="font-medium text-[14px] leading-[100%] text-indigo-700 pl-7">
                              Smart fallback fonts ensure text is always visible
                              while the main fonts load, and caching makes sure
                              fonts aren’t downloaded repeatedly.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Div That Contains Image */}
                    <div
                      className={`flex justify-center items-center min-w-[577.7px] w-full max-w-[577.5px] ${
                        scrollTo === 2
                          ? "origin-bottom-left scaleUpRight"
                          : "origin-center scaleUpLeft"
                      }`}
                    >
                      <img
                        src={Scrolldataimagetwo}
                        alt="Scrolling Data Image"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3 Contents */}
                <div
                  className={`bg-[url('@/assets/airlift-dashed-border-scroll.png')] bg-repeat-y bg-[position:42.5px] bg-[length:1.5px_auto] relative row-item ${
                    scrollTo === 3 || scrollTo === 4
                      ? "opacity-100"
                      : "opacity-20"
                  }`}
                >
                  <div className="px-8 pl-[69px] flex flex-row justify-between gap-6 w-full min-h-[581px] h-full max-h-[581px]">
                    {/* Absolute Dot Marker */}
                    <div className="absolute top-[3px] left-[37px] bg-indigo-900 min-w-[13px] w-full max-w-[13px] min-h-[13px] h-full max-h-[13px] rounded-full"></div>
                    {/* Left Div */}
                    <div className="flex flex-col min-w-[577.7px] w-full max-w-[577.5px]">
                      {/* Heading Text */}
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-[20px] leading-[100%] text-indigo-900">
                          Styles, simplified — no bloat, no stalls.
                        </p>
                        <p className="font-bold text-[24px] leading-[100%] text-indigo-900">
                          Just a Calm & Fast Responsive Page.
                        </p>
                      </div>
                      {/* Content Boxes */}
                      <div className="flex flex-col gap-4 p-2 mt-6">
                        {/* 1st Content Box */}
                        <div className="flex justify-center items-center min-w-[484px] w-full max-w-[484px] bg-[linear-gradient(164.77deg,#F4F4F5_-5.85%,#FAFAFA_89.65%)] rounded-[16px] p-[1.5px]">
                          <div className="flex flex-col gap-4 w-full rounded-[16px] p-4 bg-white">
                            {/* icon + text */}
                            <div className="flex flex-row gap-4 w-fit justify-between items-center">
                              <CircleAlert
                                size={16}
                                strokeWidth={1}
                                className="text-[#71717A]"
                              />
                              <p className="font-semibold text-[16px] leading-[100%] text-[#71717A]">
                                Issues Found:
                              </p>
                            </div>
                            {/* text list */}
                            <ul className="font-normal text-[14px] leading-[100%] text-[#71717A] list-disc pl-12">
                              <li>Redundant styles loading unnecessarily</li>
                              <li>Large chunks of unused CSS</li>
                            </ul>
                          </div>
                        </div>

                        {/* 2nd Content Box */}
                        <div className="flex justify-center items-center min-w-[484px] w-full max-w-[484px] bg-[linear-gradient(164.77deg,#F4F4F5_-5.85%,#FAFAFA_89.65%)] rounded-[16px] p-[1.5px]">
                          <div className="flex flex-col gap-4 w-full rounded-[16px] p-4 bg-white">
                            {/* icon + text */}
                            <div className="flex flex-row gap-4 w-fit justify-between items-center">
                              <TrendingDown
                                size={16}
                                strokeWidth={1}
                                className="text-[#71717A]"
                              />
                              <p className="font-semibold text-[16px] leading-[100%] text-[#71717A]">
                                Impact:
                              </p>
                            </div>
                            {/* text list */}
                            <ul className="font-normal text-[14px] leading-[100%] text-[#71717A] list-disc pl-12">
                              <li>
                                Heavier payload leading to slower page load
                                times
                              </li>
                              <li>Delay rendering on mobile devices</li>
                              <li>
                                Increased bandwidth consumption for returning
                                users
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* 3rd Content Box */}

                        <div className="flex justify-center items-center min-w-[484px] w-full max-w-[484px] bg-[linear-gradient(164.77deg,#E0E7FF_-5.85%,#EEF2FF_89.65%)] rounded-[16px] p-[1.5px]">
                          <div className="flex flex-col gap-4 w-full rounded-[16px] p-4 bg-[linear-gradient(96.26deg,rgba(238,242,255,0.8)_-7.03%,rgba(238,242,255,0.2)_107.44%)]">
                            {/* icon + text */}
                            <div className="flex flex-row gap-4 w-fit justify-between items-center">
                              <Lightbulb
                                size={16}
                                strokeWidth={1}
                                className="text-[#71717A]"
                              />
                              <p className="font-semibold text-[16px] leading-[100%] text-[#71717A]">
                                Resolution:
                              </p>
                            </div>
                            {/* text list */}
                            <ul className="font-normal text-[14px] leading-[100%] text-[#71717A] list-disc pl-12">
                              <li>Scanning and removing unused CSS.</li>
                              <li>Keeping only relevant styles.</li>
                              <li>Minifying the final CSS files.</li>
                            </ul>

                            {/* Last para */}
                            <p className="font-medium text-[14px] leading-[100%] text-indigo-700 pl-7">
                              Unused CSS trim unused CSS intelligently without
                              breaking page layouts, keeping your styling intact
                              while reducing size by up to 70%.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Div That Contains Image */}
                    <div
                      className={`flex justify-center items-center min-w-[577.7px] w-full max-w-[577.5px] ${
                        scrollTo === 3
                          ? "origin-bottom-left scaleUpRight"
                          : "origin-center scaleUpLeft"
                      }`}
                    >
                      <img
                        src={Scrolldataimagethree}
                        alt="Scrolling Data Image"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 4 Contents */}
                <div
                  className={`bg-[url('@/assets/airlift-dashed-border-scroll.png')] bg-repeat-y bg-[position:42.5px] bg-[length:1.5px_auto] relative row-item ${
                    scrollTo === 4 || scrollTo === 1
                      ? "opacity-100"
                      : "opacity-20"
                  }`}
                >
                  <div className="px-8 pl-[69px] flex flex-row justify-between gap-6 w-full min-h-[581px] h-full max-h-[581px]">
                    {/* Absolute Dot Marker */}
                    <div className="absolute top-[3px] left-[37px] bg-indigo-900 min-w-[13px] w-full max-w-[13px] min-h-[13px] h-full max-h-[13px] rounded-full"></div>
                    {/* Left Div */}
                    <div className="flex flex-col min-w-[577.7px] w-full max-w-[577.5px]">
                      {/* Heading Text */}
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-[20px] leading-[100%] text-indigo-900">
                          From bulky to balanced — Clean, conflict-free
                        </p>
                        <p className="font-bold text-[24px] leading-[100%] text-indigo-900">
                          Scripts that keep Interactions Smooth.
                        </p>
                      </div>
                      {/* Content Boxes */}
                      <div className="flex flex-col gap-4 p-2 mt-6">
                        {/* 1st Content Box */}
                        <div className="flex justify-center items-center min-w-[484px] w-full max-w-[484px] bg-[linear-gradient(164.77deg,#F4F4F5_-5.85%,#FAFAFA_89.65%)] rounded-[16px] p-[1.5px]">
                          <div className="flex flex-col gap-4 w-full rounded-[16px] p-4 bg-white">
                            {/* icon + text */}
                            <div className="flex flex-row gap-4 w-fit justify-between items-center">
                              <CircleAlert
                                size={16}
                                strokeWidth={1}
                                className="text-[#71717A]"
                              />
                              <p className="font-semibold text-[16px] leading-[100%] text-[#71717A]">
                                Issues Found:
                              </p>
                            </div>
                            {/* text list */}
                            <ul className="font-normal text-[14px] leading-[100%] text-[#71717A] list-disc pl-12">
                              <li>
                                Heavy, unoptimized JavaScript files blocking
                                rendering{" "}
                              </li>
                              <li>
                                Dependencies loaded in incorrect order causing
                                errors.
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* 2nd Content Box */}
                        <div className="flex justify-center items-center min-w-[484px] w-full max-w-[484px] bg-[linear-gradient(164.77deg,#F4F4F5_-5.85%,#FAFAFA_89.65%)] rounded-[16px] p-[1.5px]">
                          <div className="flex flex-col gap-4 w-full rounded-[16px] p-4 bg-white">
                            {/* icon + text */}
                            <div className="flex flex-row gap-4 w-fit justify-between items-center">
                              <TrendingDown
                                size={16}
                                strokeWidth={1}
                                className="text-[#71717A]"
                              />
                              <p className="font-semibold text-[16px] leading-[100%] text-[#71717A]">
                                Impact:
                              </p>
                            </div>
                            {/* text list */}
                            <ul className="font-normal text-[14px] leading-[100%] text-[#71717A] list-disc pl-12">
                              <li>
                                Page interactivity delayed, slower
                                Time-to-Interactive (TTI)
                              </li>
                              <li>
                                Broken functionalities if JS execution order
                                fails
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* 3rd Content Box */}

                        <div className="flex justify-center items-center min-w-[484px] w-full max-w-[484px] bg-[linear-gradient(164.77deg,#E0E7FF_-5.85%,#EEF2FF_89.65%)] rounded-[16px] p-[1.5px]">
                          <div className="flex flex-col gap-4 w-full rounded-[16px] p-4 bg-[linear-gradient(96.26deg,rgba(238,242,255,0.8)_-7.03%,rgba(238,242,255,0.2)_107.44%)]">
                            {/* icon + text */}
                            <div className="flex flex-row gap-4 w-fit justify-between items-center">
                              <Lightbulb
                                size={16}
                                strokeWidth={1}
                                className="text-[#71717A]"
                              />
                              <p className="font-semibold text-[16px] leading-[100%] text-[#71717A]">
                                Resolution:
                              </p>
                            </div>
                            {/* text list */}
                            <ul className="font-normal text-[14px] leading-[100%] text-[#71717A] list-disc pl-12">
                              <li>
                                Using a 3-layer JavaScript aggregation to manage
                                load order efficiently.
                              </li>
                              <li>
                                Loading non-critical JS asynchronously to
                                improve speed.
                              </li>
                            </ul>

                            {/* Last para */}
                            <p className="font-medium text-[14px] leading-[100%] text-indigo-700 pl-7">
                              Our 3-layer mechanism ensures zero site breakages
                              while delivering faster execution and reduced load
                              times.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Div That Contains Image */}
                    <div
                      className={`flex justify-center items-center min-w-[577.7px] w-full max-w-[577.5px] ${
                        scrollTo === 4
                          ? "origin-bottom-left scaleUpRight"
                          : "origin-center scaleUpLeft"
                      }`}
                    >
                      <img
                        src={Scrolldataimagefour}
                        alt="Scrolling Data Image"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressDashboard;
