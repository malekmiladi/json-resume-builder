'use client';

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
        <div className={"bg-[--background] border border-[--border-primary] rounded p-2 flex flex-col gap-2"}>
            {
                isEditing ?
                    <h2 className={"text-lg font-semibold text-[--foreground] flex flex-row items-center gap-2"}>
                        <input
                            value={title}
                            className={"pl-2 pr-2 [&:not(:focus)]:bg-[--bg-secondary] [&:not(:focus)]:text-[--foreground] focus:outline-0 focus:border-[--border-primary] focus:border border rounded border-[--border-primary] active:bg-[--bg-secondary] focus:bg-[--bg-secondary] active:text-[--foreground] focus:text-[--foreground]"}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <button
                            className={"text-[--foreground] border border-[--border-primary] rounded"}
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
                        className={"text-lg font-semibold flex flex-row items-center gap-2 text-[--foreground]"}>
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
                className={"w-full rounded p-3 bg-[--bg-secondary] text-[--foreground]"}
            />
        </div>
    );
}

export default AboutMeEditor;