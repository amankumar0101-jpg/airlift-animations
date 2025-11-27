import React from "react";
import Animations from "@/components/custom/Animations";
import ProgressBar from "@/components/custom/ProgressBar";
import TabsSection from "@/components/custom/TabsSection";
import ProgressDashboard from "@/components/custom/ProgressDashboard";

const AirliftAnimations = () => {
  return (
    <>
      <div className="p-5 space-y-5">
        <TabsSection />
        <Animations />
        <div>
          <ProgressBar />
          <ProgressDashboard />
        </div>
        {/* <StepFourAnimation /> */}
      </div>
    </>
  );
};

export default AirliftAnimations;
