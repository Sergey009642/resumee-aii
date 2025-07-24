
import React from "react";
import { ResumeData } from "@entities/resumes/ResumeTemplate1/api/types";
import styles from "./ResumeTemplate5.module.scss";

const ResumeTemplate5 = React.forwardRef<HTMLDivElement, { resumeData: ResumeData; photo?: File | null; allowEditing?: boolean; contentSpace?: number }>(
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
      <div ref={ref} className={styles.timelineTemplate}>
        <div className={styles.timelineHeader}>
          <div className={styles.timelinePhotoWrap}>
            {photoUrl ? (
              <img src={photoUrl} alt="Resume photo" className={styles.timelinePhoto} />
            ) : (
              <div className={styles.timelinePhoto} style={{ background: "#ffe0b2", color: "#ea580c", fontSize: 18 }}>
                Photo
              </div>
            )}
          </div>
          <div className={styles.timelineHeaderInfo}>
            <h1>{name || (isEmpty ? "Your Name" : "")}</h1>
            <h2>{role || (isEmpty ? "Your Position" : "")}</h2>
            <div className={styles.timelineContact}>{location || (isEmpty ? "Your location" : "")}</div>
            <div className={styles.timelineContact}>{email || (isEmpty ? "your.email@example.com" : "")}</div>
          </div>
        </div>
        <div className={styles.timelineBody}>
          <div className={styles.timelineLine} />
          <div className={styles.timelineEvents}>
            {summary && (
              <div className={styles.timelineEvent}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <h3>Summary</h3>
                  <div>{summary}</div>
                </div>
              </div>
            )}
            {professionalPath && professionalPath.length > 0 && (
              <>
                {professionalPath.map((exp, idx) => (
                  <div className={styles.timelineEvent} key={"exp-" + idx}>
                    <div className={styles.timelineDot} />
                    <div className={styles.timelineContent}>
                      <h3>Experience</h3>
                      <div className={styles.timelineTitle}>{exp.role} <span className={styles.timelineCompany}>@ {exp.name}</span></div>
                      <div className={styles.timelinePeriod}>{exp.startWork} — {exp.endWork}</div>
                      <div className={styles.timelineDesc}>{exp.description}</div>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className={styles.timelineAchievements}>
                          {exp.achievements.map((ach, i) => (
                            <li key={i}>{ach}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
            {educationDetails && educationDetails.length > 0 && (
              <>
                {educationDetails.map((edu, i) => (
                  <div className={styles.timelineEvent} key={"edu-" + i}>
                    <div className={styles.timelineDot} />
                    <div className={styles.timelineContent}>
                      <h3>Education</h3>
                      <div className={styles.timelineTitle}>{edu.name}</div>
                      <div className={styles.timelineFaculty}>{edu.faculty} {edu.speciality && `- ${edu.speciality}`}</div>
                      <div className={styles.timelinePeriod}>{edu.endYear} {edu.level && `(${edu.level})`}</div>
                    </div>
                  </div>
                ))}
              </>
            )}
            {skills && skills.length > 0 && (
              <div className={styles.timelineEvent}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <h3>Skills</h3>
                  <div className={styles.timelineSkillsList}>
                    {skills.map((skill, i) => (
                      <span key={i} className={styles.timelineSkillBadge}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {isEmpty && (
              <div className={styles.timelineEvent}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <div className={styles.timelineEmptyText}>No data provided.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export { ResumeTemplate5 };
