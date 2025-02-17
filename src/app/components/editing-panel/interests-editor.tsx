"use client";

import React from "react";
import Collapsible from "@/app/components/collapsible";
import ChangeableTitle from "@/app/components/changeable-title";
import { handleFieldChange } from "@/app/utils/json-utils";
import { useSortable } from "@dnd-kit/sortable";
import { InterestsContent, ResumeJSON } from "@/app/definitions/resume-types";
import { CSS } from "@dnd-kit/utilities";

interface AboutMeEditorProps {
  id: number;
  setResumeContent: (
    resumeContent: ResumeJSON | ((currentData: ResumeJSON) => ResumeJSON)
  ) => void;
  data: InterestsContent;
}

function InterestsEditor({ id, setResumeContent, data }: AboutMeEditorProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const commitUpdate = () => {
    setResumeContent((currentData: ResumeJSON): ResumeJSON => {
      return {
        ...currentData,
        interests: data
      };
    });
  };

  const style = {
    transform: CSS.Translate.toString(transform),
    transition
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
              attributes,
              listeners
            }}
            title={data.title}
            updateTitle={(newTitle) => {
              handleFieldChange(data, "title", newTitle, commitUpdate);
            }}
          />
        }
      >
        <p>
          <span className={"text-sm text-(--foreground-primary)"}>
            {" "}
            (new line separated)
          </span>
        </p>
        <textarea
          onChange={(e) => {
            handleFieldChange(
              data,
              "entries",
              e.target.value.split("\n"),
              commitUpdate
            );
          }}
          defaultValue={data.entries.join("\n")}
          className={
            "w-full rounded p-3 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
          }
        />
      </Collapsible>
    </div>
  );
}

export default InterestsEditor;
