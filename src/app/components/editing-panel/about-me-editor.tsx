"use client";

import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { AboutContent, ResumeJSON } from "@/app/definitions/resume-types";
import { handleFieldChange } from "@/app/utils/json-utils";
import Collapsible from "@/app/components/collapsible";
import ChangeableTitle from "@/app/components/changeable-title";
import {CSS} from '@dnd-kit/utilities'

interface AboutMeEditorProps {
  id: number;
  setResumeContent: (
    resumeContent: ResumeJSON | ((currentData: ResumeJSON) => ResumeJSON)
  ) => void;
  data: AboutContent;
}

function AboutMeEditor({ id, data, setResumeContent }: AboutMeEditorProps) {
  const [title, setTitle] = useState(data.title);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const commitUpdate = () => {
    setResumeContent((currentData: ResumeJSON): ResumeJSON => {
      return {
        ...currentData,
        about: data
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
              attributes,
              listeners
            }}
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
