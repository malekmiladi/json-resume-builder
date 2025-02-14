'use client';

import React, {useState} from 'react';
import IconEdit from "@/app/components/editing-panel/icons/icon-edit";
import IconCheck from "@/app/components/editing-panel/icons/icon-check";

interface TitleProps {
    fileName: string;
    setFileName: (fileName: string) => void;
}

function Title({fileName, setFileName}: TitleProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [newFileName, setNewFileName] = useState(fileName);
    return (
        <div className="w-fit">
            {
                isEditing ?
                    <h1 className={"text-xl font-bold tracking-tight text-[--foreground] flex items-center gap-3"}>
                        <input
                            type={"text"}
                            value={newFileName}
                            autoFocus={isEditing}
                            onChange={(e) => setNewFileName(e.target.value)}
                            className={"[&:not(:focus)]:bg-[--bg-secondary] [&:not(:focus)]:text-[--foreground] focus:outline-0 focus:border-[--border-primary] focus:border border rounded border-[--border-primary] p-2 active:bg-[--bg-secondary] focus:bg-[--bg-secondary] active:text-[--foreground] focus:text-[--foreground]"}
                        />
                        <button
                            className={"text-[--foreground]"}
                            onClick={() => {
                                setIsEditing(!isEditing);
                                if (fileName !== newFileName) {
                                    setFileName(newFileName);
                                }
                            }}
                        >
                            <IconCheck size={20} />
                        </button>
                    </h1> :
                    <h1 className={"text-xl font-bold tracking-tight text-[--foreground]"}>
                        <div
                            className={"flex items-center gap-3 text-[--foreground]"}
                            onClick={() => {
                                setIsEditing(!isEditing);
                                setFileName(newFileName);
                            }}
                        >
                            <p className={"p-2"}>{fileName}</p>
                            <p className={"text-[--foreground]"}><IconEdit size={20} /></p>
                        </div>
                    </h1>
            }
        </div>
    );
}

export default Title;