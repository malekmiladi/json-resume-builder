"use client";

import React, { useState } from "react";
import { AboutContent, ResumeJSON } from "@/app/definitions/resume-types";
import IconEdit from "@/app/components/editing-panel/icons/icon-edit";
import IconCheck from "@/app/components/editing-panel/icons/icon-check";
import { JsonUtils } from "@/app/utils/json-utils";
import Collapsible from "@/app/components/collapsible";

interface AboutMeEditorProps {
  setResumeContent: (
    resumeContent: ResumeJSON | ((currentData: ResumeJSON) => ResumeJSON)
  ) => void;
  data: AboutContent;
}

function AboutMeEditor({ data, setResumeContent }: AboutMeEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);

  const handleFieldChange = (path: string, value: string) => {
    if (title === data.title) return;
    JsonUtils.update(data, path, value);
    commitUpdate();
  };

  const commitUpdate = () => {
    console.log(data);
    setResumeContent((currentData: ResumeJSON): ResumeJSON => {
      return {
        ...currentData,
        about: data
      };
    });
  };

  return (
    <div
      className={
        "bg-(--background-primary) border border-(--border-primary) rounded p-2 flex flex-col gap-2"
      }
    >
      <Collapsible
        titleComponent={
          <div className={"flex flex-row"}>
            {isEditing ? (
              <h2
                className={
                  "text-lg font-semibold text-(--foreground-primary) flex flex-row items-center gap-2"
                }
              >
                <input
                  value={title}
                  className={
                    "pl-2 pr-2 [&:not(:focus)]:bg-(--background-secondary) [&:not(:focus)]:text-(--foreground-primary) focus:outline-0 focus:border-(--border-primary) focus:border border rounded border-(--border-primary) active:bg-(--background-secondary) focus:bg-(--background-secondary) active:text-(--foreground-primary) focus:text-(--foreground-primary)"
                  }
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button
                  className={"text-(--foreground-primary) cursor-pointer"}
                  onClick={() => {
                    setIsEditing(false);
                    handleFieldChange("title", title);
                  }}
                >
                  <IconCheck size={20} />
                </button>
              </h2>
            ) : (
              <h2
                className={
                  "text-lg font-semibold flex flex-row items-center gap-2 text-(--foreground-primary)"
                }
              >
                <p>{data.title}</p>
                <button
                  onClick={() => {
                    setIsEditing(true);
                  }}
                  className={"cursor-pointer"}
                >
                  <IconEdit size={20} />
                </button>
              </h2>
            )}
          </div>
        }
      >
        <textarea
          onChange={(e) => {
            handleFieldChange("content", e.target.value);
          }}
          defaultValue={data.content}
          className={
            "w-full rounded p-3 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
          }
        />
      </Collapsible>
    </div>
  );
}

export default AboutMeEditor;
