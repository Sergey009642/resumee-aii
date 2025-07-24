// type ResumeContainerProps = {
import cls from "./ResumeContainer.module.scss";
import { ResumeTemplate1 } from "@entities/resumes/ResumeTemplate1/ResumeTemplate1";
import { ResumeTemplate2 } from "@entities/resumes/ResumeTemplate2/ResumeTemplate2";
import { ResumeTemplate3 } from "@entities/resumes/ResumeTemplate3/ResumeTemplate3";
import { ResumeTemplate4 } from "@entities/resumes/ResumeTemplate4/ResumeTemplate4";
import { ResumeTemplate5 } from "@entities/resumes/ResumeTemplate5/ResumeTemplate5";
import { ResumeTemplate6 } from "@entities/resumes/ResumeTemplate6/ResumeTemplate6";
import Printer from "@shared/assets/icons20/printer.png";
import { ToolBar } from "@features/ToolBar/ui/ToolBar";
import { StepFormSlice } from "@features/FirstStepForm/slice/FirstStepFormSlice";
import { useAtomValue } from "jotai";
import { ResumeData } from "@entities/resumes/ResumeTemplate1/api/types";
import { useEffect, useRef, useState } from "react";
import { resumeMock } from "@entities/resumes/ResumeTemplate1/lib/resumeMock";
import { createPortal } from "react-dom";

// };

const { $resumeData, $resumePhoto, $resumePreset } = StepFormSlice.initialState;


function getTemplateComponent(preset: number | null) {
  switch (preset) {
    case 0:
      return ResumeTemplate1;
    case 1:
      return ResumeTemplate2;
    case 2:
      return ResumeTemplate3;
    case 3:
      return ResumeTemplate4;
    case 4:
      return ResumeTemplate5;
    case 5:
      return ResumeTemplate6;
    default:
      return ResumeTemplate1;
  }
}

function ResumeContainer() {
  const [pageOffsets, setPageOffsets] = useState<number[]>([0]);
  const resumeContentRef = useRef<HTMLDivElement>(null);
  const resumeData = useAtomValue($resumeData);
  const photo = useAtomValue($resumePhoto);
  const resumePreset = useAtomValue($resumePreset);
  const TemplateComponent = getTemplateComponent(resumePreset);

  useEffect(() => {
    if (!resumeContentRef.current || !resumeContentRef.current.parentElement) return;

    const contentHeight = resumeContentRef.current.offsetHeight;
    const pageHeight = resumeContentRef.current.parentElement.offsetHeight;

    if (contentHeight <= pageHeight) {
      setPageOffsets([0]);
      return;
    }

    const pageCount = Math.ceil(contentHeight / pageHeight);
    const newOffsets = Array.from({ length: pageCount }, (_, i) => -pageHeight * i);

    setPageOffsets(newOffsets);
  }, [resumeData, photo]);

  // Использование в рендере:
  return (
    <>
      {createPortal((
        <div className={cls.shadowResume}>
          <TemplateComponent
            ref={resumeContentRef}
            photo={photo}
            resumeData={resumeData as ResumeData}
            contentSpace={0}
          />
        </div>
      ), document.body)}
      <div className={cls.resumeSpliter}>
        <div
          // min={780} 
          className={cls.hideToolbar}>
          <ToolBar />
        </div>

        <div className={cls.resumeStep}>
          <div className={cls.resumeToolbar}>
            <button className={cls.resume} onClick={() => window.print()}>
              <img src={Printer} />
            </button>
          </div>
          <div className={cls.containter}>
            <div className={cls.resumeWrap}>
              {pageOffsets.map((offsets, idx) => (
                <>
                  {idx > 0 && <div className={cls.spacer} />}
                  <div className={cls.resumePageBreak}>
                    <TemplateComponent
                      key={offsets}
                      photo={photo}
                      resumeData={resumeData as ResumeData}
                      allowEditing
                      contentSpace={offsets}
                    />
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export { ResumeContainer };
