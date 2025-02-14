'use client';

import {ChangeEvent} from 'react';
import Title from "@/app/components/editing-panel/title";
import {ResumeJSON} from "@/app/definitions/resume.types";
import AboutMeEditor from "@/app/components/editing-panel/about-me-editor";
import ExperienceEditor from "@/app/components/editing-panel/experience-editor";

interface PanelProps {
    fileName: string;
    resumeData: ResumeJSON;
    setFileName: (fileName: string) => void;
    handleFileChange: (e: ChangeEvent) => void;
    setResumeContent: (resumeContent: ResumeJSON | ((currentData: ResumeJSON) => ResumeJSON)) => void;
    handleDownloadJson: () => void;
    handleDownloadPdf: () => void;
}

function Panel(
    {
        resumeData,
        fileName,
        setFileName,
        handleFileChange,
        setResumeContent,
        handleDownloadJson,
        handleDownloadPdf
    }: PanelProps
) {
    return (
        <>
            <div
                className={"flex flex-col md:flex-row justify-between items-center p-2 border border-[--border-primary] bg-[--background] rounded"}
            >
                <Title setFileName={setFileName} fileName={fileName}/>
                <div className={"flex flex-col md:flex-row md:justify-end gap-2 w-full"}>
                    <label
                        htmlFor={"file"}
                        className={"h-fit p-2 bg-[--bg-secondary] border border-[--border-primary] text-[--foreground] rounded text-center"}
                    >
                        Import
                        <input
                            id="file"
                            hidden={true}
                            type="file"
                            onChange={handleFileChange}
                        />
                    </label>
                    <button
                        className={"h-fit p-2 border border-[--border-primary] bg-[--bg-secondary] text-[--foreground] rounded"}
                        onClick={handleDownloadPdf}
                    >
                        Download PDF
                    </button>
                    <button
                        className={"h-fit p-2 border border-[--border-primary] bg-[--bg-secondary] text-[--foreground] rounded"}
                        onClick={handleDownloadJson}
                    >
                        Download JSON
                    </button>
                </div>
            </div>
            {
                <>
                    {resumeData.about && <AboutMeEditor setResumeContent={setResumeContent} data={resumeData.about}/>}
                    {resumeData.experiences && <ExperienceEditor setResumeContent={setResumeContent} data={resumeData.experiences}/>}
                </>
            }
        </>
    );
}

export default Panel;