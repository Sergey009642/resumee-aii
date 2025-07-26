import { faBriefcase, faCircleCheck, faCode, faGraduationCap, faPalette, faStar, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { extractJsonFromMarkdown } from "@shared/lib/extractJsonFromMarkdown";
import { Button, Spin, Typography } from "antd";
import classNames from "classnames";
import { useAtomValue, useSetAtom } from "jotai";
import { createPortal } from "react-dom";
import cls from "./ResumeSelectGrid.module.scss";
import { StepFormSlice } from "@features/FirstStepForm/slice/FirstStepFormSlice";
import { useResumeGeneration } from "@features/ResumeGeneration/lib/hooks/useResumeGeneration";

const templates = [
  {
    id: 0,
    title: "Modern Professional",
    description: "Clean and contemporary design with elegant typography",
    icon: <FontAwesomeIcon icon={faStar} className={cls.icon + " text-yellow-400"} />, // Most Popular
    badge: "Most Popular",
    gradient: "bg-gradient-to-r from-violet-600 to-fuchsia-600",
    img: "/firsttem.png",
  },
  {
    id: 1,
    title: "Creative Bold",
    description: "Eye-catching design perfect for creative professionals",
    icon: <FontAwesomeIcon icon={faPalette} className={cls.icon + " text-emerald-500"} />, // Creative
    badge: "Creative",
    gradient: "bg-gradient-to-r from-emerald-500 to-teal-400",
    img: "/sectem.png",
  },
  {
    id: 2,
    title: "Minimal Classic",
    description: "Simple and elegant design that focuses on content",
    icon: <FontAwesomeIcon icon={faCircleCheck} className={cls.icon + " text-slate-500"} />, // Classic
    badge: "Classic",
    gradient: "bg-gradient-to-r from-slate-500 to-gray-400",
    img: "/thrtem.png",
  },
  {
    id: 3,
    title: "Executive Professional",
    description: "Sophisticated design for senior-level positions",
    icon: <FontAwesomeIcon icon={faBriefcase} className={cls.icon + " text-blue-600"} />, // Executive
    badge: "Executive",
    gradient: "bg-gradient-to-r from-blue-600 to-indigo-500",
    img: "/forthem.png",
  },
  {
    id: 4,
    title: "Tech Modern",
    description: "Perfect for developers and tech professionals",
    icon: <FontAwesomeIcon icon={faCode} className={cls.icon + " text-orange-500"} />, // Tech
    badge: "Tech",
    gradient: "bg-gradient-to-r from-orange-500 to-red-400",
    img: "/fifthem.png",
  },
  {
    id: 5,
    title: "Academic Scholar",
    description: "Formal design ideal for academic and research roles",
    icon: <FontAwesomeIcon icon={faGraduationCap} className={cls.icon + " text-purple-600"} />, // Academic
    badge: "Academic",
    gradient: "bg-gradient-to-r from-purple-600 to-pink-400",
    img: "/sixthem.png",
  },
];


import { useEffect } from "react";

function ResumeSelectGrid() {
  const resumeData = useAtomValue(StepFormSlice.initialState.$resumeData);
  const resumePhoto = useAtomValue(StepFormSlice.initialState.$resumePhoto);
  const { generateResume, resumeGenerateLoading, contextHolder } = useResumeGeneration();
  const resumePreset = useAtomValue(StepFormSlice.initialState.$resumePreset);
  const allowNextStep = useAtomValue(StepFormSlice.selectors.$validateThirdStepRequiredFields);
  const handleFillResumeByAi = useSetAtom(StepFormSlice.actions.$fillResumeByAiMutation);
  const onResumeChangePreset = useSetAtom(StepFormSlice.actions.$onResumePresetChangeMutation);
  const handleNextStep = useSetAtom(StepFormSlice.actions.$handleResumeStepChange);

  // Set default template on mount if none selected
  useEffect(() => {
    if (resumePreset === null) {
      onResumeChangePreset(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumePreset]);

  const handleGenerateResume = () => {
    generateResume({
      name: resumeData?.name || "",
      role: resumeData?.role || "",
      education: resumeData?.education || "",
      location: resumeData?.location || "",
      email: resumeData?.email || "",
      experience: resumeData?.experience ? +resumeData?.experience : 3,
      experienceList: resumeData?.professionalPath || [],
    }).then((data) => {
      const resumeData = extractJsonFromMarkdown(data || "");
      handleFillResumeByAi(resumeData);
      handleNextStep(4);
    });
  };

  return (
    <>
      {contextHolder}
      <div className={cls.resumePreset}>
        <Typography.Title level={4} className={cls.headText}>Choose Your Resume Template</Typography.Title>
        <Typography.Paragraph className={cls.selectText}>
          Select a professional template that best represents your style
        </Typography.Paragraph>
        <div className={cls.resumeWrapper}>
          <div className={cls.resumeSelectGrid}>
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                role="presentation"
                onClick={() => onResumeChangePreset(tpl.id)}
                className={classNames(cls.resumeWrap, {
                  [cls.resumeSelection]: resumePreset === tpl.id,
                })}
                style={{ cursor: "pointer", minWidth: 260, maxWidth: 320, flex: 1 }}
              >
                <div
                  className={
                    cls.templateCard +
                    " " +
                    tpl.gradient +
                    (resumePreset === tpl.id ? " " + cls.selected : "")
                  }
                  style={{
                    borderRadius: 16,
                    boxShadow: resumePreset === tpl.id
                      ? "0 0 0 3px rgba(79, 70, 229, 0.3)"
                      : "0 4px 16px 0 rgba(30,41,59,0.08)",
                  }}
                >
                  {/* Նկարը առաջինը */}
                  <div className={cls.cardPreview} style={{ marginBottom: 16 }}>
                    <img
                      src={tpl.img}
                      alt={tpl.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "16px",
                        background: "#fff",
                      }}
                    />
                  </div>
                  {/* Title */}
                  <div className={cls.cardTitle}>{tpl.title}</div>
                  {/* Description */}
                  <div className={cls.cardDesc}>{tpl.description}</div>
                  {/* Icon + Badge ներքևում */}
                  <div className={cls.cardBadge} style={{ marginTop: 18 }}>
                    <span className={cls.cardBadgeIcon}>{tpl.icon}</span>
                    <span>{tpl.badge}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={cls.stepsNext}>
          <Button onClick={() => handleNextStep(0)} className={cls.backButton}>Back</Button>
          <Button
            onClick={handleGenerateResume}
            disabled={!allowNextStep}
            type="primary"
            className={cls.nextButton}
          >
            Continue
          </Button>
        </div>
      </div>
      {resumeGenerateLoading &&
        createPortal(
          <div className={cls.resumeSpinLarge}>
            <Spin size="large" />
          </div>,
          document.body
        )}
    </>
  );
}

export { ResumeSelectGrid };
