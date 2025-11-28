import React, { useState, useEffect, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Check,
  FileChartColumnIncreasing,
  FileCode,
  FileScan,
  LoaderCircle,
  MonitorSmartphone,
  RadioTower,
  Repeat2,
  Sparkles,
  SquareActivity,
  TrendingUp,
  Type,
  Zap,
} from "lucide-react";
import AnimationCircle from "./AnimationCircle.jsx";
import Blur from "@/assets/Airlift-blur-1.webp";
import PlugGif from "@/assets/Plug.gif";
import InstallStep from "@/assets/install-step-img.webp";
import BoxBg from "@/assets/airlift-animation-box-bg.webp";
import Placeholder from "@/assets/airlift-placeholder.png";
// import Blurbg from "@/assets/airlift-loader-bg-blur.png";
import Bluricons from "@/assets/airlift-blur-icon.png";
import Step5BG from "@/assets/step-5-bg.webp";
import ConfigGif from "@/assets/airlift-configuration.gif";
import JsIcon from "@/assets/js-icon.png";
import JSReqImg from "@/assets/airlift-js-request-img.png";

const Animations = () => {
  const [airliftEnabled, setAirliftEnabled] = useState(true);
  // start with transitions disabled so initial render doesn't animate
  const [switchNoTransition, setSwitchNoTransition] = useState(true);
  const autoToggleRef = useRef({ initTimer: null, loopId: null });

  // Auto-toggle: after 2s enable transition + toggle once, then toggle every 5s
  useEffect(() => {
    autoToggleRef.current.initTimer = window.setTimeout(() => {
      setSwitchNoTransition(false); // enable transitions
      // toggle on next frame so transition class is applied before state change
      requestAnimationFrame(() => setAirliftEnabled((v) => !v));

      // loop toggles every 5s
      autoToggleRef.current.loopId = window.setInterval(() => {
        setAirliftEnabled((v) => !v);
      }, 5000);
    }, 5000);

    return () => {
      if (autoToggleRef.current.initTimer)
        clearTimeout(autoToggleRef.current.initTimer);
      if (autoToggleRef.current.loopId)
        clearInterval(autoToggleRef.current.loopId);
    };
  }, []);

  const [step, setStep] = useState(1); //1,2,3,4,5,6
  const [optimize, setOptimize] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false); // controls render
  const [overlayExpanded, setOverlayExpanded] = useState(false); // controls height
  const [overlayOpacity, setOverlayOpacity] = useState(1); // 1 = visible, 0 = hidden
  const [imageOptimized, setImageOptimized] = useState(false);
  const [imageAnalyzed, setImageAnalyzed] = useState(false);
  const [animateBorders, setAnimateBorders] = useState(false); // controls drawing animation
  const [noBorderTransition, setNoBorderTransition] = useState(false); // instant hide flag
  const [textOptimized, setTextOptimized] = useState(false);
  const [play, setPlay] = useState(false);
  const overlayRef = useRef(null);
  const optimizeTimerRef = useRef(null);
  const borderTimersRef = useRef([]); // holds timers for border cycle

  // loader expand/shrink loop for step === 4
  const [loaderWide, setLoaderWide] = useState(false);
  const [loaderTransition, setLoaderTransition] = useState("width 5s ease");
  const loaderTimersRef = useRef([]);

  // loader line (the small column) — collapsed X = 33px, expand target X = 421px
  const [loaderLineX, setLoaderLineX] = useState(33); // px
  const [loaderLineTransition, setLoaderLineTransition] =
    useState("transform 5s ease");

  // loader percent counter (1 -> 69). Stops at fixed 69 when textOptimized === true.
  const [loaderPercent, setLoaderPercent] = useState(1);
  const rafRef = useRef(null);
  const animRef = useRef(null); // { start, duration, from, to, mode }
  const stopTargetRef = useRef(null); // random stop target when textOptimized becomes true

  // refs used to sync blur overlay with loader line
  const loaderLineRef = useRef(null);
  const bluredRef = useRef(null);

  // keep the blur clip in sync with loaderLine position (updates each frame while step===4)
  useEffect(() => {
    if (step !== 4) {
      if (bluredRef.current)
        bluredRef.current.style.setProperty("--blur-clip", "100%");
      return;
    }

    let rafId = null;
    const tick = () => {
      if (!loaderLineRef.current || !bluredRef.current) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const lineRect = loaderLineRef.current.getBoundingClientRect();
      const containerRect = bluredRef.current.getBoundingClientRect();
      // compute percentage of container width at the loader's right edge
      const percent = Math.max(
        0,
        Math.min(
          100,
          ((lineRect.right - containerRect.left) / containerRect.width) * 100
        )
      );
      bluredRef.current.style.setProperty("--blur-clip", `${percent}%`);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [loaderLineX, textOptimized, step]);

  const cancelRAF = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const startAnimate = (from, to, duration, mode = "up") => {
    cancelRAF();
    // store desired target in animRef so tick can reference it
    animRef.current = { start: performance.now(), duration, from, to, mode };

    const tick = (now) => {
      const a = animRef.current;
      if (!a) return;
      const t = Math.min(1, (now - a.start) / a.duration);
      const rawValue = a.from + (a.to - a.from) * t;
      const nextValue = Math.round(rawValue);

      // If going up and there is a stop target, cap and finish when reached
      if (a.mode === "up" && stopTargetRef.current != null) {
        const stopTarget = stopTargetRef.current;
        if (nextValue >= stopTarget) {
          setLoaderPercent(stopTarget);
          animRef.current = null;
          cancelRAF();
          return;
        }
      }

      // Never exceed the animation's 'to' value (defensive)
      if (a.mode === "up") {
        setLoaderPercent(Math.min(nextValue, Math.round(a.to)));
      } else {
        setLoaderPercent(Math.max(nextValue, Math.round(a.to)));
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // finished naturally
        animRef.current = null;
        cancelRAF();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  // start/stop animations in response to loaderWide (expand/shrink)
  useEffect(() => {
    if (step !== 4) return;

    if (loaderWide) {
      // expand: animate up from current to 95 over 5s
      stopTargetRef.current = null; // reset any previous stop target
      startAnimate(loaderPercent, 69, 5000, "up");
    } else {
      // shrink: animate down from current to 1 over 2s
      stopTargetRef.current = null;
      startAnimate(loaderPercent, 1, 2000, "down");
    }

    return () => {
      cancelRAF();
      animRef.current = null;
      stopTargetRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaderWide, step]);

  // when textOptimized becomes true, pick a fixed stop target 69%
  useEffect(() => {
    if (step !== 4) return;
    if (textOptimized) {
      const target = 69;
      stopTargetRef.current = target;
      // clamp immediately if already past target
      setLoaderPercent((p) => (p >= target ? target : p));
      // ensure an animation is running to reach target exactly
      if (loaderWide && loaderPercent < target) {
        const remainingFraction = (target - loaderPercent) / (69 - 1);
        const dur = Math.max(120, Math.round(5000 * remainingFraction)); // minimal guard
        startAnimate(loaderPercent, target, dur, "up");
      }
    } else {
      // clear stop target so future expands go to 95
      stopTargetRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textOptimized, step]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      cancelRAF();
    };
  }, []);

  // start/stop the blur overlay animation when switch is toggled.
  useEffect(() => {
    if (airliftEnabled) {
      // render overlay at full opacity, then expand (44px -> 100%)
      setOverlayOpacity(1); // ensure visible when starting
      setOverlayVisible(true);
      setOptimize(false); // ensure optimize false while animating
      // allow DOM to mount before expanding so transition happens
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setOverlayExpanded(true));
      });
    } else {
      // when turning OFF: ensure overlay is visible (opacity 100%) immediately,
      // then collapse (100% -> 44px) so the collapse animation plays.
      if (optimizeTimerRef.current) {
        clearTimeout(optimizeTimerRef.current);
        optimizeTimerRef.current = null;
      }
      setOverlayOpacity(1); // immediately restore opacity when switch is clicked off
      // make sure it's mounted and expanded so collapse animates from full height
      setOverlayVisible(true);
      setOverlayExpanded(true);
      // next frame collapse
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setOverlayExpanded(false));
      });
    }
  }, [airliftEnabled]);

  // cleanup if component unmounts
  useEffect(() => {
    return () => {
      setOverlayVisible(false);
      setOverlayExpanded(false);
      if (optimizeTimerRef.current) {
        clearTimeout(optimizeTimerRef.current);
        optimizeTimerRef.current = null;
      }
    };
  }, []);

  // when step === 3: run a repeating cycle that draws borders, marks imageAnalyzed -> imageOptimized,
  // then instantly removes borders and resets states, repeating while step === 3.
  useEffect(() => {
    function clearBorderTimers() {
      borderTimersRef.current.forEach((t) => clearTimeout(t));
      borderTimersRef.current = [];
    }

    if (step === 3) {
      const startCycle = () => {
        clearBorderTimers();

        // start drawing + mark analyzed after 0.5s
        const t0 = setTimeout(() => {
          setNoBorderTransition(false);
          setAnimateBorders(true);
          setImageAnalyzed(true); // keep true between cycles
        }, 500);

        // after 5s from start => mark optimized
        const t1 = setTimeout(() => {
          setImageOptimized(true);
        }, 5000 + 500);

        // after 10s from start => hide borders instantly, clear optimized, and restart immediately
        const t2 = setTimeout(() => {
          setNoBorderTransition(true);
          setAnimateBorders(false);
          setImageOptimized(false);
          // restart immediately (no extra delay)
          startCycle();
        }, 10000 + 500);

        borderTimersRef.current.push(t0, t1, t2);
      };

      startCycle();

      return () => {
        clearBorderTimers();
        setAnimateBorders(false);
        setNoBorderTransition(false);
        setImageAnalyzed(false);
        setImageOptimized(false);
      };
    }

    // cleanup when leaving step 3
    return () => {
      borderTimersRef.current.forEach((t) => clearTimeout(t));
      borderTimersRef.current = [];
      setAnimateBorders(false);
      setNoBorderTransition(false);
      setImageAnalyzed(false);
      setImageOptimized(false);
    };
  }, [step]);

  // loader expand/shrink loop for step === 4
  useEffect(() => {
    const clearLoaderTimers = () => {
      loaderTimersRef.current.forEach((t) => clearTimeout(t));
      loaderTimersRef.current = [];
    };

    if (step === 4) {
      let running = true;

      const startCycle = () => {
        clearLoaderTimers();

        // 0.5s initial delay -> expand (5s)
        const t0 = setTimeout(() => {
          if (!running) return;
          setLoaderTransition("width 5s ease");
          setLoaderWide(true);

          // line should animate in sync with main: translate from 33px -> 421px over same 5s
          setLoaderLineTransition("transform 5s ease");
          // small tick so transition takes effect reliably in browsers
          const tLineStart = setTimeout(() => setLoaderLineX(415), 10);
          loaderTimersRef.current.push(tLineStart);

          // after expand finishes -> set textOptimized = true
          const t1 = setTimeout(() => {
            if (!running) return;
            setTextOptimized(true);
            // ensure the line reached final X
            setLoaderLineX(415);
          }, 5000);
          loaderTimersRef.current.push(t1);

          // wait 3s then shrink (2s)
          const t2 = setTimeout(() => {
            if (!running) return;
            setLoaderTransition("width 2s ease");
            setLoaderWide(false);

            // shrink line in sync with main: translate back to 33px over same 2s
            setLoaderLineTransition("transform 2s ease");
            const tLineShrink = setTimeout(() => {
              if (!running) return;
              setLoaderLineX(33);
            }, 20);
            loaderTimersRef.current.push(tLineShrink);

            // after shrink finishes -> set textOptimized = false
            const t3 = setTimeout(() => {
              if (!running) return;
              setTextOptimized(false);

              // wait 0.5s then restart cycle
              const t4 = setTimeout(() => {
                if (!running) return;
                startCycle();
              }, 500);
              loaderTimersRef.current.push(t4);
            }, 2000);
            loaderTimersRef.current.push(t3);
          }, 5000 + 3000);
        }, 500);

        loaderTimersRef.current.push(t0);
      };

      startCycle();

      return () => {
        running = false;
        clearLoaderTimers();
        setLoaderWide(false);
        setLoaderTransition("width 5s ease");
        setTextOptimized(false);
        setLoaderLineX(33);
        setLoaderLineTransition("width 5s ease");
      };
    }

    return () => {
      clearLoaderTimers();
    };
  }, [step, setTextOptimized]);

  useEffect(() => {
    const boxes = Array.from(
      document.querySelectorAll('[data-textbox="orig"]')
    );
    if (!boxes.length) return;

    // Always remove as soon as shrink starts
    if (!loaderWide) {
      boxes.forEach((el) => el.classList.remove("active-text-class"));
      return;
    }

    // Otherwise, when optimized add the class
    if (textOptimized) {
      boxes.forEach((el) => el.classList.add("active-text-class"));
    } else {
      boxes.forEach((el) => el.classList.remove("active-text-class"));
    }

    // cleanup
    return () =>
      boxes.forEach((el) => el.classList.remove("active-text-class"));
  }, [textOptimized, loaderWide, step]);

  // For js Animation Looping
  useEffect(() => {
    if (step === 6) {
      setPlay(true);
    } else {
      setPlay(false);
    }
  }, [step]);

  // Looping control for tab-3 animations
  useEffect(() => {
    let intervalId;
    let pulseTimeout;

    const totalDuration = 4301 + 800 + 2000; // last delay + animation duration + 2s hold

    if (step === 6) {
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
  }, [step]);

  const containerVariants = {
    1: "gap-9 py-[60px] justify-start",
    2: "gap-0 pt-[38px] px-9 justify-end",
    3: "px-10 py-[calc(46.71px-0.91px)] gap-0 justify-start",
    4: "px-10 py-[calc(46.71px-0.91px)] gap-0 justify-center",
    5: "gap-4 p-0 justify-between",
    // 6: "gap-0 px-9 pt-9 justify-end",
    6: "gap-0 px-0 pt-0 justify-end",
  };

  const dynamicSpacing = containerVariants[step] ?? "";
  const performanceData = {
    false: { size: 1.5, count: 20, time: 2.5 },
    true: {
      size: 7.7,
      count: 12,
      time: 1.1,
      sizeReduce: -36,
      countReduce: -12,
      timeReduce: -45,
    },
  };

  const { size, count, time, sizeReduce, countReduce, timeReduce } =
    performanceData[optimize];

  const optimizeImage = {
    false: {
      icon: (
        <LoaderCircle
          size={14.54}
          strokeWidth={1.36}
          className="shrink-0 text-indigo-700 animate-spin"
        />
      ),
      sizeA: 136,
      sizeB: 340,
      sizeColor: "text-zinc-600",
    },
    true: {
      icon: (
        <Check
          size={14.54}
          strokeWidth={1.36}
          className="shrink-0 text-indigo-700"
        />
      ),
      sizeA: 56,
      sizeB: 110,
      sizeColor: "text-indigo-700",
    },
  };

  const { icon, sizeA, sizeB, sizeColor } = optimizeImage[imageOptimized];

  const textData = {
    false: {
      text1: "woff",
      size1: 135,
      time1: 16,
      text2: "woff",
      size2: 143,
      time2: 16,
      text3: "woff2",
      size3: 140,
      time3: 16,
      text4: "woff2",
      size4: 135,
      time4: 16,
      text5: "ttf",
      size5: 146,
      time5: 16,
      text6: "ttf",
      size6: 135,
      time6: 16,
      text7: "ttf",
      size7: 136,
      time7: 16,
      text8: "ttf",
      size8: 220,
      time8: 16,
      text9: "woff",
      size9: 115,
      time9: 16,
      text10: "woff",
      size10: 167,
      time10: 16,
    },
    true: {
      text1: "woff2",
      size1: 45,
      time1: 16,
      text2: "woff2",
      size2: 23,
      time2: 16,
      text3: "woff2",
      size3: 56,
      time3: 16,
      text4: "woff2",
      size4: 8.9,
      time4: 16,
      text5: "woff2",
      size5: 3.2,
      time5: 16,
      text6: "woff2",
      size6: 4.5,
      time6: 16,
      text7: "woff2",
      size7: 2.6,
      time7: 16,
      text8: "woff2",
      size8: 3.4,
      time8: 16,
      text9: "woff2",
      size9: 9.9,
      time9: 16,
      text10: "woff2",
      size10: 7,
      time10: 16,
    },
  };

  const {
    text1,
    size1,
    time1,
    text2,
    size2,
    time2,
    text3,
    size3,
    time3,
    text4,
    size4,
    time4,
    text5,
    size5,
    time5,
    text6,
    size6,
    time6,
    text7,
    size7,
    time7,
    text8,
    size8,
    time8,
    text9,
    size9,
    time9,
    text10,
    size10,
    time10,
  } = textData[textOptimized];

  const configTags = [
    {
      id: 1,
      tag: "Instantly Visible Content",
      icon: (
        <Zap
          size={14.54}
          strokeWidth={1.36}
          className="shrink-0 text-indigo-800"
        />
      ),
    },
    {
      id: 2,
      tag: "Smart Resource Loading",
      icon: (
        <FileScan
          size={14.54}
          strokeWidth={1.36}
          className="shrink-0 text-indigo-800"
        />
      ),
    },
    {
      id: 3,
      tag: "No Quality Loss",
      icon: (
        <Type
          size={14.54}
          strokeWidth={1.36}
          className="shrink-0 text-indigo-800"
        />
      ),
    },
    {
      id: 4,
      tag: "Optimized for All Devices",
      icon: (
        <MonitorSmartphone
          size={14.54}
          strokeWidth={1.36}
          className="shrink-0 text-indigo-800"
        />
      ),
    },
    {
      id: 5,
      tag: "Reduced Bandwidth Usage",
      icon: (
        <RadioTower
          size={14.54}
          strokeWidth={1.36}
          className="shrink-0 text-indigo-800"
        />
      ),
    },
    {
      id: 6,
      tag: "Boosted Core Web Vitals",
      icon: (
        <SquareActivity
          size={14.54}
          strokeWidth={1.36}
          className="shrink-0 text-indigo-800"
        />
      ),
    },
  ];

  function firstStep() {
    return (
      <>
        {/* Toggle Part */}
        <div className="flex mx-4 flex-row flex-nowrap gap-4 items-center justify-between rounded-[8px] px-2 py-[6.905px] bg-white border-[0.91px] border-solid border-zinc-100 shadow-[0px_9.09px_9.09px_-4.54px_rgba(0,0,0,0.04),0px_18.17px_22.72px_-4.54px_rgba(0,0,0,0.10)] min-w-[153.31px] w-full max-w-[153.31px] min-h-[37.81px] h-full h-max-[37.81px] z-20">
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
                fillOpacity="0.74"
              />
              <path
                d="M2.65662 10.2179L17.1378 3.08411C13.4014 6.7084 9.32976 10.6225 8.32672 11.4873C7.66907 11.3064 6.1824 10.9644 2.65662 10.2179Z"
                fill="#5E5899"
                fillOpacity="0.74"
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
                  <stop stopColor="#4B4DB8" stopOpacity="0.43" />
                  <stop offset="1" stopColor="#3A3C7C" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-[16px] font-montserrat leading-[100%] font-[Montserrat] font-semibold text-[#1F1F1FD9]">
              Airlift
            </span>
          </div>
          <Switch
            checked={airliftEnabled}
            // onCheckedChange={setAirliftEnabled}
            aria-disabled="true"
            tabIndex={-1}
            className={`${
              switchNoTransition
                ? "transition-none"
                : "transition-all duration-300"
            } h-5 w-9 cursor-default data-[state=checked]:bg-indigo-900 data-[state=unchecked]:bg-input [&>span]:h-4 [&>span]:w-4 [&[data-state=checked]>span]:translate-x-4 [&[data-state=unchecked]>span]:translate-x-0.5`}
          />
        </div>
        {/* Con Part */}
        <div className="flex flex-col items-center w-full grow gap-[38px] relative">
          {/* Overlay Blur Effect: separate elements for ON vs OFF flows */}
          {/* ON flow: expand (44 -> 100), then after delay set optimize=true and fade out */}
          {overlayVisible && airliftEnabled ? (
            <div
              className="absolute left-0 right-0 top-[-64px] bottom-0 z-10 pointer-events-none flex items-end justify-center border-b-[0.91px] border-solid border-indigo-700"
              ref={overlayRef}
              aria-hidden
              style={{
                height: overlayExpanded ? "100%" : "44px",
                transition: "height 1600ms ease-in-out",
                opacity: overlayOpacity,
                willChange: "height, opacity",
                WebkitTransition: "height 1600ms ease-in-out",
                WebkitBackdropFilter: "blur(3px)",
                backdropFilter: "blur(3px)",
                overflow: "hidden",
              }}
              onTransitionEnd={(e) => {
                if (e.propertyName !== "height") return;

                // expansion finished -> schedule optimize true + fade out
                if (overlayExpanded && airliftEnabled) {
                  if (optimizeTimerRef.current)
                    clearTimeout(optimizeTimerRef.current);
                  optimizeTimerRef.current = window.setTimeout(() => {
                    setOptimize(true);
                    setOverlayOpacity(0); // fade overlay out
                    optimizeTimerRef.current = null;
                  }, 800); // post-transition delay
                }
              }}
            >
              <div
                className="w-[366px] h-[25px] overflow-visible"
                style={{
                  WebkitBackdropFilter: "blur(40px)",
                  backdropFilter: "blur(40px)",
                }}
              >
                <img
                  src={Blur}
                  alt="Blur Effect"
                  className="w-full h-full object-contain"
                  style={{
                    WebkitFilter: "blur(4px)",
                    filter: "blur(4px)",
                  }}
                />
              </div>
            </div>
          ) : null}

          {/* OFF flow: show overlay at full height, collapse (100 -> 44), then after delay clear optimize and unmount */}
          {overlayVisible && !airliftEnabled ? (
            <div
              className="absolute left-0 right-0 bottom-[40px] z-10 pointer-events-none flex items-start justify-center border-t-[0.91px] border-solid border-indigo-700"
              ref={overlayRef}
              aria-hidden
              style={{
                height: overlayExpanded ? "44px" : "100%",
                transition: "height 1600ms ease-in-out",
                opacity: overlayOpacity,
                willChange: "height, opacity",
                WebkitTransition: "height 1600ms ease-in-out",
                WebkitBackdropFilter: "blur(3px)",
                backdropFilter: "blur(3px)",
                overflow: "hidden",
              }}
              onTransitionEnd={(e) => {
                if (e.propertyName !== "height") return;

                // collapse finished -> after delay clear optimize and remove overlay
                if (!overlayExpanded && !airliftEnabled) {
                  if (optimizeTimerRef.current)
                    clearTimeout(optimizeTimerRef.current);
                  optimizeTimerRef.current = window.setTimeout(() => {
                    setOptimize(false);
                    setOverlayVisible(false);
                    setOverlayOpacity(1); // reset opacity for next show
                    optimizeTimerRef.current = null;
                  }, 800);
                }
              }}
            >
              <div
                className="w-[366px] h-[25px] overflow-visible"
                style={{
                  WebkitBackdropFilter: "blur(40px)",
                  backdropFilter: "blur(40px)",
                }}
              >
                <img
                  src={Blur}
                  alt="Blur Effect"
                  className="w-full h-full object-contain"
                  style={{
                    WebkitFilter: "blur(4px)",
                    filter: "blur(4px)",
                  }}
                />
              </div>
            </div>
          ) : null}

          <div className="flex mx-4 flex-col gap-8 p-[23px] border-[0.98px] border-solid border-[#E4E4E7] rounded-2xl min-w-[389px] w-full max-w-[389px] min-h-[250.59px] h-full max-h-[250.59px] bg-white">
            <div className="flex items-center gap-[7.86px]">
              <FileChartColumnIncreasing
                strokeWidth={1.97}
                className="shrink-0 text-[#18181B]"
                size={23.59}
              />
              <span className="text-[#09090B] text-[17.69px] leading-[100%] font-semibold">
                Performance
              </span>
              {optimize ? (
                <span className="flex items-center px-[9.83px] py-[1.97px] rounded-2xl text-center leading-[15.73px] text-[11.8px] font-medium h-[19.93px] bg-teal-50 text-teal-700 border-[0.98px] border-solid border-teal-200 cursor-default">
                  Optimized
                </span>
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-col w-full grow gap-6 justify-between items-center">
              {/* Circle */}
              <div className="flex items-center w-full gap-6 pb-1.5 border-b-[0.983px] border-dashed border-[#E4E4E7] min-h-[77px]">
                <div className="relative w-[70px] h-[70px]">
                  {!optimize ? (
                    // default single circle when disabled
                    <AnimationCircle
                      size={70}
                      strokeWidth={12}
                      score={"98%"}
                      progressColor={"#312E81"}
                      trackColor={"#FAFAFA"}
                      scale={1}
                      rotate={-30}
                      className=""
                    />
                  ) : (
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
                          rotate={-30}
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
                          rotate={10}
                          className="absolute inset-0"
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="gap-2 flex items-end">
                    <p
                      className={`leading-[100%] text-[24px] font-medium ${
                        !optimize ? "text-indigo-900" : "text-indigo-700"
                      }`}
                    >
                      <span className="text-[40px] font-bold">
                        {!optimize ? 76 : 98}
                      </span>
                      %
                    </p>
                    <p className="text-[24px] leading-[100%] font-medium text-[#09090B]">
                      Score
                    </p>
                  </div>
                  <div
                    className={`flex items-center ${
                      optimize ? "gap-2 py-0.5" : "gap-[3px]"
                    }`}
                  >
                    {!optimize ? (
                      <Sparkles
                        size={16}
                        strokeWidth={1}
                        className="shrink-0 text-indigo-700"
                      />
                    ) : (
                      <TrendingUp
                        size={16}
                        strokeWidth={1}
                        className="shrink-0 text-indigo-600"
                      />
                    )}
                    {!optimize ? (
                      <>
                        <p className="text-[12px] leading-[100%] font-medium text-indigo-700">
                          Potential Optimization:{" "}
                          <span className="font-bold">22% Boost.</span>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-[14px] leading-[100%] text-[#71717A]">
                          <span className="text-[#09090B] font-medium">
                            +22% boost
                          </span>{" "}
                          vs original (76%)
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* Grid Data */}
              <div className="grid grid-cols-[repeat(3,auto)] gap-2 justify-between w-full">
                {/* Col 1 */}
                <div className="flex flex-col gap-1 px-2">
                  <div className="flex items-center gap-1">
                    <p className="text-[17.69px] leading-[100%] font-bold text-[#18181B]">
                      <span>{size}</span> KB
                    </p>
                    {optimize ? (
                      <span className="flex items-center px-2 py-1 rounded-2xl text-center leading-[100%] text-[11.8px] h-[23.59px] bg-indigo-50 text-indigo-700 cursor-default">
                        {sizeReduce}%
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <p className="text-[11.8px] leading-[15.73px] text-[#09090B]">
                    Page Size
                  </p>
                </div>
                {/* Col 2 */}
                <div className="flex flex-col gap-1 px-2">
                  <div className="flex items-center gap-1">
                    <p className="text-[17.69px] leading-[100%] font-bold text-[#71717A]">
                      <span>{count}</span>
                    </p>
                    {optimize ? (
                      <span className="flex items-center px-2 py-1 rounded-2xl text-center leading-[100%] text-[11.8px] h-[23.59px] bg-indigo-50 text-indigo-700 cursor-default">
                        {countReduce}%
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <p className="text-[11.8px] leading-[15.73px] text-[#09090B]">
                    Request Count
                  </p>
                </div>
                {/* Col 3 */}
                <div className="flex flex-col gap-1 px-2">
                  <div className="flex items-center gap-1">
                    <p className="text-[17.69px] leading-[100%] font-bold text-[#71717A]">
                      <span>{time}</span> s
                    </p>
                    {optimize ? (
                      <span className="flex items-center px-2 py-1 rounded-2xl text-center leading-[100%] text-[11.8px] h-[23.59px] bg-indigo-50 text-indigo-700 cursor-default">
                        {timeReduce}%
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <p className="text-[11.8px] leading-[15.73px] text-[#09090B]">
                    Total Time
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Optimization msg */}
          <div
            className={`min-w-[210.54px] w-full max-w-[210.54px] min-h-[52px] h-full max-h-[52px] bg-white rounded-[8px] gap-2 mx-4 border-[0.91px] border-solid border-zinc-100 flex items-start px-[6.925px] py-2 duration-300 transition-all ${
              airliftEnabled ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {!optimize ? (
              <LoaderCircle
                size={14.54}
                strokeWidth={1.36}
                className="text-indigo-700 shrink-0 animate-spin"
              />
            ) : (
              <Check
                size={14.54}
                strokeWidth={1.36}
                className="text-indigo-700 shrink-0"
              />
            )}

            <div className="flex flex-col gap-2 justify-between">
              <p className="text-[12.72px] leading-[100%] text-zinc-800">
                <span>{!optimize ? "Optimizing" : "Optimized"}</span> Site
                Performance
              </p>
              <span className="text-[10.9px] leading-[100%] text-indigo-700">
                {!optimize ? "Analyzing..." : "Completed"}
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }

  function secondStep() {
    return (
      <>
        {/* Top Part */}
        <div className="flex flex-start justify-between min-w-[193.54px] w-full max-w-[193.54px] min-h-[52px] h-full max-h-[52px] bg-white border-[0.91px] border-solid border-zinc-100 shadow-[0px_9.09px_9.09px_-4.54px_rgba(0,0,0,0.039),_0px_18.17px_22.72px_-4.54px_rgba(0,0,0,0.102)] p-[7px] gap-2 rounded-[8px]">
          <Repeat2
            size={14.54}
            strokeWidth={1.36}
            className="shrink-0 text-indigo-700"
          />
          <div className="flex flex-col gap-2">
            <p className="text-[12.72px] leading-[100%] text-zinc-800">
              Flexible and step-by-step
            </p>
            <p className="text-[10.9px] font-medium leading-[100%] text-indigo-700">
              Manual Installation
            </p>
          </div>
        </div>
        {/* Gif Part */}
        <div className="h-[237px] w-[237px] object-fill overflow-hidden flex items-center justify-center opacity-45 transform-gpu rotate-[-90deg] mt-[-20px] mb-[-63px]">
          <img
            src={PlugGif}
            alt="Performance Empty"
            className="w-full object-cover h-full"
          />
        </div>
        <div className="w-[386px] bg-white z-20">
          <img
            src={InstallStep}
            alt="Installation Step"
            className="w-full h-auto object-cover"
          />
        </div>
      </>
    );
  }

  function thirdStep() {
    return (
      <>
        {/* first sec white */}
        <div className="min-w-[128px] w-full max-w-[128px] min-h-[52px] h-full max-h-[52px] border-[0.91px] border-solid border-zinc-100 shadow-[0px_9.09px_9.09px_-4.54px_#0000000A,0px_18.17px_22.72px_-4.54px_#0000001A] rounded-[8px] p-[calc(8px-0.91px)] flex flex-col mb-[44.29px] justify-center items-start gap-2">
          <span className="text-[12.72px] leading-[100%] text-zinc-800">
            {imageOptimized ? "Images Optimized" : "Optimizing Images"}
          </span>
          <span className="text-[10.9px] leading-[100%] text-indigo-700">
            {imageOptimized
              ? "76% Faster Site"
              : imageAnalyzed
              ? "Optimizing..."
              : "Analyzing..."}
          </span>
        </div>

        {/* below is the img omtimize section */}

        <div className="main-box min-w-[256px] w-full max-w-[256px] min-h-[120px] h-full max-h-[120px] relative p-[calc(8px-0.44px)] border-[0.44px] border-dashed border-indigo-200 mb-[72px] self-start">
          {/* Below Are corder small divs along with borders */}
          <div className="absolute top-[-3px] left-[-3px] w-[6.34px] h-[6.34px] bg-indigo-200 z-4"></div>
          <div className="absolute top-[-3px] right-[-3px] w-[6.34px] h-[6.34px] bg-indigo-200 z-4"></div>
          <div className="absolute bottom-[-3px] left-[-3px] w-[6.34px] h-[6.34px] bg-indigo-200 z-4"></div>
          <div className="absolute bottom-[-3px] right-[-3px] w-[6.34px] h-[6.34px] bg-indigo-200 z-4"></div>
          {/* Animated solid borders (top/right/bottom/left) + grey area */}
          <div
            className="absolute -top-[2px] left-0 right-0 pointer-events-none"
            aria-hidden
            style={{ height: "100%" }}
          >
            {/* top border */}
            <div
              className="bg-indigo-700"
              style={{
                position: "absolute",
                top: "1px",
                left: 0,
                height: "1px",
                width: animateBorders ? "100%" : "0%",
                transition: noBorderTransition ? "none" : "width 1s ease 0s",
              }}
            />
            {/* right border */}
            <div
              className="bg-indigo-700"
              style={{
                position: "absolute",
                top: 0,
                right: "-1px",
                width: "1px",
                height: animateBorders ? "100%" : "0%",
                transition: noBorderTransition ? "none" : "height 1s ease 1s",
              }}
            />
            {/* bottom border */}
            <div
              className="bg-indigo-700"
              style={{
                position: "absolute",
                bottom: "-3px",
                right: 0,
                height: "1px",
                width: animateBorders ? "100%" : "0%",
                transition: noBorderTransition ? "none" : "width 1s ease 2s",
              }}
            />
            {/* left border */}
            <div
              className="bg-indigo-700"
              style={{
                position: "absolute",
                bottom: 0,
                left: "-1px",
                width: "1px",
                height: animateBorders ? "100%" : "0%",
                transition: noBorderTransition ? "none" : "height 1s ease 3s",
              }}
            />
          </div>
          {/* Below is the grey section */}
          <div className="min-w-[240px] w-full max-w-[240px] min-h-[104px] h-full max-h-[104px] bg-zinc-200"></div>
          {/* Below is the white abs content section */}
          <div className="flex flex-row items-start gap-2 absolute bg-white bottom-[-36.5px] left-[34.23px] min-w-[188.08px] w-full max-w-[188.08px] min-h-[73px] h-full max-h-[73px] border-[0.91px] border-solid border-zinc-100 p-[calc(8px-0.91px)] rounded-[8px] justify-between">
            {/* content */}
            <div className="flex flex-row items-start gap-2">
              <img
                src={Placeholder}
                alt="placeholder"
                className=" min-w-[14.54px] w-full max-w-[14.54px] h-[14.54px] object-cover"
              />
              <div className="flex flex-col gap-2">
                <span
                  className={`text-[12.72px] leading-[100%] text-zinc-800 duration-300 ease-in-out transition-all ${
                    !imageOptimized && imageAnalyzed
                      ? "blur-[4px]"
                      : "blur-none"
                  }`}
                >
                  image_view.{!imageOptimized ? "jpg" : "webp"}
                </span>
                <p className="text-[10.9px] leading-[100%] text-zinc-600">
                  1200 x 600 |{" "}
                  <span className={`text-[10.9px] leading-[100%] ${sizeColor}`}>
                    {sizeA} kB
                  </span>
                </p>
                <span className="text-[10.9px] leading-[100%] text-indigo-700">
                  {imageOptimized
                    ? "Optimized"
                    : imageAnalyzed
                    ? "Optimizing..."
                    : "Analyzing..."}
                </span>
              </div>
            </div>
            <div className="flex justify-center min-w-[30.54px] w-full max-w-[30.54px]">
              {icon}
            </div>
          </div>
        </div>

        {/* below is the img omtimize section 2*/}

        <div className="min-w-[256px] w-full max-w-[256px] min-h-[120px] h-full max-h-[120px] relative p-[calc(8px-0.44px)] border-[0.44px] border-dashed border-indigo-200 self-end">
          {/* Below Are corder small divs along with borders */}
          <div className="absolute top-[-3px] left-[-3px] w-[6.34px] h-[6.34px] bg-indigo-200 z-4"></div>
          <div className="absolute top-[-3px] right-[-3px] w-[6.34px] h-[6.34px] bg-indigo-200 z-4"></div>
          <div className="absolute bottom-[-3px] left-[-3px] w-[6.34px] h-[6.34px] bg-indigo-200 z-4"></div>
          <div className="absolute bottom-[-3px] right-[-3px] w-[6.34px] h-[6.34px] bg-indigo-200 z-4"></div>
          {/* Animated solid borders (top/right/bottom/left) + grey area */}
          <div
            className="absolute -top-[2px] left-0 right-0 pointer-events-none"
            aria-hidden
            style={{ height: "100%" }}
          >
            {/* top border */}
            <div
              className="bg-indigo-700"
              style={{
                position: "absolute",
                top: "1px",
                left: 0,
                height: "1px",
                width: animateBorders ? "100%" : "0%",
                transition: noBorderTransition ? "none" : "width 1s ease 0s",
              }}
            />
            {/* right border */}
            <div
              className="bg-indigo-700"
              style={{
                position: "absolute",
                top: 0,
                right: "-1px",
                width: "1px",
                height: animateBorders ? "100%" : "0%",
                transition: noBorderTransition ? "none" : "height 1s ease 1s",
              }}
            />
            {/* bottom border */}
            <div
              className="bg-indigo-700"
              style={{
                position: "absolute",
                bottom: "-3px",
                right: 0,
                height: "1px",
                width: animateBorders ? "100%" : "0%",
                transition: noBorderTransition ? "none" : "width 1s ease 2s",
              }}
            />
            {/* left border */}
            <div
              className="bg-indigo-700"
              style={{
                position: "absolute",
                bottom: 0,
                left: "-1px",
                width: "1px",
                height: animateBorders ? "100%" : "0%",
                transition: noBorderTransition ? "none" : "height 1s ease 3s",
              }}
            />
          </div>
          {/* Below is the grey section */}
          <div className="min-w-[240px] w-full max-w-[240px] min-h-[104px] h-full max-h-[104px] bg-zinc-200"></div>
          {/* Below is the white abs content section */}
          <div className="flex flex-row items-start gap-2 absolute bg-white bottom-[-36.5px] left-[34.23px] min-w-[188.08px] w-full max-w-[188.08px] min-h-[73px] h-full max-h-[73px] border-[0.91px] border-solid border-zinc-100 p-[calc(8px-0.91px)] rounded-[8px] justify-between">
            {/* content */}
            <div className="flex flex-row items-start gap-2">
              <img
                src={Placeholder}
                alt="placeholder"
                className=" min-w-[14.54px] w-full max-w-[14.54px] h-[14.54px] object-cover"
              />
              <div className="flex flex-col gap-2">
                <span
                  className={`text-[12.72px] leading-[100%] text-zinc-800 duration-300 ease-in-out transition-all ${
                    !imageOptimized && imageAnalyzed
                      ? "blur-[4px]"
                      : "blur-none"
                  }`}
                >
                  image_original.{!imageOptimized ? "png" : "webp"}
                </span>
                <p className="text-[10.9px] leading-[100%] text-zinc-600">
                  1080 x 500 |{" "}
                  <span className={`text-[10.9px] leading-[100%] ${sizeColor}`}>
                    {sizeB} kB
                  </span>
                </p>
                <span className="text-[10.9px] leading-[100%] text-indigo-700">
                  {imageOptimized
                    ? "Optimized"
                    : imageAnalyzed
                    ? "Optimizing..."
                    : "Analyzing..."}
                </span>
              </div>
            </div>
            <div className="flex justify-center min-w-[30.54px] w-full max-w-[30.54px]">
              {icon}
            </div>
          </div>
        </div>
      </>
    );
  }

  function original() {
    return (
      <>
        <div className="w-full h-full flex flex-col justify-center items-center grow z-1 bg-white">
          <div
            className={`w-full h-full flex flex-col ${dynamicSpacing} items-center grow relative`}
          >
            {/* Absolute Con with bg */}
            <div className="flex w-full h-full items-center justify-center absolute top-0 left-0 pointer-events-none select-none">
              <div className="flex min-w-[353.76px] w-full max-w-[353.76px] min-h-[443.4px] h-full max-h-[443.4px]">
                <img src={BoxBg} alt="Background Box" />
              </div>
            </div>
            <div className="flex flex-col gap-0  ">
              {/* first 2 text boxes */}
              <div className="w-full flex flex-row justify-center gap-[14.77px]">
                {/* Textbox 1*/}
                <div
                  data-textbox="orig"
                  className={`flex flex-row gap-2 min-w-[167.89px] w-full max-w-[167.89px] min-h-[69px] h-full max-h-[69px] border-[0.91px] bg-transparent border-[#E4E4E7] transition-all duration-300 ease-in-out rounded-[16px] py-[calc(16px-0.91px)] px-2`}
                >
                  <Type
                    size={14.54}
                    strokeWidth={1.36}
                    className="text-indigo-800 z-5"
                  />
                  {/* text container */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[12.72px] leading-[100%] text-zinc-800">
                      Inter-Regular
                      <span className="text-[12.72px] leading-[100%] text-zinc-800">
                        .{text1}
                      </span>
                    </p>
                    <p className="text-[10.9px] leading-[100%] text-zinc-600 z-5">
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {size1} kB
                      </span>{" "}
                      |{" "}
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {time1}ms
                      </span>
                    </p>
                  </div>
                </div>

                {/* Textbox 2*/}
                <div
                  data-textbox="orig"
                  className={`flex flex-row gap-2 min-w-[171.89px] w-full max-w-[171.89px] min-h-[69px] h-full max-h-[69px] border-[0.91px] bg-transparent border-[#E4E4E7] transition-all duration-300 ease-in-out rounded-[16px] py-[calc(16px-0.91px)] px-2`}
                >
                  <Type
                    size={14.54}
                    strokeWidth={1.36}
                    className="text-indigo-800 z-5"
                  />
                  {/* text container */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[12.72px] leading-[100%] text-zinc-800">
                      Inter-Medium
                      <span className="text-[12.72px] leading-[100%] text-zinc-800">
                        .{text2}
                      </span>
                    </p>
                    <p className="text-[10.9px] leading-[100%] text-zinc-600 z-5">
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {size2} kB
                      </span>{" "}
                      |{" "}
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {time2}ms
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 text boxes section*/}
              <div className="w-full flex flex-row justify-center gap-[14.21px] mt-[18.24px]">
                {/* Textbox 1*/}
                <div
                  data-textbox="orig"
                  className={`flex flex-row gap-2 min-w-[183.89px] w-full max-w-[183.89px] min-h-[69px] h-full max-h-[69px] border-[0.91px] bg-transparent border-[#E4E4E7] transition-all duration-300 ease-in-out rounded-[16px] py-[calc(16px-0.91px)] px-2`}
                >
                  <Type
                    size={14.54}
                    strokeWidth={1.36}
                    className="text-indigo-800 z-5"
                  />
                  {/* text container */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[12.72px] leading-[100%] text-zinc-800">
                      Inter-Regular
                      <span className="text-[12.72px] leading-[100%] text-zinc-800">
                        .{text3}
                      </span>
                    </p>
                    <p className="text-[10.9px] leading-[100%] text-zinc-600 z-5">
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {size3} kB
                      </span>{" "}
                      |{" "}
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {time3}ms
                      </span>
                    </p>
                  </div>
                </div>

                {/* Textbox 2*/}
                <div
                  data-textbox="orig"
                  className={`flex flex-row gap-2 min-w-[162.89px] w-full max-w-[162.89px] min-h-[69px] h-full max-h-[69px] border-[0.91px] bg-transparent border-[#E4E4E7] transition-all duration-300 ease-in-out rounded-[16px] py-[calc(16px-0.91px)] px-2`}
                >
                  <Type
                    size={14.54}
                    strokeWidth={1.36}
                    className="text-indigo-800 z-5"
                  />
                  {/* text container */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[12.72px] leading-[100%] text-zinc-800">
                      Cardo-Bold
                      <span className="text-[12.72px] leading-[100%] text-zinc-800">
                        .{text4}
                      </span>
                    </p>
                    <p className="text-[10.9px] leading-[100%] text-zinc-600 z-5">
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {size4} kB
                      </span>{" "}
                      |{" "}
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {time4}ms
                      </span>
                    </p>
                  </div>
                </div>

                {/* Textbox 3*/}
                <div
                  data-textbox="orig"
                  className={`flex flex-row gap-2 min-w-[175.89px] w-full max-w-[175.89px] min-h-[69px] h-full max-h-[69px] border-[0.91px] bg-transparent border-[#E4E4E7] transition-all duration-300 ease-in-out rounded-[16px] py-[calc(16px-0.91px)] px-2`}
                >
                  <Type
                    size={14.54}
                    strokeWidth={1.36}
                    className="text-indigo-800 z-5"
                  />
                  {/* text container */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[12.72px] leading-[100%] text-zinc-800">
                      Cardo-Bold
                      <span className="text-[12.72px] leading-[100%] text-zinc-800">
                        .{text5}
                      </span>
                    </p>
                    <p className="text-[10.9px] leading-[100%] text-zinc-600 z-5">
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {size5} kB
                      </span>{" "}
                      |{" "}
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {time5}ms
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 text boxes section 2*/}
              <div className="w-full flex flex-row justify-center gap-[14.13px] mt-[18.24px]">
                {/* Textbox 1*/}
                <div
                  data-textbox="orig"
                  className={`flex flex-row gap-2 min-w-[183.89px] w-full max-w-[183.89px] min-h-[69px] h-full max-h-[69px] border-[0.91px] bg-transparent border-[#E4E4E7] transition-all duration-300 ease-in-out rounded-[16px] py-[calc(16px-0.91px)] px-2`}
                >
                  <Type
                    size={14.54}
                    strokeWidth={1.36}
                    className="text-indigo-800 z-5"
                  />
                  {/* text container */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[12.72px] leading-[100%] text-zinc-800">
                      Inter-Regular
                      <span className="text-[12.72px] leading-[100%] text-zinc-800">
                        .{text6}
                      </span>
                    </p>
                    <p className="text-[10.9px] leading-[100%] text-zinc-600 z-5">
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {size6} kB
                      </span>{" "}
                      |{" "}
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {time6}ms
                      </span>
                    </p>
                  </div>
                </div>

                {/* Textbox 2*/}
                <div
                  data-textbox="orig"
                  className={`flex flex-row gap-2 min-w-[198.89px] w-full max-w-[198.89px] min-h-[69px] h-full max-h-[69px] border-[0.91px] bg-transparent border-[#E4E4E7] transition-all duration-300 ease-in-out rounded-[16px] py-[calc(16px-0.91px)] px-2`}
                >
                  <Type
                    size={14.54}
                    strokeWidth={1.36}
                    className="text-indigo-800 z-5"
                  />
                  {/* text container */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[12.72px] leading-[100%] text-zinc-800">
                      Montserrat-Medium
                      <span className="text-[12.72px] leading-[100%] text-zinc-800">
                        .{text7}
                      </span>
                    </p>
                    <p className="text-[10.9px] leading-[100%] text-zinc-600 z-5">
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {size7} kB
                      </span>{" "}
                      |{" "}
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {time7}ms
                      </span>
                    </p>
                  </div>
                </div>

                {/* Textbox 3*/}
                <div
                  data-textbox="orig"
                  className={`flex flex-row gap-2 min-w-[206.89px] w-full max-w-[206.89px] min-h-[69px] h-full max-h-[69px] border-[0.91px] bg-transparent border-[#E4E4E7] transition-all duration-300 ease-in-out rounded-[16px] py-[calc(16px-0.91px)] px-2`}
                >
                  <Type
                    size={14.54}
                    strokeWidth={1.36}
                    className="text-indigo-800 z-5"
                  />
                  {/* text container */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[12.72px] leading-[100%] text-zinc-800">
                      Montserrat-Medium
                      <span className="text-[12.72px] leading-[100%] text-zinc-800">
                        .{text8}
                      </span>
                    </p>
                    <p className="text-[10.9px] leading-[100%] text-zinc-600 z-5">
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {size8} kB
                      </span>{" "}
                      |{" "}
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {time8}ms
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Last 2 text boxes */}
              <div className="w-full flex flex-row justify-center gap-[14.77px] mt-[18.24px]">
                {/* Textbox 1*/}
                <div
                  data-textbox="orig"
                  className={`flex flex-row gap-2 min-w-[165.89px] w-full max-w-[165.89px] min-h-[69px] h-full max-h-[69px] border-[0.91px] bg-transparent border-[#E4E4E7] transition-all duration-300 ease-in-out rounded-[16px] py-[calc(16px-0.91px)] px-2`}
                >
                  <Type
                    size={14.54}
                    strokeWidth={1.36}
                    className="text-indigo-800 z-5"
                  />
                  {/* text container */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[12.72px] leading-[100%] text-zinc-800">
                      Lato-Regular
                      <span className="text-[12.72px] leading-[100%] text-zinc-800">
                        .{text9}
                      </span>
                    </p>
                    <p className="text-[10.9px] leading-[100%] text-zinc-600 z-5">
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {size9} kB
                      </span>{" "}
                      |{" "}
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {time9}ms
                      </span>
                    </p>
                  </div>
                </div>

                {/* Textbox 2*/}
                <div
                  data-textbox="orig"
                  className={`flex flex-row gap-2 min-w-[144.89px] w-full max-w-[144.89px] min-h-[69px] h-full max-h-[69px] border-[0.91px] bg-transparent border-[#E4E4E7] transition-all duration-300 ease-in-out rounded-[16px] py-[calc(16px-0.91px)] px-2`}
                >
                  <Type
                    size={14.54}
                    strokeWidth={1.36}
                    className="text-indigo-800 z-5"
                  />
                  {/* text container */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[12.72px] leading-[100%] text-zinc-800">
                      Lato-Bold
                      <span className="text-[12.72px] leading-[100%] text-zinc-800">
                        .{text10}
                      </span>
                    </p>
                    <p className="text-[10.9px] leading-[100%] text-zinc-600 z-5">
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {size10} kB
                      </span>{" "}
                      |{" "}
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {time10}ms
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  function blured() {
    return (
      <>
        <div
          ref={bluredRef}
          className={`w-full h-full flex flex-col justify-center items-center grow z-2 bg-white absolute blur-animation`}
        >
          <div
            className={`w-full h-full flex flex-col ${dynamicSpacing} items-center grow relative`}
          >
            {/* Absolute Con with bg */}
            <div className="flex w-full h-full items-center justify-center absolute top-0 left-0 pointer-events-none select-none">
              <div className="flex min-w-[353.76px] w-full max-w-[353.76px] min-h-[443.4px] h-full max-h-[443.4px]">
                <img src={BoxBg} alt="Background Box" />
              </div>
            </div>
            <div className="flex flex-col gap-0">
              {/* first 2 text boxes */}
              <div className="w-full flex flex-row justify-center gap-[14.77px]">
                {/* Textbox 1*/}
                <div
                  className={`flex flex-row gap-2 min-w-[167.89px] w-full max-w-[167.89px] min-h-[69px] h-full max-h-[69px] border-[0.91px] bg-indigo-50 border-indigo-400 transition-all duration-300 ease-in-out rounded-[16px] py-[calc(16px-0.91px)] px-2`}
                >
                  <Type
                    size={14.54}
                    strokeWidth={1.36}
                    className="text-indigo-800 z-5"
                  />
                  {/* text container */}
                  <div className="flex flex-col gap-2">
                    <p
                      className={`text-[12.72px] leading-[100%] text-zinc-800 ${
                        !textOptimized && "blur-[2.5px]"
                      }`}
                    >
                      Inter-Regular
                      <span className="text-[12.72px] leading-[100%] text-zinc-800">
                        .{text1}
                      </span>
                    </p>
                    <p className="text-[10.9px] leading-[100%] text-zinc-600 z-5">
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {size1} kB
                      </span>{" "}
                      |{" "}
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {time1}ms
                      </span>
                    </p>
                  </div>
                </div>

                {/* Textbox 2*/}
                <div
                  className={`flex flex-row gap-2 min-w-[171.89px] w-full max-w-[171.89px] min-h-[69px] h-full max-h-[69px] border-[0.91px] bg-indigo-50 border-indigo-400 transition-all duration-300 ease-in-out rounded-[16px] py-[calc(16px-0.91px)] px-2`}
                >
                  <Type
                    size={14.54}
                    strokeWidth={1.36}
                    className="text-indigo-800 z-5"
                  />
                  {/* text container */}
                  <div className="flex flex-col gap-2">
                    <p
                      className={`text-[12.72px] leading-[100%] text-zinc-800 ${
                        !textOptimized && "blur-[2.5px]"
                      }`}
                    >
                      Inter-Medium
                      <span className="text-[12.72px] leading-[100%] text-zinc-800">
                        .{text2}
                      </span>
                    </p>
                    <p className="text-[10.9px] leading-[100%] text-zinc-600 z-5">
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {size2} kB
                      </span>{" "}
                      |{" "}
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {time2}ms
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 text boxes section*/}
              <div className="w-full flex flex-row justify-center gap-[14.21px] mt-[18.24px]">
                {/* Textbox 1*/}
                <div
                  className={`flex flex-row gap-2 min-w-[183.89px] w-full max-w-[183.89px] min-h-[69px] h-full max-h-[69px] border-[0.91px] bg-indigo-50 border-indigo-400 transition-all duration-300 ease-in-out rounded-[16px] py-[calc(16px-0.91px)] px-2`}
                >
                  <Type
                    size={14.54}
                    strokeWidth={1.36}
                    className="text-indigo-800 z-5"
                  />
                  {/* text container */}
                  <div className="flex flex-col gap-2">
                    <p
                      className={`text-[12.72px] leading-[100%] text-zinc-800 ${
                        !textOptimized && "blur-[2.5px]"
                      }`}
                    >
                      Inter-Regular
                      <span className="text-[12.72px] leading-[100%] text-zinc-800">
                        .{text3}
                      </span>
                    </p>
                    <p className="text-[10.9px] leading-[100%] text-zinc-600 z-5">
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {size3} kB
                      </span>{" "}
                      |{" "}
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {time3}ms
                      </span>
                    </p>
                  </div>
                </div>

                {/* Textbox 2*/}
                <div
                  className={`flex flex-row gap-2 min-w-[162.89px] w-full max-w-[162.89px] min-h-[69px] h-full max-h-[69px] border-[0.91px] bg-indigo-50 border-indigo-400 transition-all duration-300 ease-in-out rounded-[16px] py-[calc(16px-0.91px)] px-2`}
                >
                  <Type
                    size={14.54}
                    strokeWidth={1.36}
                    className="text-indigo-800 z-5"
                  />
                  {/* text container */}
                  <div className="flex flex-col gap-2">
                    <p
                      className={`text-[12.72px] leading-[100%] text-zinc-800 ${
                        !textOptimized && "blur-[2.5px]"
                      }`}
                    >
                      Cardo-Bold
                      <span className="text-[12.72px] leading-[100%] text-zinc-800">
                        .{text4}
                      </span>
                    </p>
                    <p className="text-[10.9px] leading-[100%] text-zinc-600 z-5">
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {size4} kB
                      </span>{" "}
                      |{" "}
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {time4}ms
                      </span>
                    </p>
                  </div>
                </div>

                {/* Textbox 3*/}
                <div
                  className={`flex flex-row gap-2 min-w-[175.89px] w-full max-w-[175.89px] min-h-[69px] h-full max-h-[69px] border-[0.91px] bg-indigo-50 border-indigo-400 transition-all duration-300 ease-in-out rounded-[16px] py-[calc(16px-0.91px)] px-2`}
                >
                  <Type
                    size={14.54}
                    strokeWidth={1.36}
                    className="text-indigo-800 z-5"
                  />
                  {/* text container */}
                  <div className="flex flex-col gap-2">
                    <p
                      className={`text-[12.72px] leading-[100%] text-zinc-800 ${
                        !textOptimized && "blur-[2.5px]"
                      }`}
                    >
                      Cardo-Bold
                      <span className="text-[12.72px] leading-[100%] text-zinc-800">
                        .{text5}
                      </span>
                    </p>
                    <p className="text-[10.9px] leading-[100%] text-zinc-600 z-5">
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {size5} kB
                      </span>{" "}
                      |{" "}
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {time5}ms
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 text boxes section 2*/}
              <div className="w-full flex flex-row justify-center gap-[14.13px] mt-[18.24px]">
                {/* Textbox 1*/}
                <div
                  className={`flex flex-row gap-2 min-w-[183.89px] w-full max-w-[183.89px] min-h-[69px] h-full max-h-[69px] border-[0.91px] bg-indigo-50 border-indigo-400 transition-all duration-300 ease-in-out rounded-[16px] py-[calc(16px-0.91px)] px-2`}
                >
                  <Type
                    size={14.54}
                    strokeWidth={1.36}
                    className="text-indigo-800 z-5"
                  />
                  {/* text container */}
                  <div className="flex flex-col gap-2">
                    <p
                      className={`text-[12.72px] leading-[100%] text-zinc-800 ${
                        !textOptimized && "blur-[2.5px]"
                      }`}
                    >
                      Inter-Regular
                      <span className="text-[12.72px] leading-[100%] text-zinc-800">
                        .{text6}
                      </span>
                    </p>
                    <p className="text-[10.9px] leading-[100%] text-zinc-600 z-5">
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {size6} kB
                      </span>{" "}
                      |{" "}
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {time6}ms
                      </span>
                    </p>
                  </div>
                </div>

                {/* Textbox 2*/}
                <div
                  className={`flex flex-row gap-2 min-w-[198.89px] w-full max-w-[198.89px] min-h-[69px] h-full max-h-[69px] border-[0.91px] bg-indigo-50 border-indigo-400 transition-all duration-300 ease-in-out rounded-[16px] py-[calc(16px-0.91px)] px-2`}
                >
                  <Type
                    size={14.54}
                    strokeWidth={1.36}
                    className="text-indigo-800 z-5"
                  />
                  {/* text container */}
                  <div className="flex flex-col gap-2">
                    <p
                      className={`text-[12.72px] leading-[100%] text-zinc-800 ${
                        !textOptimized && "blur-[2.5px]"
                      }`}
                    >
                      Montserrat-Medium
                      <span className="text-[12.72px] leading-[100%] text-zinc-800">
                        .{text7}
                      </span>
                    </p>
                    <p className="text-[10.9px] leading-[100%] text-zinc-600 z-5">
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {size7} kB
                      </span>{" "}
                      |{" "}
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {time7}ms
                      </span>
                    </p>
                  </div>
                </div>

                {/* Textbox 3*/}
                <div
                  className={`flex flex-row gap-2 min-w-[206.89px] w-full max-w-[206.89px] min-h-[69px] h-full max-h-[69px] border-[0.91px] bg-indigo-50 border-indigo-400 transition-all duration-300 ease-in-out rounded-[16px] py-[calc(16px-0.91px)] px-2`}
                >
                  <Type
                    size={14.54}
                    strokeWidth={1.36}
                    className="text-indigo-800 z-5"
                  />
                  {/* text container */}
                  <div className="flex flex-col gap-2">
                    <p
                      className={`text-[12.72px] leading-[100%] text-zinc-800 ${
                        !textOptimized && "blur-[2.5px]"
                      }`}
                    >
                      Montserrat-Medium
                      <span className="text-[12.72px] leading-[100%] text-zinc-800">
                        .{text8}
                      </span>
                    </p>
                    <p className="text-[10.9px] leading-[100%] text-zinc-600 z-5">
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {size8} kB
                      </span>{" "}
                      |{" "}
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {time8}ms
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Last 2 text boxes */}
              <div className="w-full flex flex-row justify-center gap-[14.77px] mt-[18.24px]">
                {/* Textbox 1*/}
                <div
                  className={`flex flex-row gap-2 min-w-[165.89px] w-full max-w-[165.89px] min-h-[69px] h-full max-h-[69px] border-[0.91px] bg-indigo-50 border-indigo-400 transition-all duration-300 ease-in-out rounded-[16px] py-[calc(16px-0.91px)] px-2`}
                >
                  <Type
                    size={14.54}
                    strokeWidth={1.36}
                    className="text-indigo-800 z-5"
                  />
                  {/* text container */}
                  <div className="flex flex-col gap-2">
                    <p
                      className={`text-[12.72px] leading-[100%] text-zinc-800 ${
                        !textOptimized && "blur-[2.5px]"
                      }`}
                    >
                      Lato-Regular
                      <span className="text-[12.72px] leading-[100%] text-zinc-800">
                        .{text9}
                      </span>
                    </p>
                    <p className="text-[10.9px] leading-[100%] text-zinc-600 z-5">
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {size9} kB
                      </span>{" "}
                      |{" "}
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {time9}ms
                      </span>
                    </p>
                  </div>
                </div>

                {/* Textbox 2*/}
                <div
                  className={`flex flex-row gap-2 min-w-[144.89px] w-full max-w-[144.89px] min-h-[69px] h-full max-h-[69px] border-[0.91px] bg-indigo-50 border-indigo-400 transition-all duration-300 ease-in-out rounded-[16px] py-[calc(16px-0.91px)] px-2`}
                >
                  <Type
                    size={14.54}
                    strokeWidth={1.36}
                    className="text-indigo-800 z-5"
                  />
                  {/* text container */}
                  <div className="flex flex-col gap-2">
                    <p
                      className={`text-[12.72px] leading-[100%] text-zinc-800 ${
                        !textOptimized && "blur-[2.5px]"
                      }`}
                    >
                      Lato-Bold
                      <span className="text-[12.72px] leading-[100%] text-zinc-800">
                        .{text10}
                      </span>
                    </p>
                    <p className="text-[10.9px] leading-[100%] text-zinc-600 z-5">
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {size10} kB
                      </span>{" "}
                      |{" "}
                      <span className="text-[10.9px] leading-[100%] text-zinc-600">
                        {time10}ms
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  function fourthStep() {
    return (
      <>
        {original()}
        {blured()}
        {/* Loader Absolute Section */}
        <div
          className="flex flex-col items-end absolute left-0 min-h-[468px] h-full max-h-[468px] z-4"
          style={{
            width: loaderWide ? "95%" : "156px",
            transition: loaderTransition,
            willChange: "width",
          }}
        >
          <div className="w-[156px] relative">
            {/* Loader Box */}
            <div className="w-fit h-fit px-[10.79px]">
              <div className="flex flex-row gap-1.5 justify-between min-w-[146.54px] w-full max-w-[146.54px] min-h-[52px] h-full max-h-[52px] border-[0.91px] border-solid border-zinc-100 rounded-[8px] p-[calc(8px-0.91px)] shadow-[0px_9.09px_9.09px_-4.54px_#0000000A,0px_18.17px_22.72px_-4.54px_#0000001A]">
                {textOptimized ? (
                  <Check
                    size={14.54}
                    strokeWidth={1.36}
                    className="shrink-0 text-indigo-700"
                  />
                ) : (
                  <LoaderCircle
                    size={14.54}
                    strokeWidth={1.36}
                    className="shrink-0 text-indigo-700 animate-spin"
                  />
                )}

                {/* text content box */}
                <div className="flex flex-col gap-2">
                  <p className="text-[12.72px] leading-[100%] text-zinc-800">
                    {textOptimized ? "Compressed" : "Compressing"} files
                  </p>
                  <div className="flex flex-row gap-1">
                    <span className="text-[10.9px] leading-[100%] text-indigo-700">
                      {loaderPercent}%
                    </span>

                    <span className="text-[10.9px] leading-[100%] text-indigo-700">
                      {textOptimized ? "Reduced" : "Reduction"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Loader Line */}
          <div
            ref={loaderLineRef}
            className="flex flex-col self-start h-[414px] relative items-end"
            style={{
              transform: `translateX(${loaderLineX}px)`,
              transition: loaderLineTransition,
            }}
          >
            <div
              className={`w-full min-h-[376.21px] h-full max-h-[376.21px] border-r-[1px] duration-200 transition-opacity border-indigo-700 ${
                textOptimized ? "opacity-0" : " opacity-100"
              } flex flex-col justify-center items-end`}
            >
              <div className="flex w-full max-w-[157.69px] min-h-[204.32px] h-full max-h-[204.32px] bg-[linear-gradient(270deg,rgba(67,56,202,0.6)_-3.44%,rgba(67,56,202,0.4)_35.88%,#FFFFFF_150.42%)] opacity-80 blur-[63px] overflow-hidden"></div>
            </div>

            {/* Loader Bottom icon */}
            <div className="flex flex-col justify-center items-center min-w-[39.32px] w-full max-w-[39.32px] min-h-[37.81px] h-full max-h-[37.81px] border-[0.91px] border-solid border-zinc-100 rounded-[8px] shadow-[0px_9.09px_9.09px_-4.54px_#0000000A,0px_18.17px_22.72px_-4.54px_#0000001A] absolute bottom-0 right-[-19px]">
              <img
                src={Bluricons}
                alt="Blur Icon"
                className="w-[23.32px] h-[21.81px] object-cover"
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  function fifthStep() {
    return (
      <>
        {/* Top Part */}
        <div className="flex w-full min-h-[306px] h-full max-h-[306px] p-6  justify-center items-center relative">
          <div className="min-w-[353.76px] w-full max-w-[353.76px] h-[443.49px] absolute transform-gpu rotate-[117.19deg] blur-[30px]">
            <img
              src={Step5BG}
              alt=" Step 5 Background Box"
              className="w-full h-full opacity-60 "
            />
          </div>
          <img
            src={ConfigGif}
            alt="Configuration GIF"
            className="w-[461.67px] h-[461.67px] object-cover transform-gpu rotate-[6.23deg] translate-y-[-60px] self-stretch mix-blend-luminosity"
          />
        </div>

        {/* Bottom Part */}
        <div className="flex flex-row items-center justify-center flex-wrap p-6 gap-4 bg-white">
          {configTags.map((tags) => (
            <div
              key={tags.id}
              className="flex items-center w-fit bg-indigo-50 border-[0.91px] border-solid border-indigo-400 py-3 px-2.5 gap-2 rounded-[12px]"
            >
              {tags.icon}
              <span className="text-[12px] leading-[100%] font-medium text-zinc-800">
                {tags.tag}
              </span>
            </div>
          ))}
        </div>
      </>
    );
  }

  function sixedStep() {
    return (
      <>
        {/* Top Part */}
        <div
          className={`step6-container ${
            play ? "play" : ""
          } w-full min-h-[325.26px] h-full max-h-[325.26px] pl-[69px] pr-[68px] pt-[60px] relative`} //flex items-center justify-center
        >
          <div className="flex flex-col w-full h-full">
            <div className="box-top-div flex justify-center mx-8 pb-[5.5px]">
              <div className="box-div opacity-0 flex items-center justify-center min-w-10 w-full max-w-10 min-h-10 h-full max-h-10 border-[0.5px] border-solid border-[#E4E4E7] p-2 rounded-[8px] transform-gpu">
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

            <div className="box-center-div flex justify-between mx-8 mb-[32.5px]">
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

            <div className="box-last-div flex justify-between relative">
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
              <div className="flex flex-col items-center justify-end min-w-14 w-full max-w-14 min-h-14 h-full max-h-14 bg-white border-[0.96px] border-solid border-[#E4E4E7] rounded-[8px] shadow-[0px_10px_10px_-5px_#0000000A,0px_20px_25px_-5px_#0000001A] absolute top-1/2 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 z-10 ani-js-icon opacity-0">
                <img src={JsIcon} alt="JS Icon" className="w-8 h-8 m-auto" />
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

        {/* Bottom Part */}
        <div className="flex min-w-[386px] w-full max-w-[386px] min-h-[217.73px] h-full max-h-[217.73px] items-center justify-center bg-white mx-9">
          <img
            src={JSReqImg}
            alt=""
            className="w-full h-[217.73px] object-cover"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="my-2 flex gap-2">
        <button onClick={() => setStep(Math.max(1, step - 1))}>Prev</button>
        <button onClick={() => setStep(Math.min(6, step + 1))}>Next</button>
      </div>

      <div
        className={`min-w-[458px] w-full max-w-[458px] min-h-[540px] h-full max-h-[540px] border-[0.91px] border-solid border-zinc-200 rounded-[36px] relative bg-white flex flex-col items-center ${
          step === 4 && "justify-center"
        } overflow-hidden`}
      >
        {(step === 1 ||
          step === 2 ||
          step === 3 ||
          step === 5 ||
          step === 6) && (
          <>
            <div
              className={`w-full h-full flex flex-col ${dynamicSpacing} items-center grow relative`}
            >
              {/* Absolute Con with bg */}
              <div className="flex w-full h-full items-center justify-center absolute top-0 left-0 pointer-events-none select-none">
                {/* <div className="flex min-w-[353.76px] w-full max-w-[353.76px] min-h-[443.4px] h-full max-h-[443.4px] bg-[conic-gradient(from_43.24deg_at_24.88%_66.33%,_rgba(99,102,241,0.5)_-3.37deg,_#C7D2FE_54.89deg,_rgba(165,243,252,0.65)_63.64deg,_#FFFFFF_182.15deg,_#67E8F9_236.56deg,_rgba(99,102,241,0.5)_356.63deg,_#C7D2FE_414.89deg)] blur-[150px] opacity-60 transform-gpu rotate-[155.51deg]"> */}
                <div className="flex min-w-[353.76px] w-full max-w-[353.76px] min-h-[443.4px] h-full max-h-[443.4px]">
                  {(step === 1 ||
                    step === 2 ||
                    step === 3 ||
                    step === 4 ||
                    step === 6) && <img src={BoxBg} alt="Background Box" />}
                </div>
              </div>
              {step === 1 && firstStep()}
              {step === 2 && secondStep()}
              {step === 3 && thirdStep()}
              {/* {step === 4 && fourthStep()} */}
              {step === 5 && fifthStep()}
              {step === 6 && sixedStep()}
            </div>
          </>
        )}
        {step === 4 && fourthStep()}
      </div>
    </>
  );
};

export default Animations;
