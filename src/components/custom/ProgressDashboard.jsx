import React, { useState, useEffect, useRef } from "react";
import Dottedborder from "@/assets/airlift-dotted-border-left.png";
import {
  CircleAlert,
  FileCode,
  Lightbulb,
  Settings2,
  TrendingDown,
} from "lucide-react";
import Scrolldataimage from "@/assets/airlift-scrolling-data-img-right.png";
import Scrolldataimagetwo from "@/assets/airlift-scrolling-data-img-right-2.png";
import ScrolldataimagetwoGif from "@/assets/airlift-scrolling-data-img-right-2-gif.gif";
import Scrolldataimagethree from "@/assets/airlift-scrolling-data-img-right-3.png";
import JsIcon from "@/assets/js-icon.png";
import JSReqImg from "@/assets/scroll-js-request-bottom-img.png";
// import Scrolldataimagefour from "@/assets/airlift-scrolling-data-img-right-4.png";

const ProgressDashboard = () => {
  const [scrollTo, setScrollTo] = useState(1); // 1,2,3,4
  const [play, setPlay] = useState(false);

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

  // For js Animation Looping
  useEffect(() => {
    if (scrollTo === 4) {
      setPlay(true);
    } else {
      setPlay(false);
    }
  }, [scrollTo]);

  // Looping control for tab-3 animations
  useEffect(() => {
    let intervalId;
    let pulseTimeout;

    const totalDuration = 3301 + 800 + 2000; // last delay + animation duration + 2s hold

    if (scrollTo === 4) {
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
  }, [scrollTo]);

  return (
    <>
      {/* Main div */}
      <div className="flex min-w-[1280px] w-full max-w-[1280px]">
        {/* inner main */}
        <div className="bg-[url('@/assets/airlift-dotted-border-left.png')] bg-no-repeat bg-[position:42.5px] bg-[length:1.5px_758px] w-full">
          {/* top div with button and text */}
          <div className="flex flex-row justify-between items-center px-8 pl-[68px] pt-10">
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
              className="flex flex-col min-h-[674px] h-full max-h-[674px] relative overflow-hidden"
              ref={viewportRef}
            >
              <div
                ref={innerRef}
                className="flex flex-col will-change-transform"
              >
                {/* Row 1 Contents */}
                <div className={`relative row-item`}>
                  <div className="px-8 pl-[69px] flex flex-row justify-between gap-6 w-full min-h-[581px] h-full max-h-[581px]">
                    {/* Absolute Dot Marker */}
                    <div className="absolute top-[33.5px] left-[37px] bg-indigo-900 min-w-[13px] w-full max-w-[13px] min-h-[13px] h-full max-h-[13px] rounded-full"></div>
                    {/* Left Div */}
                    <div className="flex flex-col min-w-[577.7px] w-full max-w-[577.5px] pt-7">
                      {/* Heading Text */}
                      <div
                        className={`flex flex-col ${
                          scrollTo === 1 || scrollTo === 2
                            ? "gap-1 min-h-[57px]"
                            : "gap-[3px] min-h-[43px]"
                        } justify-between`}
                      >
                        <p
                          className={`${
                            scrollTo === 1 || scrollTo === 2
                              ? "text-[20px] "
                              : "text-[15px]"
                          } leading-[120%] font-semibold text-indigo-900`}
                        >
                          Images now fit the moment.
                        </p>
                        <p
                          className={`${
                            scrollTo === 1 || scrollTo === 2
                              ? " text-[24px]"
                              : "text-[18px]"
                          } font-bold leading-[120%] text-indigo-900`}
                        >
                          Smaller Files, Smarter Timing & No Waiting!
                        </p>
                      </div>
                      {/* Content Boxes */}
                      <div className="flex flex-col gap-4 p-2 mt-6">
                        {/* 1st Content Box */}
                        <div className="flex justify-center items-center min-w-[484px] w-full max-w-[484px] bg-[linear-gradient(164.77deg,#F4F4F5_-5.85%,#FAFAFA_89.65%)] rounded-[16px] p-[1.5px]">
                          <div className="flex flex-col gap-4 w-full rounded-[16px] py-4 px-[14.5px] bg-[linear-gradient(179.47deg,#FAFAFA_-23.45%,#FFFFFF_34.79%)]">
                            {/* icon + text */}
                            <div className="flex flex-row gap-4 w-fit justify-between items-center">
                              <CircleAlert
                                size={16}
                                strokeWidth={1}
                                className="shrink-0 text-[#71717A]"
                              />
                              <p className="font-semibold text-[16px] leading-[120%] text-[#71717A]">
                                Issues Found:
                              </p>
                            </div>
                            {/* text list */}
                            <ul className="font-normal text-[14px] leading-[120%] text-[#71717A] list-disc pl-12">
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
                          <div className="flex flex-col gap-4 w-full rounded-[16px] py-4 px-[14.5px] bg-[linear-gradient(179.47deg,#FAFAFA_-23.45%,#FFFFFF_34.79%)]">
                            {/* icon + text */}
                            <div className="flex flex-row gap-4 w-fit justify-between items-center">
                              <TrendingDown
                                size={16}
                                strokeWidth={1}
                                className="shrink-0 text-[#71717A]"
                              />
                              <p className="font-semibold text-[16px] leading-[120%] text-[#71717A]">
                                Impact:
                              </p>
                            </div>
                            {/* text list */}
                            <ul className="font-normal text-[14px] leading-[120%] text-[#71717A] list-disc pl-12">
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
                          <div className="flex flex-col w-full bg-white rounded-[14.5px]">
                            <div className="flex flex-col gap-4 w-full rounded-[14.5px] p-[14.5px] bg-[linear-gradient(96.26deg,rgba(238,242,255,0.8)_-7.03%,rgba(238,242,255,0.2)_107.44%)]">
                              {/* icon + text */}
                              <div className="flex flex-row gap-4 w-fit justify-between items-center">
                                <Lightbulb
                                  size={16}
                                  strokeWidth={1}
                                  className="shrink-0 text-[#71717A]"
                                />
                                <p className="font-semibold text-[16px] leading-[120%] text-[#71717A]">
                                  Resolution:
                                </p>
                              </div>
                              {/* text list */}
                              <ul className="font-normal text-[14px] leading-[120%] text-[#71717A] list-disc pl-12">
                                <li>
                                  Serving high-quality images without using the
                                  same heavy resolution for all devices.
                                </li>
                                <li>
                                  Handling every image inside CSS individually
                                  for each device and viewport size.
                                </li>
                              </ul>

                              {/* Last para */}
                              <p className="font-medium text-[14px] leading-[120%] text-indigo-700 pl-7">
                                Lazyloads all CSS background images so they load
                                only when needed.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Div That Contains Image */}
                    <div
                      className={`flex justify-center items-center min-w-[415.14px] w-full max-w-[415.14px] min-h-[286.67px] h-full max-h-[286.67px] self-center ${
                        scrollTo === 1
                          ? "origin-bottom-left scaleUpRight"
                          : "origin-center scaleUpLeft"
                      }`}
                    >
                      <img
                        src={Scrolldataimage}
                        alt="Scrolling Data Image"
                        className="object-contain h-[286.67px] w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2 Contents */}
                <div
                  className={`relative row-item ${
                    scrollTo === 2 || scrollTo === 3
                      ? "opacity-100"
                      : "opacity-20"
                  }`}
                >
                  <div className="px-8 pl-[69px] flex flex-row justify-between gap-6 w-full min-h-[581px] h-full max-h-[581px]">
                    {/* Absolute Dot Marker */}
                    <div className="absolute top-[33.5px] left-[37px] bg-indigo-900 min-w-[13px] w-full max-w-[13px] min-h-[13px] h-full max-h-[13px] rounded-full"></div>
                    {/* Left Div */}
                    <div className="flex flex-col min-w-[577.7px] w-full max-w-[577.5px] pt-7">
                      {/* Heading Text */}
                      <div
                        className={`flex flex-col ${
                          scrollTo === 2 || scrollTo === 3
                            ? "gap-1 min-h-[57px]"
                            : "gap-[3px] min-h-[43px]"
                        } justify-between`}
                      >
                        <p
                          className={`${
                            scrollTo === 2 || scrollTo === 3
                              ? "text-[20px] "
                              : "text-[15px]"
                          } leading-[120%] font-semibold text-indigo-900`}
                        >
                          Trimming extras, unblocking load, &
                        </p>
                        <p
                          className={`${
                            scrollTo === 2 || scrollTo === 3
                              ? " text-[24px]"
                              : "text-[18px]"
                          } font-bold leading-[120%] text-indigo-900`}
                        >
                          Keeping Only The Fonts You Need.
                        </p>
                      </div>
                      {/* Content Boxes */}
                      <div className="flex flex-col gap-4 p-2 mt-6">
                        {/* 1st Content Box */}
                        <div className="flex justify-center items-center min-w-[484px] w-full max-w-[484px] bg-[linear-gradient(164.77deg,#F4F4F5_-5.85%,#FAFAFA_89.65%)] rounded-[16px] p-[1.5px]">
                          <div className="flex flex-col gap-4 w-full rounded-[16px] py-4 px-[14.5px] bg-[linear-gradient(179.47deg,#FAFAFA_-23.45%,#FFFFFF_34.79%)]">
                            {/* icon + text */}
                            <div className="flex flex-row gap-4 w-fit justify-between items-center">
                              <CircleAlert
                                size={16}
                                strokeWidth={1}
                                className="shrink-0 text-[#71717A]"
                              />
                              <p className="font-semibold text-[16px] leading-[120%] text-[#71717A]">
                                Issues Found:
                              </p>
                            </div>
                            {/* text list */}
                            <ul className="font-normal text-[14px] leading-[120%] text-[#71717A] list-disc pl-12">
                              <li>Large font files</li>
                              <li>Missing fallbacks</li>
                            </ul>
                          </div>
                        </div>

                        {/* 2nd Content Box */}
                        <div className="flex justify-center items-center min-w-[484px] w-full max-w-[484px] bg-[linear-gradient(164.77deg,#F4F4F5_-5.85%,#FAFAFA_89.65%)] rounded-[16px] p-[1.5px]">
                          <div className="flex flex-col gap-4 w-full rounded-[16px] py-4 px-[14.5px] bg-[linear-gradient(179.47deg,#FAFAFA_-23.45%,#FFFFFF_34.79%)]">
                            {/* icon + text */}
                            <div className="flex flex-row gap-4 w-fit justify-between items-center">
                              <TrendingDown
                                size={16}
                                strokeWidth={1}
                                className="shrink-0 text-[#71717A]"
                              />
                              <p className="font-semibold text-[16px] leading-[120%] text-[#71717A]">
                                Impact:
                              </p>
                            </div>
                            {/* text list */}
                            <ul className="font-normal text-[14px] leading-[120%] text-[#71717A] list-disc pl-12">
                              <li>Slow page loading</li>
                              <li>Text flickering</li>
                              <li>Increased bandwidth usage.</li>
                            </ul>
                          </div>
                        </div>

                        {/* 3rd Content Box */}

                        <div className="flex justify-center items-center min-w-[484px] w-full max-w-[484px] bg-[linear-gradient(164.77deg,#E0E7FF_-5.85%,#EEF2FF_89.65%)] rounded-[16px] p-[1.5px]">
                          <div className="flex flex-col w-full bg-white rounded-[14.5px]">
                            <div className="flex flex-col gap-4 w-full rounded-[14.5px] p-[14.5px] bg-[linear-gradient(96.26deg,rgba(238,242,255,0.8)_-7.03%,rgba(238,242,255,0.2)_107.44%)]">
                              {/* icon + text */}
                              <div className="flex flex-row gap-4 w-fit justify-between items-center">
                                <Lightbulb
                                  size={16}
                                  strokeWidth={1}
                                  className="shrink-0 text-[#71717A]"
                                />
                                <p className="font-semibold text-[16px] leading-[120%] text-[#71717A]">
                                  Resolution:
                                </p>
                              </div>
                              {/* text list */}
                              <ul className="font-normal text-[14px] leading-[120%] text-[#71717A] list-disc pl-12">
                                <li>Analyzing all fonts used on the site</li>
                                <li>Removing unused characters (subsetting)</li>
                                <li>Serving smaller font files. </li>
                              </ul>

                              {/* Last para */}
                              <p className="font-medium text-[14px] leading-[120%] text-indigo-700 pl-7">
                                Smart fallback fonts ensure text is always
                                visible while the main fonts load, and caching
                                makes sure fonts aren’t downloaded repeatedly.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Div That Contains Image */}
                    <div
                      className={`flex items-center relative min-w-[577.7px] w-full max-w-[577.5px] ${
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
                      <div className="flex w-[61px] h-[47px] justify-center items-center self-stretch absolute transform-gpu translate-x-[454px] translate-y-[322.5px]">
                        <img
                          src={ScrolldataimagetwoGif}
                          alt="Scrolling Data Gif"
                          className="w-full h-[47px] object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 3 Contents */}
                <div
                  className={`relative row-item ${
                    scrollTo === 3 || scrollTo === 4
                      ? "opacity-100"
                      : "opacity-20"
                  }`}
                >
                  <div className="px-8 pl-[69px] flex flex-row justify-between gap-6 w-full min-h-[581px] h-full max-h-[581px]">
                    {/* Absolute Dot Marker */}
                    <div className="absolute top-[33.5px] left-[37px] bg-indigo-900 min-w-[13px] w-full max-w-[13px] min-h-[13px] h-full max-h-[13px] rounded-full"></div>
                    {/* Left Div */}
                    <div className="flex flex-col min-w-[577.7px] w-full max-w-[577.5px] pt-7">
                      {/* Heading Text */}
                      <div
                        className={`flex flex-col ${
                          scrollTo === 3 || scrollTo === 4
                            ? "gap-1 min-h-[57px]"
                            : "gap-[3px] min-h-[43px]"
                        } justify-between`}
                      >
                        <p
                          className={`${
                            scrollTo === 3 || scrollTo === 4
                              ? "text-[20px] "
                              : "text-[15px]"
                          } leading-[120%] font-semibold text-indigo-900`}
                        >
                          Styles, simplified — no bloat, no stalls.
                        </p>
                        <p
                          className={`${
                            scrollTo === 3 || scrollTo === 4
                              ? " text-[24px]"
                              : "text-[18px]"
                          } font-bold leading-[120%] text-indigo-900`}
                        >
                          Just a Calm & Fast Responsive Page.
                        </p>
                      </div>
                      {/* Content Boxes */}
                      <div className="flex flex-col gap-4 p-2 mt-6">
                        {/* 1st Content Box */}
                        <div className="flex justify-center items-center min-w-[484px] w-full max-w-[484px] bg-[linear-gradient(164.77deg,#F4F4F5_-5.85%,#FAFAFA_89.65%)] rounded-[16px] p-[1.5px]">
                          <div className="flex flex-col gap-4 w-full rounded-[16px] py-4 px-[14.5px] bg-[linear-gradient(179.47deg,#FAFAFA_-23.45%,#FFFFFF_34.79%)]">
                            {/* icon + text */}
                            <div className="flex flex-row gap-4 w-fit justify-between items-center">
                              <CircleAlert
                                size={16}
                                strokeWidth={1}
                                className="shrink-0 text-[#71717A]"
                              />
                              <p className="font-semibold text-[16px] leading-[120%] text-[#71717A]">
                                Issues Found:
                              </p>
                            </div>
                            {/* text list */}
                            <ul className="font-normal text-[14px] leading-[120%] text-[#71717A] list-disc pl-12">
                              <li>Redundant styles loading unnecessarily</li>
                              <li>Large chunks of unused CSS</li>
                            </ul>
                          </div>
                        </div>

                        {/* 2nd Content Box */}
                        <div className="flex justify-center items-center min-w-[484px] w-full max-w-[484px] bg-[linear-gradient(164.77deg,#F4F4F5_-5.85%,#FAFAFA_89.65%)] rounded-[16px] p-[1.5px]">
                          <div className="flex flex-col gap-4 w-full rounded-[16px] py-4 px-[14.5px] bg-[linear-gradient(179.47deg,#FAFAFA_-23.45%,#FFFFFF_34.79%)]">
                            {/* icon + text */}
                            <div className="flex flex-row gap-4 w-fit justify-between items-center">
                              <TrendingDown
                                size={16}
                                strokeWidth={1}
                                className="shrink-0 text-[#71717A]"
                              />
                              <p className="font-semibold text-[16px] leading-[120%] text-[#71717A]">
                                Impact:
                              </p>
                            </div>
                            {/* text list */}
                            <ul className="font-normal text-[14px] leading-[120%] text-[#71717A] list-disc pl-12">
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
                          <div className="flex flex-col w-full bg-white rounded-[14.5px]">
                            <div className="flex flex-col gap-4 w-full rounded-[14.5px] p-[14.5px] bg-[linear-gradient(96.26deg,rgba(238,242,255,0.8)_-7.03%,rgba(238,242,255,0.2)_107.44%)]">
                              {/* icon + text */}
                              <div className="flex flex-row gap-4 w-fit justify-between items-center">
                                <Lightbulb
                                  size={16}
                                  strokeWidth={1}
                                  className="shrink-0 text-[#71717A]"
                                />
                                <p className="font-semibold text-[16px] leading-[120%] text-[#71717A]">
                                  Resolution:
                                </p>
                              </div>
                              {/* text list */}
                              <ul className="font-normal text-[14px] leading-[120%] text-[#71717A] list-disc pl-12">
                                <li>Scanning and removing unused CSS.</li>
                                <li>Keeping only relevant styles.</li>
                                <li>Minifying the final CSS files.</li>
                              </ul>

                              {/* Last para */}
                              <p className="font-medium text-[14px] leading-[120%] text-indigo-700 pl-7">
                                Unused CSS trim unused CSS intelligently without
                                breaking page layouts, keeping your styling
                                intact while reducing size by up to 70%.
                              </p>
                            </div>
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
                  className={`relative row-item ${
                    scrollTo === 4 || scrollTo === 1
                      ? "opacity-100"
                      : "opacity-20"
                  }`}
                >
                  <div className="px-8 pl-[69px] flex flex-row justify-between gap-6 w-full min-h-[581px] h-full max-h-[581px]">
                    {/* Absolute Dot Marker */}
                    <div className="absolute top-[33.5px] left-[37px] bg-indigo-900 min-w-[13px] w-full max-w-[13px] min-h-[13px] h-full max-h-[13px] rounded-full"></div>
                    {/* Left Div */}
                    <div className="flex flex-col min-w-[577.7px] w-full max-w-[577.5px] pt-7">
                      {/* Heading Text */}
                      <div
                        className={`flex flex-col ${
                          scrollTo === 4 || scrollTo === 1
                            ? "gap-1 min-h-[57px]"
                            : "gap-[3px] min-h-[43px]"
                        } justify-between`}
                      >
                        <p
                          className={`${
                            scrollTo === 4 || scrollTo === 1
                              ? "text-[20px] "
                              : "text-[15px]"
                          } leading-[120%] font-semibold text-indigo-900`}
                        >
                          From bulky to balanced — Clean, conflict-free
                        </p>
                        <p
                          className={`${
                            scrollTo === 4 || scrollTo === 1
                              ? " text-[24px]"
                              : "text-[18px]"
                          } font-bold leading-[120%] text-indigo-900`}
                        >
                          Scripts that keep Interactions Smooth.
                        </p>
                      </div>
                      {/* Content Boxes */}
                      <div className="flex flex-col gap-4 p-2 mt-6">
                        {/* 1st Content Box */}
                        <div className="flex justify-center items-center min-w-[484px] w-full max-w-[484px] bg-[linear-gradient(164.77deg,#F4F4F5_-5.85%,#FAFAFA_89.65%)] rounded-[16px] p-[1.5px]">
                          <div className="flex flex-col gap-4 w-full rounded-[16px] py-4 px-[14.5px] bg-[linear-gradient(179.47deg,#FAFAFA_-23.45%,#FFFFFF_34.79%)]">
                            {/* icon + text */}
                            <div className="flex flex-row gap-4 w-fit justify-between items-center">
                              <CircleAlert
                                size={16}
                                strokeWidth={1}
                                className="shrink-0 text-[#71717A]"
                              />
                              <p className="font-semibold text-[16px] leading-[120%] text-[#71717A]">
                                Issues Found:
                              </p>
                            </div>
                            {/* text list */}
                            <ul className="font-normal text-[14px] leading-[120%] text-[#71717A] list-disc pl-12">
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
                          <div className="flex flex-col gap-4 w-full rounded-[16px] py-4 px-[14.5px] bg-[linear-gradient(179.47deg,#FAFAFA_-23.45%,#FFFFFF_34.79%)]">
                            {/* icon + text */}
                            <div className="flex flex-row gap-4 w-fit justify-between items-center">
                              <TrendingDown
                                size={16}
                                strokeWidth={1}
                                className="shrink-0 text-[#71717A]"
                              />
                              <p className="font-semibold text-[16px] leading-[120%] text-[#71717A]">
                                Impact:
                              </p>
                            </div>
                            {/* text list */}
                            <ul className="font-normal text-[14px] leading-[120%] text-[#71717A] list-disc pl-12">
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
                          <div className="flex flex-col w-full bg-white rounded-[14.5px]">
                            <div className="flex flex-col gap-4 w-full rounded-[14.5px] p-[14.5px] bg-[linear-gradient(96.26deg,rgba(238,242,255,0.8)_-7.03%,rgba(238,242,255,0.2)_107.44%)]">
                              {/* icon + text */}
                              <div className="flex flex-row gap-4 w-fit justify-between items-center">
                                <Lightbulb
                                  size={16}
                                  strokeWidth={1}
                                  className="shrink-0 text-[#71717A]"
                                />
                                <p className="font-semibold text-[16px] leading-[120%] text-[#71717A]">
                                  Resolution:
                                </p>
                              </div>
                              {/* text list */}
                              <ul className="font-normal text-[14px] leading-[120%] text-[#71717A] list-disc pl-12">
                                <li>
                                  Using a 3-layer JavaScript aggregation to
                                  manage load order efficiently.
                                </li>
                                <li>
                                  Loading non-critical JS asynchronously to
                                  improve speed.
                                </li>
                              </ul>

                              {/* Last para */}
                              <p className="font-medium text-[14px] leading-[120%] text-indigo-700 pl-7">
                                Our 3-layer mechanism ensures zero site
                                breakages while delivering faster execution and
                                reduced load times.
                              </p>
                            </div>
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
                      {/* <img
                        src={Scrolldataimagefour}
                        alt="Scrolling Data Image"
                        className="object-contain"
                      /> */}
                      <div className="max-w-[458px] w-full min-w-[458px] max-h-[469px] h-full min-h-[469px] flex flex-col items-center grow relative overflow-hidden">
                        {/* Top Part */}
                        <div
                          className={`scrollto4-container ${
                            play ? "play" : ""
                          } w-full min-h-[265px] h-full max-h-[265px] pt-[18.5px] pl-[69px] pr-[68px] relative`} //flex items-center justify-center
                        >
                          <div className="flex flex-col w-full h-full">
                            <div className="box-top-div flex justify-center mx-8 pb-[5.5px]">
                              <div className="flex items-center justify-center min-w-10 w-full max-w-10 min-h-10 h-full max-h-10 border-[0.5px] border-solid border-[#E4E4E7] p-2 rounded-[8px] transform-gpu">
                                <FileCode
                                  size={16}
                                  strokeWidth={1}
                                  className="shrink-0 text-indigo-400"
                                />
                                <div className="flex w-[1px] h-[71px] absolute left-1/2 top-full bg-transparent">
                                  <div
                                    className="w-full h-full relative bg-transparent before:content-[''] before:absolute before:left-0 before:top-0 before:h-0 before:max-h-[26px] before:w-[1px] before:bg-[repeating-linear-gradient(to_bottom,#C7D2FE_0_4px,transparent_4px_9px)] ani-y-before
                after:content-[''] after:absolute after:left-0 after:top-[26px] after:h-0 after:max-h-[45px] after:w-[1px] after:bg-[repeating-linear-gradient(to_bottom,#C7D2FE_0_4px,transparent_4px_9px)] ani-y-after"
                                  >
                                    <div className="flex min-w-1.5 w-full max-w-1.5 min-h-1.5 h-full max-h-1.5 bg-indigo-200 transform-gpu rotate-45 absolute left-1/2 translate-x-[-50%] top-[26px] icon-move-down opacity-0"></div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="box-center-div flex justify-between mx-8 mb-[25px]">
                              <div className="flex items-center justify-center min-w-10 w-full max-w-10 min-h-10 h-full max-h-10 border-[0.5px] border-solid border-[#E4E4E7] p-2 rounded-[8px] transform-gpu relative">
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

                              <div className="flex items-center justify-center min-w-10 w-full max-w-10 min-h-10 h-full max-h-10 border-[0.5px] border-solid border-[#E4E4E7] p-2 rounded-[8px] transform-gpu relative">
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
                              <div className="flex items-center justify-center min-w-10 w-full max-w-10 min-h-10 h-full max-h-10 border-[0.5px] border-solid border-[#E4E4E7] p-2 rounded-[8px] transform-gpu relative">
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

                              <div className="flex items-center justify-center min-w-10 w-full max-w-10 min-h-10 h-full max-h-10 border-[0.5px] border-solid border-[#E4E4E7] p-2 rounded-[8px] transform-gpu relative">
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

                        {/* Bottom Part */}
                        <div className="flex min-w-[386px] w-full max-w-[386px] min-h-[204px] h-full max-h-[204px] items-center justify-center bg-white mx-9">
                          <img
                            src={JSReqImg}
                            alt=""
                            className="w-full h-[204px] object-contain"
                          />
                        </div>
                      </div>
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
