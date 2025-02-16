import React, { useState } from "react";
import { EducationContent, ResumeJSON } from "@/app/definitions/resume-types";
import Collapsible from "@/app/components/collapsible";
import { handleFieldChange } from "@/app/utils/json-utils";
import ChangeableTitle from "@/app/components/editing-panel/changeable-title";

interface EducationEditorProps {
  setResumeContent: (
    resumeContent: ResumeJSON | ((currentData: ResumeJSON) => ResumeJSON)
  ) => void;
  data: EducationContent;
}

function EducationEditor({ data, setResumeContent }: EducationEditorProps) {
  const [title, setTitle] = useState(data.title);

  const commitUpdate = () => {
    setResumeContent((currentData: ResumeJSON): ResumeJSON => {
      return {
        ...currentData,
        education: data
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
      ></Collapsible>
    </div>
  );
}

export default EducationEditor;
