
import React from "react";
import { ResumeData } from "@entities/resumes/ResumeTemplate1/api/types";
import cls from "./ResumeTemplate3.module.scss";

const ResumeTemplate3 = React.forwardRef<HTMLDivElement, { resumeData: ResumeData; photo?: File | null; allowEditing?: boolean; contentSpace?: number }>(
  ({ resumeData, photo }, ref) => {
    const {
      name,
      role,
      location,
      email,
      summary,
      skills,
      professionalPath,
      educationDetails,
    } = resumeData || {};

    const [photoUrl, setPhotoUrl] = React.useState<string>("");
    React.useEffect(() => {
      if (photo) {
        const url = typeof photo === "string" ? photo : URL.createObjectURL(photo);
        setPhotoUrl(url);
        return () => {
          if (typeof photo !== "string") URL.revokeObjectURL(url);
        };
      } else {
        setPhotoUrl("");
      }
    }, [photo]);

    const isEmpty =
      !name &&
      !role &&
      !email &&
      !summary &&
      (!skills || skills.length === 0) &&
      (!professionalPath || professionalPath.length === 0) &&
      (!educationDetails || educationDetails.length === 0);

    return (
      <div ref={ref} className={cls.gridLayout}>
        <div className={cls.gridHeader}>
          <div className={cls.headerPhotoWrap}>
            {photoUrl ? (
              <img src={photoUrl} alt="Resume photo" className={cls.photo} />
            ) : (
              <div className={cls.photo} style={{ background: '#e0e7ef', color: '#64748b', fontSize: 18 }}>Photo</div>
            )}
          </div>
          <div className={cls.headerInfo}>
            <h1>{name || (isEmpty ? "Your Name" : "")}</h1>
            <h2>{role || (isEmpty ? "Your Position" : "")}</h2>
            <div className={cls.contact}>{location || (isEmpty ? "Your location" : "")}</div>
            <div className={cls.contact}>{email || (isEmpty ? "your.email@example.com" : "")}</div>
          </div>
        </div>
        <div className={cls.gridSummary}>
          <h3>Summary</h3>
          <div>{summary || (isEmpty ? "A brief description about yourself, your skills, and career objectives." : "")}</div>
        </div>
        <div className={cls.gridExperience}>
          <h3>Professional Experience</h3>
          {professionalPath && professionalPath.length > 0 ? (
            professionalPath.map((exp, idx) => (
              <div key={idx} className={cls.expItem}>
                <div className={cls.expTitle}>{exp.role} <span className={cls.expCompany}>@ {exp.name}</span></div>
                <div className={cls.expPeriod}>{exp.startWork} — {exp.endWork}</div>
                <div className={cls.expDesc}>{exp.description}</div>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className={cls.achievementsList}>
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : isEmpty ? (
            <div className={cls.emptyText}>No experience listed.</div>
          ) : null}
        </div>
        <div className={cls.gridSkills}>
          <h3>Skills</h3>
          <div className={cls.skillsList}>
            {skills && skills.length > 0 ? (
              skills.map((skill, i) => (
                <span key={i} className={cls.skillBadge}>{skill}</span>
              ))
            ) : (
              <span className={cls.emptyText}>No skills listed.</span>
            )}
          </div>
        </div>
        <div className={cls.gridEducation}>
          <h3>Education</h3>
          <div>
            {educationDetails && educationDetails.length > 0 ? (
              educationDetails.map((edu, i) => (
                <div key={i} className={cls.eduItem}>
                  <div className={cls.eduName}>{edu.name}</div>
                  <div className={cls.eduFaculty}>{edu.faculty} {edu.speciality && `- ${edu.speciality}`}</div>
                  <div className={cls.eduPeriod}>{edu.endYear} {edu.level && `(${edu.level})`}</div>
                </div>
              ))
            ) : (
              <span className={cls.emptyText}>No education listed.</span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export { ResumeTemplate3 };
