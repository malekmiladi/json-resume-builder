import React, {useState} from 'react';
import {AboutContent, ResumeJSON} from "@/app/definitions/types";
import IconEdit from "@/app/components/editing-panel/icons/icon-edit";
import IconCheck from "@/app/components/editing-panel/icons/icon-check";

interface AboutMeEditorProps {
    setResumeContent: (resumeContent: ResumeJSON | ((currentData: ResumeJSON) => ResumeJSON)) => void;
    data: AboutContent;
}

function AboutMeEditor({data, setResumeContent}: AboutMeEditorProps) {
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
                                            about: {
                                                title: title,
                                                content: data.content,
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
            <textarea
                onChange={(e) => {
                    setResumeContent((currentData: ResumeJSON): ResumeJSON => {
                        return {
                            ...currentData,
                            about: {
                                title: data.title,
                                content: e.target.value!
                            }
                        }
                    })
                }}
                defaultValue={data.content}
                className={"w-full rounded-xl p-3 bg-[--background] text-[--foreground]"}
            />
        </div>
    );
}

export default AboutMeEditor;