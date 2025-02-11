import React, {useState} from 'react';
import IconCheck from "@/app/components/editing-panel/icons/icon-check";
import IconEdit from "@/app/components/editing-panel/icons/icon-edit";
import {AboutContent, ExperiencesContent, ResumeJSON} from "@/app/definitions/types";

interface ExperienceEditorProps {
    setResumeContent: (resumeContent: ResumeJSON | ((currentData: ResumeJSON) => ResumeJSON)) => void;
    data: ExperiencesContent;
}

function ExperienceEditor({data, setResumeContent}: ExperienceEditorProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(data.title);
    return (
        <div className={"bg-[--foreground] rounded-xl p-2 m-3 flex flex-col gap-2"}>
            {
                isEditing ?
                    <h2 className={"text-lg font-semibold text-[--foreground] flex flex-row items-center gap-2"}>
                        <input
                            value={title}
                            className={"[&:not(:focus)]:bg-[--foreground] [&:not(:focus)]:text-[--background] focus:outline-0 focus:border-[--background] focus:border border rounded-xl border-[--foreground] active:bg-[--foreground] focus:bg-[--foreground] active:text-[--background] focus:text-[--background]"}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <button
                            className={"text-[--background] border-2 border-[--background] rounded-xl"}
                            onClick={() => {
                                setIsEditing(false);
                                if (title !== data.title) {
                                    setResumeContent((currentData: ResumeJSON): ResumeJSON => {
                                        return {
                                            ...currentData,
                                            experiences: {
                                                title: title,
                                                entries: data.entries,
                                            }
                                        }
                                    })
                                }
                            }}
                        >
                            <IconCheck size={20} />
                        </button>
                    </h2>
                    :
                    <h2
                        onClick={() => {
                            setIsEditing(true);
                        }}
                        className={"text-lg font-semibold flex flex-row items-center gap-2"}>
                        <p>
                            {data.title}
                        </p>
                        <IconEdit size={20}/>
                    </h2>
            }
            <div className={"flex flex-col gap-4"}>
                {
                    data.entries.map((experience, i) => (
                        <div key={`experience-editor-entry-${i}`} className={"flex flex-col"}>
                            <fieldset className={"flex flex-col gap-2"}>
                                <label htmlFor={`experience-editor-entry-title-${i}`} className={"text-lg"}>
                                    Job Title
                                </label>
                                <input className={"w-full rounded-xl p-3 bg-[--background] text-[--foreground]"} id={`experience-editor-entry-title-${i}`} type={"text"} value={experience.position} />
                                <label htmlFor={`experience-editor-entry-employer-${i}`} className={"text-lg"}>
                                    Employer
                                </label>
                                <input className={"w-full rounded-xl p-3 bg-[--background] text-[--foreground]"} id={`experience-editor-entry-employer-${i}`} type={"text"} value={experience.company.name} />
                            </fieldset>
                        </div>
                    ))
                }
            </div>

        </div>
    );
}

export default ExperienceEditor;