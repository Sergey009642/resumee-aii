import React from "react";
import { ResumeData } from "@entities/resumes/ResumeTemplate1/api/types";
import styles from "./ResumeTemplate4.module.scss";

const ResumeTemplate4 = React.forwardRef<HTMLDivElement, { resumeData: ResumeData; photo?: File | null; allowEditing?: boolean; contentSpace?: number }>(
  ({ resumeData, photo, allowEditing, contentSpace }, ref) => {
    const {
      name,
      role,
      experience,
      education,
      location,
      skills,
      summary,
      email,
      professionalPath,
      educationDetails,
    } = resumeData || {};

    const [photoUrl, setPhotoUrl] = React.useState<string>('');
    React.useEffect(() => {
      if (photo) {
        const url = typeof photo === 'string' ? photo : URL.createObjectURL(photo);
        setPhotoUrl(url);
        return () => { if (typeof photo !== 'string') URL.revokeObjectURL(url); };
      } else {
        setPhotoUrl('');
      }
    }, [photo]);

    const isEmpty = !name && !role && !email && !summary && (!skills || skills.length === 0) &&
      (!professionalPath || professionalPath.length === 0) &&
      (!educationDetails || educationDetails.length === 0);

    return (
      <div ref={ref} className={styles.template4}>
        <div className={styles['template4-header']}>
          {photoUrl ? (
            <img src={photoUrl} alt="Resume photo" className={styles.photo} />
          ) : (
            <div className={styles.photo}>Photo</div>
          )}
          <h1>{name || (isEmpty ? "Your Name" : "")}</h1>
          <h2>{role || (isEmpty ? "Your Position" : "")}</h2>
          <div className={styles.contact}>{location || (isEmpty ? "Your location" : "")}</div>
          <div className={styles.contact}>{email || (isEmpty ? "your.email@example.com" : "")}</div>
        </div>
        <div className={styles['template4-main']}>
          <div className={styles.left}>
            <div className={styles['template4-section']}>
              <h3>Summary</h3>
              <div>{summary || (isEmpty ? "A brief description about yourself, your skills, and career objectives. This section should highlight your key strengths and what makes you unique as a professional." : "")}</div>
            </div>
            <div className={styles['template4-section']}>
              <h3>Professional Experience</h3>
              {(professionalPath && professionalPath.length > 0
                ? professionalPath
                : [
                    {
                      role: "Position",
                      name: "Company",
                      startWork: "Start",
                      endWork: "End",
                      description: "Describe your responsibilities or achievements here.",
                      achievements: [],
                    },
                  ]
              ).map((exp, idx) => (
                <div key={idx} className={styles.expItem}>
                  <div className={styles.expTitle}>
                    {exp.role} <span className={styles.expCompany}>@ {exp.name}</span>
                  </div>
                  <div className={styles.expPeriod}>{exp.startWork} — {exp.endWork}</div>
                  <div className={styles.expDesc}>{exp.description}</div>
                  {exp.achievements && exp.achievements.length > 0 ? (
                    <ul className={styles.achievementsList}>
                      {exp.achievements.map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles['template4-section']}>
              <h3>Skills</h3>
              <div className={styles.skillsList}>
                {skills && skills.length > 0 ? (
                  skills.map((skill, i) => (
                    <span key={i} className={styles.skillBadge}>{skill}</span>
                  ))
                ) : (
                  <>
                    <span className={styles.skillBadge}>Teamwork</span>
                    <span className={styles.skillBadge}>Communication</span>
                    <span className={styles.skillBadge}>Problem Solving</span>
                  </>
                )}
              </div>
            </div>
            <div className={styles['template4-section']}>
              <h3>Education</h3>
              <div>
                {(educationDetails && educationDetails.length > 0
                  ? educationDetails
                  : [
                      {
                        name: "Institution Name",
                        faculty: "Faculty",
                        speciality: "",
                        endYear: "Year",
                        level: "",
                      },
                    ]
                ).map((edu, i) => (
                  <div key={i} className={styles.eduItem}>
                    <div className={styles.eduName}>{edu.name || "Institution Name"}</div>
                    <div className={styles.eduFaculty}>
                      {edu.faculty || "Faculty"}
                      {edu.speciality && ` - ${edu.speciality}`}
                    </div>
                    <div className={styles.eduPeriod}>
                      {edu.endYear || "Year"}
                      {edu.level && ` (${edu.level})`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export { ResumeTemplate4 };
