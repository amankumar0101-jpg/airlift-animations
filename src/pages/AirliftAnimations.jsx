import React from "react";
import Animations from "@/components/custom/Animations";
import ProgressBar from "@/components/custom/ProgressBar";
import ProgressDashboard from "@/components/custom/ProgressDashboard";
import ProgressFull from "@/components/custom/ProgressFull";
import TabsSection from "@/components/custom/TabsSection";
import AnimationTesting from "@/components/custom/AnimationTesting";

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
      </div>
    </>
  );
};

export default AirliftAnimations;
