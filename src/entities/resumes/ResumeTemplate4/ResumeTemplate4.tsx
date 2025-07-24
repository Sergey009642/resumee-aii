
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
            <img src={photoUrl} alt="Resume photo" className="photo" />
          ) : (
            <div className="photo" style={{ color: '#a1a1aa' }}>Photo</div>
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
              {professionalPath && professionalPath.length > 0 ? (
                professionalPath.map((exp: any, idx: number) => (
                  <div key={idx} style={{ marginBottom: 12, maxWidth: '100%', overflowWrap: 'break-word' }}>
                    <div style={{ fontWeight: 600, fontSize: 15, wordBreak: 'break-word' }}>{exp.role} <span style={{ color: '#7c3aed', fontWeight: 400 }}>@ {exp.name}</span></div>
                    <div style={{ fontSize: 13, color: '#6d28d9', marginBottom: 2 }}>{exp.startWork} — {exp.endWork}</div>
                    <div style={{ fontSize: 13, color: '#232046', marginBottom: 4, wordBreak: 'break-word' }}>{exp.description}</div>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul style={{ margin: 0, paddingLeft: 16, color: '#16a34a', fontSize: 13 }}>
                        {exp.achievements.map((ach: string, i: number) => (
                          <li key={i} style={{ wordBreak: 'break-word' }}>{ach}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              ) : isEmpty ? (
                <div style={{ color: '#a1a1aa', fontSize: 14 }}>No experience listed.</div>
              ) : null}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles['template4-section']}>
              <h3>Skills</h3>
              <div className={styles['template4-skills']}>
                {skills && skills.length > 0 ? (
                  skills.map((skill: string, i: number) => (
                    <span key={i} className={styles['template4-skill-badge']}>{skill}</span>
                  ))
                ) : (
                  <span style={{ color: '#a1a1aa', fontSize: 14 }}>No skills listed.</span>
                )}
              </div>
            </div>
            <div className={styles['template4-section']}>
              <h3>Education</h3>
              <div>
                {educationDetails && educationDetails.length > 0 ? (
                  educationDetails.map((edu: any, i: number) => (
                    <div key={i} className={styles['template4-edu-card']} style={{ wordBreak: 'break-word' }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{edu.name}</div>
                      <div style={{ fontSize: 13, color: '#6d28d9' }}>{edu.faculty} {edu.speciality && `- ${edu.speciality}`}</div>
                      <div style={{ fontSize: 12, color: '#232046' }}>{edu.endYear} {edu.level && `(${edu.level})`}</div>
                    </div>
                  ))
                ) : (
                  <span style={{ color: '#a1a1aa', fontSize: 14 }}>No education listed.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export { ResumeTemplate4 };
