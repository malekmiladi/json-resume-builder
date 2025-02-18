"use client";

import React from "react";
import Collapsible from "@/app/components/collapsible";
import ChangeableTitle from "@/app/components/changeable-title";
import { handleFieldChange } from "@/app/utils/json-utils";
import {
  CategoryData,
  ResumeJSON,
  SkillsContent
} from "@/app/definitions/resume-types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useAccordion from "@/app/hooks/use-accordion";
import EditableEntry from "@/app/components/EditableEntry";
import IconPlus from "@/app/components/editing-panel/icons/icon-plus";
import { createNewSkillsCategoryEntry } from "@/app/utils/creators";

interface AboutMeEditorProps {
  id: number;
  setResumeContent: (
    resumeContent: ResumeJSON | ((currentData: ResumeJSON) => ResumeJSON)
  ) => void;
  data: SkillsContent;
}

function SkillsEditor({ id, data, setResumeContent }: AboutMeEditorProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const {
    accordionControls,
    updateActive,
    addAccordionControl,
    deleteAccordionControl
  } = useAccordion(data.categories.length);

  const handleAccordionChange = (i: number) => {
    updateActive(i);
  };

  const handleEntryDelete = (i: number) => {
    data.categories.splice(i, 1);
    deleteAccordionControl(i);
    commitUpdate();
  };

  const handleEntryAdd = () => {
    data.categories.push(createNewSkillsCategoryEntry(data.categories.length + 1));
    addAccordionControl();
    commitUpdate();
  };

  const commitUpdate = () => {
    setResumeContent((currentData: ResumeJSON): ResumeJSON => {
      return {
        ...currentData,
        skills: data
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
              attributes: attributes,
              listeners: listeners
            }}
            title={data.title}
            updateTitle={(newTitle) => {
              handleFieldChange(data, "title", newTitle, commitUpdate);
            }}
          />
        }
      >
        <div className={"flex flex-col gap-2"}>
          {data.categories.map((category, i) => (
            <div
              key={`skills-editor-category-container-${i}`}
              className={"border rounded border-(--border-primary)"}
            >
              <EditableEntry
                display={category.display}
                text={category.name ? `${category.name}` : "New Entry"}
                toggleVisibility={() =>
                  handleFieldChange(
                    data,
                    `categories.${i}.display`,
                    !category.display,
                    commitUpdate
                  )
                }
                deleteEntry={() => handleEntryDelete(i)}
                toggleEdit={() => handleAccordionChange(i)}
              />
              <div className={"flex flex-col gap-2"}>
                {accordionControls[i] && (
                  <div
                    key={`skills-editor-category-${i}`}
                    className={"flex flex-col p-2"}
                  >
                    <fieldset className={"flex flex-col gap-2"}>
                      <div className={"flex flex-col w-full"}>
                        <label
                          htmlFor={`skills-editor-category-title-${i}`}
                          className={"text-lg text-(--foreground-primary)"}
                        >
                          Name
                        </label>
                        <input
                          className={
                            "w-full rounded p-2 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
                          }
                          id={`skills-editor-category-title-${i}`}
                          type={"text"}
                          value={category.name}
                          onChange={(e) =>
                            handleFieldChange(
                              data,
                              `categories.${i}.name`,
                              e.target.value,
                              commitUpdate
                            )
                          }
                        />
                      </div>
                      <div className={"flex flex-col w-full"}>
                        <label
                          htmlFor={`skills-editor-category-entries-${i}`}
                          className={"text-lg text-(--foreground-primary)"}
                        >
                          Entries
                          <span> (new line separated)</span>
                        </label>
                        <textarea
                          id={`skills-editor-category-entries-${i}`}
                          onChange={(e) => {
                            handleFieldChange(
                              data,
                              `categories.${i}.entries`,
                              e.target.value.split("\n"),
                              commitUpdate
                            );
                          }}
                          defaultValue={category.entries.join("\n")}
                          className={
                            "w-full rounded p-3 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
                          }
                        />
                      </div>
                    </fieldset>
                  </div>
                )}
              </div>
            </div>
          ))}
          <button
            className={
              "w-full text-(--foreground-primary) border rounded border-(--border-primary) p-2 flex justify-center cursor-pointer"
            }
            onClick={handleEntryAdd}
          >
            <IconPlus size={20} />
          </button>
        </div>
      </Collapsible>
    </div>
  );
}

export default SkillsEditor;
