import React, { useEffect, useState } from 'react';

interface WorkExperience {
    title: string;
    company: string;
    date: string;
    duties: string[];
}

interface EducationEntry {
    degree: string;
    institution: string;
    date: string;
    courses: string[];
}

interface Course {
    course: string;
    institution: string;
    date: string;
}

interface Project {
    title: string;
    description: string;
    repo: string;
}

interface PastJob {
    description: string;
}

interface ResumeData {
    workExperience: WorkExperience[];
    education: EducationEntry[];
    additionalCourses: Course[];
    technicalSkills: string[];
    pastJobs: PastJob[];
    personalProjects: Project[];
}

const ResumeSections: React.FC = () => {
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('./source/resume.json').then(response => response.json());
                console.log(response);
                setResumeData(response);
            } catch (error) {
                console.error('Error loading resume.json:', error);
            }
        };
        loadData();
    }, []);

    if (!resumeData) return null;

    return (
        <div>
            <section id="work-experience">
                <h2>Work Experience</h2>
                {resumeData.workExperience.map((job, index) => (
                    <div className="job" key={index}>
                        <h3>{`${job.title} at ${job.company}`}</h3>
                        <p>{job.date}</p>
                        <ul>
                            {job.duties.map((duty, i) => (
                                <li key={i}>{duty}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            <section id="education">
                <h2>Education</h2>
                {resumeData.education.map((school, index) => (
                    <div className="education-entry" key={index}>
                        <h3>{`${school.degree} at ${school.institution}`}</h3>
                        <p>{school.date}</p>
                        <ul>
                            {school.courses.map((course, i) => (
                                <li key={i}>{course}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            <section id="additional-courses">
                <h2>Additional Recent Courses</h2>
                <ul>
                    {resumeData.additionalCourses.map((course, index) => (
                        <li key={index}>
                            {`${course.course} at ${course.institution} - ${course.date}`}
                        </li>
                    ))}
                </ul>
            </section>

            <section id="technical-skills">
                <h2>Technical Skills</h2>
                <ul>
                    {resumeData.technicalSkills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </section>

            <section id="past-jobs">
                <h2>Past Jobs</h2>
                {resumeData.pastJobs.map((job, index) => (
                    <p key={index}>{job.description}</p>
                ))}
            </section>

            <section id="personal-projects">
                <h2>Personal Projects</h2>
                {resumeData.personalProjects.map((project, index) => (
                    <div className="project" key={index}>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default ResumeSections;
