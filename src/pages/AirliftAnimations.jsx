import React from "react";
import Animations from "@/components/custom/Animations";
import ProgressBar from "@/components/custom/ProgressBar";
import ProgressDashboard from "@/components/custom/ProgressDashboard";

const AirliftAnimations = () => {
  return (
    <>
      <div className="p-5 space-y-5">
        <Animations />
        <ProgressBar />
        <ProgressDashboard />
      </div>
    </>
  );
};

export default AirliftAnimations;
