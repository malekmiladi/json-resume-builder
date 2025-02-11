import React, {ChangeEvent} from 'react';
import Title from "@/app/components/editing-panel/title";
import {ResumeJSON} from "@/app/definitions/types";
import AboutMeEditor from "@/app/components/editing-panel/about-me-editor";
import ExperienceEditor from "@/app/components/editing-panel/experience-editor";

interface PanelProps {
    fileName: string;
    resumeData: ResumeJSON;
    setFileName: (fileName: string) => void;
    handleFileChange: (e: ChangeEvent) => void;
    setResumeContent: (resumeContent: ResumeJSON | ((currentData: ResumeJSON) => ResumeJSON)) => void;
    handleDownloadJson: () => void;
}

function Panel(
    {
        resumeData,
        fileName,
        setFileName,
        handleFileChange,
        setResumeContent,
        handleDownloadJson
    }: PanelProps
) {
    return (
        <div className="gap-2">
            <div
                className={"flex flex-row justify-between items-center p-2 m-3 bg-[--foreground] rounded-xl"}
            >
                <Title setFileName={setFileName} fileName={fileName}/>
                <div className={"flex flex-row gap-2"}>
                    <label
                        htmlFor={"file"}
                        className={"h-fit p-2 bg-[--background] text-[--foreground] rounded-xl"}
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
                        className={"h-fit p-2 bg-[--background] text-[--foreground] rounded-xl"}
                        onClick={handleDownloadJson}
                    >
                        Download JSON
                    </button>
                </div>
            </div>
            {
                (Object.keys(resumeData).length > 0) &&
                <>
                    <AboutMeEditor setResumeContent={setResumeContent} data={resumeData.about}/>
                    <ExperienceEditor setResumeContent={setResumeContent} data={resumeData.experiences}/>
                </>
            }
        </div>
    );
}

export default Panel;