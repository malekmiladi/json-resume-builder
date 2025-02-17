import React, { useState } from "react";
import Collapsible from "@/app/components/collapsible";
import ChangeableTitle from "@/app/components/changeable-title";
import { handleFieldChange } from "@/app/utils/json-utils";
import { ResumeJSON, SkillsContent } from "@/app/definitions/resume-types";

interface AboutMeEditorProps {
  setResumeContent: (
    resumeContent: ResumeJSON | ((currentData: ResumeJSON) => ResumeJSON)
  ) => void;
  data: SkillsContent;
}

function SkillsEditor({ data, setResumeContent }: AboutMeEditorProps) {
  const [title, setTitle] = useState(data.title);

  const commitUpdate = () => {
    setResumeContent((currentData: ResumeJSON): ResumeJSON => {
      return {
        ...currentData,
        skills: data
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

      </Collapsible>
    </div>
  );
}

export default SkillsEditor;
