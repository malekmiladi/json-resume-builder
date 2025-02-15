"use client";

import { useState } from "react";
import IconEdit from "@/app/components/editing-panel/icons/icon-edit";
import IconCheck from "@/app/components/editing-panel/icons/icon-check";

interface TitleProps {
    fileName: string;
    setFileName: (fileName: string) => void;
}

function Title({ fileName, setFileName }: TitleProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [newFileName, setNewFileName] = useState(fileName);
    return (
        <div className="w-full">
            {isEditing ? (
                <h1
                    className={
                        "text-xl font-bold tracking-tight text-(--foreground-primary) flex items-center gap-3"
                    }
                >
                    <input
                        type={"text"}
                        value={newFileName}
                        autoFocus={isEditing}
                        onChange={(e) => setNewFileName(e.target.value)}
                        className={
                            "[&:not(:focus)]:bg-(--background-secondary) [&:not(:focus)]:text-(--foreground-primary) focus:outline-0 focus:border-(--border-primary) focus:border border rounded border-(--border-primary) p-2 active:bg-(--background-secondary) focus:bg-(--background-secondary) active:text-(--foreground-primary) focus:text-(--foreground-primary)"
                        }
                    />
                    <button
                        className={"text-(--foreground-primary) cursor-pointer"}
                        onClick={() => {
                            setIsEditing(!isEditing);
                            if (fileName !== newFileName) {
                                setFileName(newFileName);
                            }
                        }}
                    >
                        <IconCheck size={20} />
                    </button>
                </h1>
            ) : (
                <h1
                    className={
                        "text-xl font-bold tracking-tight text-(--foreground-primary)"
                    }
                >
                    <div
                        className={
                            "flex items-center gap-3 text-(--foreground-primary)"
                        }
                    >
                        <p className={"p-2"}>{fileName}</p>
                        <button
                            className={"text-(--foreground-primary) cursor-pointer"}
                            onClick={() => {
                                setIsEditing(!isEditing);
                                setFileName(newFileName);
                            }}
                        >
                            <IconEdit size={20} />
                        </button>
                    </div>
                </h1>
            )}
        </div>
    );
}

export default Title;
