"use client";

import React, { useState } from "react";
import { AboutContent, ResumeJSON } from "@/app/definitions/resume-types";
import { handleFieldChange } from "@/app/utils/json-utils";
import Collapsible from "@/app/components/collapsible";
import ChangeableTitle from "@/app/components/changeable-title";

interface AboutMeEditorProps {
  setResumeContent: (
    resumeContent: ResumeJSON | ((currentData: ResumeJSON) => ResumeJSON)
  ) => void;
  data: AboutContent;
}

function AboutMeEditor({ data, setResumeContent }: AboutMeEditorProps) {
  const [title, setTitle] = useState(data.title);

  const commitUpdate = () => {
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
          <ChangeableTitle
            title={title}
            updateTitle={(newTitle) => {
              setTitle(newTitle);
              handleFieldChange(data, "title", newTitle, commitUpdate);
            }}
          />
        }
      >
        <textarea
          onChange={(e) => {
            handleFieldChange(data, "content", e.target.value, commitUpdate);
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
