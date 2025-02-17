import React, { useState } from "react";
import Collapsible from "@/app/components/collapsible";
import ChangeableTitle from "@/app/components/changeable-title";
import { handleFieldChange } from "@/app/utils/json-utils";
import { ResumeJSON, SkillsContent } from "@/app/definitions/resume-types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface AboutMeEditorProps {
  id: number;
  setResumeContent: (
    resumeContent: ResumeJSON | ((currentData: ResumeJSON) => ResumeJSON)
  ) => void;
  data: SkillsContent;
}

function SkillsEditor({ id, data, setResumeContent }: AboutMeEditorProps) {
  const [title, setTitle] = useState(data.title);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const commitUpdate = () => {
    setResumeContent((currentData: ResumeJSON): ResumeJSON => {
      return {
        ...currentData,
        skills: data
      };
    });
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={
        "bg-(--background-primary) border border-(--border-primary) rounded p-2 flex flex-col gap-2"
      }
    >
      <Collapsible
        titleComponent={
          <ChangeableTitle
            dragProps={{
              attributes: attributes,
              listeners: listeners,
            }}
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
