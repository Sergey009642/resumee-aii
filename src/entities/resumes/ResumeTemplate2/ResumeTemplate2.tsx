import React from "react";
import { ResumeData } from "@entities/resumes/ResumeTemplate1/api/types";
import styles from "./ResumeTemplate2.module.scss";

const ResumeTemplate2 = React.forwardRef<HTMLDivElement, { resumeData: ResumeData; photo?: File | null; allowEditing?: boolean; contentSpace?: number }>(
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
      <div ref={ref} className={styles.template2}>
        <div className={styles.sidebarLayout}>
          <aside className={styles.sidebar}>
            <div className={styles.photoWrap}>
              {photoUrl ? (
                <img src={photoUrl} alt="Resume photo" className={styles.photo} />
              ) : (
                <div className={styles.photo} style={{ background: '#b2fef7', color: '#009688', fontSize: 18 }}>Photo</div>
              )}
            </div>
            <div className={styles.sidebarSection}>
              <div className={styles.name}>{name || "Your Name"}</div>
              <div className={styles.role}>{role || "Your Position"}</div>
            </div>
            <div className={styles.sidebarSection}>
              <div className={styles.contact}>{location || "Your location"}</div>
              <div className={styles.contact}>{email || "your.email@example.com"}</div>
            </div>
            <div className={styles.sidebarSection}>
              <h3>Skills</h3>
              <div className={styles.skillsList}>
                {skills && skills.length > 0 ? (
                  skills.map((skill, i) => (
                    <span key={i} className={styles.skillBadge}>{skill}</span>
                  ))
                ) : (
                  <span className={styles.emptyText}>No skills listed.</span>
                )}
              </div>
            </div>
          </aside>
          <main className={styles.mainContent}>
            <section className={styles.section}>
              <h3>Summary</h3>
              <div>{summary || "A brief description about yourself, your skills, and career objectives."}</div>
            </section>
            <section className={styles.section}>
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
                  <div className={styles.expPeriod}>
                    {exp.startWork} — {exp.endWork}
                  </div>
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
            </section>
            <section className={styles.section}>
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
            </section>
          </main>
        </div>
      </div>
    );
  }
);

export { ResumeTemplate2 };
