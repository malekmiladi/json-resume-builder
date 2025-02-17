"use client";

import React from "react";
import {
  LanguageEntry,
  LanguagesContent,
  ResumeJSON
} from "@/app/definitions/resume-types";
import { useSortable } from "@dnd-kit/sortable";
import useAccordion from "@/app/hooks/use-accordion";
import { CSS } from "@dnd-kit/utilities";
import ChangeableTitle from "@/app/components/changeable-title";
import { handleFieldChange } from "@/app/utils/json-utils";
import Collapsible from "@/app/components/collapsible";
import EditableEntry from "@/app/components/EditableEntry";
import IconPlus from "@/app/components/editing-panel/icons/icon-plus";

interface LanguagesEditorProps {
  id: number;
  setResumeContent: (
    resumeContent: ResumeJSON | ((currentData: ResumeJSON) => ResumeJSON)
  ) => void;
  data: LanguagesContent;
}

const createNewEntry = (id: number): LanguageEntry => ({
  id: id,
  display: false,
  name: "",
  level: ""
});

function LanguagesEditor({ id, setResumeContent, data }: LanguagesEditorProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const {
    accordionControls,
    updateActive,
    addAccordionControl,
    deleteAccordionControl
  } = useAccordion(data.entries.length);

  const handleAccordionChange = (i: number) => {
    updateActive(i);
  };

  const handleEntryDelete = (i: number) => {
    data.entries.splice(i, 1);
    deleteAccordionControl(i);
    commitUpdate();
  };

  const handleEntryAdd = () => {
    data.entries.push(createNewEntry(data.entries.length + 1));
    addAccordionControl();
    commitUpdate();
  };

  const commitUpdate = () => {
    setResumeContent((currentData: ResumeJSON): ResumeJSON => {
      return {
        ...currentData,
        languages: data
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
          {data.entries.map((language, i) => (
            <div
              key={`languages-editor-entry-container-${i}`}
              className={"border rounded border-(--border-primary)"}
            >
              <EditableEntry
                display={language.display}
                text={language.name ? `${language.name}` : "New Entry"}
                toggleVisibility={() =>
                  handleFieldChange(
                    data,
                    `entries.${i}.display`,
                    !language.display,
                    commitUpdate
                  )
                }
                deleteEntry={() => handleEntryDelete(i)}
                toggleEdit={() => handleAccordionChange(i)}
              />
              <div className={"flex flex-col gap-2"}>
                {accordionControls[i] && (
                  <div
                    key={`languages-editor-entry-${i}`}
                    className={"flex flex-col p-2"}
                  >
                    <fieldset className={"flex flex-row gap-2"}>
                      <div className={"flex flex-col w-full"}>
                        <label
                          htmlFor={`languages-editor-entry-name-${i}`}
                          className={"text-lg text-(--foreground-primary)"}
                        >
                          Name
                        </label>
                        <input
                          className={
                            "w-full rounded p-2 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
                          }
                          id={`languages-editor-entry-name-${i}`}
                          type={"text"}
                          value={language.name}
                          onChange={(e) =>
                            handleFieldChange(
                              data,
                              `entries.${i}.name`,
                              e.target.value,
                              commitUpdate
                            )
                          }
                        />
                      </div>
                      <div className={"flex flex-col w-full"}>
                        <label
                          htmlFor={`languages-editor-entry-level-${i}`}
                          className={"text-lg text-(--foreground-primary)"}
                        >
                          Level
                        </label>
                        <input
                          className={
                            "w-full rounded p-2 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
                          }
                          id={`languages-editor-entry-level-${i}`}
                          type={"text"}
                          value={language.level}
                          onChange={(e) =>
                            handleFieldChange(
                              data,
                              `entries.${i}.level`,
                              e.target.value,
                              commitUpdate
                            )
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

export default LanguagesEditor;
