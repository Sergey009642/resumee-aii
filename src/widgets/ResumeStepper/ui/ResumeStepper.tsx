import { Steps } from "antd";
import { StepsConfig } from "../lib/stepsConfig";
import cls from "./ResumeStepper.module.scss";
import { ResumeSelectGrid } from "@features/ResumeSelectGrid/ui/ResumeSelectGrid";
import { ResumeContainer } from "@features/ResumeContainer/ui/ResumeContainer";
import { FirstStepForm } from "@features/FirstStepForm/ui/FirstStepForm";
import { StepFormSlice } from "@features/FirstStepForm/slice/FirstStepFormSlice";
import { useAtomValue, useSetAtom } from "jotai";
import { SecondStepForm } from "@features/SecondStepForm/ui/SecondStepForm";
import { EducationStep } from "@features/EducationStep/ui/EducationStep";

const StepperContent = [<FirstStepForm />, <EducationStep />, <SecondStepForm />,  <ResumeSelectGrid />, <ResumeContainer />];

const { $currentResumeStep } = StepFormSlice.initialState;
const { $handleResumeStepChange } = StepFormSlice.actions;

function ResumeStepper() {
  const current = useAtomValue($currentResumeStep);
  const setCurrent = useSetAtom($handleResumeStepChange);
  const isLastStep = current === StepperContent.length - 1;
  return (
    <div className={cls.ResumeStepperWrap}>
      {!isLastStep && (
        <div className={cls.stepperContainer}>
          <Steps 
            current={current} 
            onChange={setCurrent}
            items={StepsConfig}
            size="default"
            labelPlacement="vertical"
          />
        </div>
      )}
      {StepperContent[current]}
    </div>
  );
}
export { ResumeStepper };
