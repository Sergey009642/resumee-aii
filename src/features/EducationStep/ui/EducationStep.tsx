import { Typography } from "@shared/ui/typography";
import cls from "./EducationStep.module.scss";
import { Button, DatePicker, Divider, Input, Select } from "antd";
import classNames from "classnames";
import dayjs from "dayjs";
import { StepFormSlice } from "@features/FirstStepForm/slice/FirstStepFormSlice";
import { useAtomValue, useSetAtom } from "jotai";
import { CloseOutlined } from "@ant-design/icons";
import { ResumeData } from "@entities/resumes/ResumeTemplate1/api/types";

export const selectOption = [
  {
    value: "bachelor",
    label: "Bachelor's Degree",
  },
  {
    value: "master",
    label: "Master's Degree",
  },
  {
    value: "specialist",
    label: "Specialist Degree",
  },
  {
    value: "doctor",
    label: "Doctor of Science",
  },
];

const { initialState } = StepFormSlice;
const {
  $onFirstStepMutation,
  $onAddEducationButtonClick,
  $onDeleteEducationButtonClick,
  $handleResumeStepChange,
  $handleUpdateResumeDataMutation,
} = StepFormSlice.actions;

const EducationStep = () => {
  const resumeData = useAtomValue(initialState.$resumeData);
  const handleWritedata = useSetAtom($onFirstStepMutation);
  const handleAddEducation = useSetAtom($onAddEducationButtonClick);
  const handleDeleteEducation = useSetAtom($onDeleteEducationButtonClick);
  const handleResumeStepChange = useSetAtom($handleResumeStepChange);
  const handleResumeClearForm = useSetAtom($handleUpdateResumeDataMutation);

  return (
    <div className={cls.container}>
      <div className={cls.mainWrapper}>
        <div className={cls.textWrapper}>
          <div className={cls.headText}>
            <img src="/ed.png" alt="" />
            <h1 className={cls.headTextTitle}>
              Education Details
            </h1>
          </div>
          <Typography.Ubuntu className={cls.subtitleText}>
            Provide your educational background to highlight your qualifications.
          </Typography.Ubuntu>
        </div>
        <div className={cls.scrollArea}>
          {(resumeData?.educationDetails || []).map((el, idx) => (
            <>
              <Divider style={{ display: idx === 0 ? "none" : undefined }} />
              <div className={cls.crossButtonWrapper}>
                <Button
                  type="text"
                  size="small"
                  style={{
                    // display: idx === 0 ? "none" : undefined,
                    width: "40px",
                  }}
                  onClick={() => handleDeleteEducation(idx)}
                >
                  <CloseOutlined size={12} />
                </Button>
              </div>
              <div className={cls.educationWrapper}>
                <div className={classNames(cls.elementWrapper, cls.wholeLine)}>
                  <Typography.IbmPlexMono
                    nowrap
                    className={classNames(cls.inputText, cls.text1)}
                  >
                    {"Name of Institution"}
                  </Typography.IbmPlexMono>
                  <Input
                    className={cls.input}
                    allowClear
                    size="large"
                    variant="outlined"
                    placeholder="e.g., University of California"
                    value={el.name}
                    onChange={(e) =>
                      handleWritedata({
                        index: idx,
                        field: "educationDetails",
                        data: e.target.value,
                        subField: "name",
                      })
                    }
                  />
                </div>
                <div className={classNames(cls.elementWrapper, cls.wholeLine)}>
                  <Typography.IbmPlexMono
                    nowrap
                    className={classNames(cls.inputText, cls.text1)}
                  >
                    {"Faculty"}
                  </Typography.IbmPlexMono>
                  <Input
                    className={cls.input}
                    allowClear
                    placeholder="e.g., School of Engineering"
                    size="large"
                    variant="outlined"
                    value={el.faculty}
                    onChange={(e) =>
                      handleWritedata({
                        index: idx,
                        field: "educationDetails",
                        data: e.target.value,
                        subField: "faculty",
                      })
                    }
                  />
                </div>
                <div className={classNames(cls.elementWrapper, cls.wholeLine)}>
                  <Typography.IbmPlexMono
                    nowrap
                    className={classNames(cls.inputText, cls.text1)}
                  >
                    {"Specialization"}
                  </Typography.IbmPlexMono>
                  <Input
                    className={cls.input}
                    allowClear
                    placeholder="e.g., Computer Science"
                    size="large"
                    variant="outlined"
                    value={el.speciality}
                    onChange={(e) =>
                      handleWritedata({
                        index: idx,
                        field: "educationDetails",
                        data: e.target.value,
                        subField: "speciality",
                      })
                    }
                  />
                </div>
                <div className={cls.elementWrapper}>
                  <Typography.IbmPlexMono
                    nowrap
                    className={classNames(cls.inputText, cls.text1)}
                  >
                    {"Level"}
                  </Typography.IbmPlexMono>
                  <Select
                    className="select"
                    allowClear
                    size="large"
                    variant="outlined"
                    options={selectOption}
                    value={el.level}
                    onChange={(e) =>
                      handleWritedata({
                        index: idx,
                        field: "educationDetails",
                        data: e,
                        subField: "level",
                      })
                    }
                  />
                </div>
                <div className={cls.elementWrapper}>
                  <Typography.IbmPlexMono
                    nowrap
                    className={classNames(cls.inputText, cls.text1)}
                  >
                    {"Graduation Year"}
                  </Typography.IbmPlexMono>
                  <DatePicker
                    className={cls.input}
                    width={"100%"}
                    picker="year"
                    style={{
                      width: "100%",
                    }}
                    format="YYYY"
                    size="large"
                    value={
                      dayjs(el.endYear).isValid()
                        ? dayjs(el.endYear)
                        : undefined
                    }
                    onChange={(e) =>
                      handleWritedata({
                        index: idx,
                        field: "educationDetails",
                        data: dayjs(e).format("YYYY"),
                        subField: "endYear",
                      })
                    }
                  />
                </div>
              </div>
            </>
          ))}
        </div>
        <div className={cls.addWorkExpirience}>
          <Button
            className={cls.addWorkExpirienceButton}
            onClick={() => handleAddEducation()}
          >
            + Add another place of study
          </Button>
        </div>

        <div className={cls.stepsNext}>
          <Button onClick={() => handleResumeClearForm({
            ...resumeData,
            educationDetails: [],
          } as ResumeData)}>Очистить</Button>

          <Button
            onClick={() => {
              handleResumeStepChange(2);
            }}
            // disabled={!validateRequiredFields}
            type="primary"
          >
            Далее
          </Button>
        </div>
      </div>
    </div>
  );
};

export { EducationStep };
