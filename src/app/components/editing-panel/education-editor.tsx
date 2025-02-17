"use client";

import React, { useState } from "react";
import {
  DiplomaData,
  EducationContent,
  EducationEntry,
  ResumeJSON
} from "@/app/definitions/resume-types";
import Collapsible from "@/app/components/collapsible";
import { handleFieldChange } from "@/app/utils/json-utils";
import ChangeableTitle from "@/app/components/changeable-title";
import useAccordion from "@/app/hooks/use-accordion";
import EditableEntry from "@/app/components/EditableEntry";
import IconPlus from "@/app/components/editing-panel/icons/icon-plus";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface EducationEditorProps {
  id: number;
  setResumeContent: (
    resumeContent: ResumeJSON | ((currentData: ResumeJSON) => ResumeJSON)
  ) => void;
  data: EducationContent;
}

const createDiplomaAccordionControls = (data: EducationContent) => {
  const controls = Array(data.entries.length);
  for (let i = 0; i < data.entries.length; i++) {
    controls[i] = Array(data.entries[i].diplomas.length).fill(false);
  }
  return controls;
};

const createNewEntry = (id: number): EducationEntry => {
  return {
    id: id,
    establishment: "",
    location: "",
    display: true,
    diplomas: []
  };
};

const createNewDiploma = (id: number): DiplomaData => {
  const now = new Date();
  return {
    id: id,
    type: "",
    field: "",
    startYear: now.getFullYear(),
    endYear: now.getFullYear(),
    display: true
  };
};

function EducationEditor({ id, data, setResumeContent }: EducationEditorProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const {
    accordionControls,
    updateActive,
    addAccordionControl,
    deleteAccordionControl
  } = useAccordion(data.entries.length);
  const [diplomasAccordion, setDiplomasAccordion] = useState(
    createDiplomaAccordionControls(data)
  );

  const handleEntryDelete = (i: number) => {
    data.entries.splice(i, 1);
    deleteAccordionControl(i);
    commitUpdate();
  };

  const handleEntryAdd = () => {
    data.entries.push(createNewEntry(data.entries.length + 1));
    addAccordionControl();
    setDiplomasAccordion((prevState) => {
      prevState.push([]);
      return [...prevState];
    });
    commitUpdate();
  };

  const handleDiplomaAdd = (i: number) => {
    data.entries[i].diplomas.push(createNewDiploma(data.entries[i].diplomas.length + 1));
    setDiplomasAccordion((prevState) => {
      const newArray = [...prevState];
      newArray[i] = Array(newArray[i].length + 1).fill(false);
      newArray[i][prevState[i].length] = true;
      return newArray;
    });
    commitUpdate();
  };

  const handleDiplomaDelete = (i: number, j: number) => {
    data.entries[i].diplomas.splice(j, 1);
    const currentActive = diplomasAccordion[i].indexOf(true);
    const adjustedActive =
      j < currentActive ? currentActive - 1 : currentActive;
    setDiplomasAccordion((prevState) => {
      prevState[i][j] = false;
      const newArray = [...prevState];
      newArray[i] = prevState[i].splice(j, 1);
      if (j !== currentActive && currentActive !== -1) {
        newArray[i][adjustedActive] = true;
      }
      return newArray;
    });
    commitUpdate();
  };

  const updateActiveDiploma = (i: number, j: number) => {
    setDiplomasAccordion((prevState) => {
      const newArray = [...prevState];
      newArray[i] = Array(prevState[i].length).fill(false);
      newArray[i][j] = !prevState[i][j];
      return newArray;
    });
  };

  const commitUpdate = () => {
    setResumeContent((currentData: ResumeJSON): ResumeJSON => {
      return {
        ...currentData,
        education: data
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
        <div className={"flex flex-col gap-2"}>
          {data.entries.map((education, i) => (
            <div
              key={`education-container-${i}`}
              className={"border rounded border-(--border-primary)"}
            >
              <EditableEntry
                text={
                  education.establishment.length > 0
                    ? education.establishment
                    : "New Entry"
                }
                display={education.display}
                toggleVisibility={() =>
                  handleFieldChange(
                    data,
                    `entries.${i}.display`,
                    !education.display,
                    commitUpdate
                  )
                }
                deleteEntry={() => handleEntryDelete(i)}
                toggleEdit={() => updateActive(i)}
              />
              {accordionControls[i] && (
                <div className={"flex flex-col gap-2 p-2"}>
                  <fieldset className={"flex flex-row gap-2"}>
                    <div className={"flex flex-col gap-2 w-full"}>
                      <label
                        htmlFor={`education-editor-entry-establishment-${i}`}
                        className={"text-lg text-(--foreground-primary)"}
                      >
                        School
                      </label>
                      <input
                        className={
                          "w-full rounded p-2 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
                        }
                        id={`experience-editor-entry-title-${i}`}
                        type={"text"}
                        value={education.establishment}
                        onChange={(e) =>
                          handleFieldChange(
                            data,
                            `entries.${i}.establishment`,
                            e.target.value,
                            commitUpdate
                          )
                        }
                      />
                    </div>
                    <div className={"flex flex-col gap-2 w-full"}>
                      <label
                        htmlFor={`education-editor-entry-location-${i}`}
                        className={"text-lg text-(--foreground-primary)"}
                      >
                        Location
                      </label>
                      <input
                        className={
                          "w-full rounded p-2 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
                        }
                        id={`education-editor-entry-location-${i}`}
                        type={"text"}
                        value={education.location}
                        onChange={(e) =>
                          handleFieldChange(
                            data,
                            `entries.${i}.location`,
                            e.target.value,
                            commitUpdate
                          )
                        }
                      />
                    </div>
                  </fieldset>
                  <div className={"flex flex-col gap-2"}>
                    <p className={"text-(--foreground-primary)"}>Diplomas</p>
                    {education.diplomas.map((diploma, j) => (
                      <div
                        key={`entry-${i}-diploma-${j}-container`}
                        className={"border rounded border-(--border-primary)"}
                      >
                        <EditableEntry
                          text={
                            diploma.type && diploma.field
                              ? `${diploma.type} - ${diploma.field}`
                              : "New Entry"
                          }
                          display={diploma.display}
                          toggleVisibility={() =>
                            handleFieldChange(
                              data,
                              `entries.${i}.diplomas.${j}.display`,
                              !diploma.display,
                              commitUpdate
                            )
                          }
                          deleteEntry={() => handleDiplomaDelete(i, j)}
                          toggleEdit={() => updateActiveDiploma(i, j)}
                        />
                        {diplomasAccordion[i][j] && (
                          <div
                            key={`entry-${i}-diploma-${j}-data`}
                            className={"flex flex-col p-2"}
                          >
                            <fieldset
                              className={
                                "flex flex-col gap-2 w-full max-w-full"
                              }
                            >
                              <div className={"flex flex-row gap-2"}>
                                <div className={"flex flex-col gap-2 w-full"}>
                                  <label
                                    htmlFor={`entry-${i}-diploma-${j}-type`}
                                    className={
                                      "text-lg text-(--foreground-primary)"
                                    }
                                  >
                                    Type
                                  </label>
                                  <input
                                    className={
                                      "w-full rounded p-2 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
                                    }
                                    id={`entry-${i}-diploma-${j}-type`}
                                    type={"text"}
                                    value={diploma.type}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        data,
                                        `entries.${i}.diplomas.${j}.type`,
                                        e.target.value,
                                        commitUpdate
                                      )
                                    }
                                  />
                                </div>
                                <div className={"flex flex-col gap-2 w-full"}>
                                  <label
                                    htmlFor={`entry-${i}-diploma-${j}-field`}
                                    className={
                                      "text-lg text-(--foreground-primary)"
                                    }
                                  >
                                    Field
                                  </label>
                                  <input
                                    className={
                                      "w-full rounded p-2 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
                                    }
                                    id={`entry-${i}-diploma-${j}-field`}
                                    type={"text"}
                                    value={diploma.field}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        data,
                                        `entries.${i}.diplomas.${j}.field`,
                                        e.target.value,
                                        commitUpdate
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className={"flex flex-row gap-2"}>
                                <div className={"flex flex-col w-full"}>
                                  <label
                                    htmlFor={`entry-${i}-diploma-${j}-start-year`}
                                    className={
                                      "text-lg text-(--foreground-primary)"
                                    }
                                  >
                                    Start Year
                                  </label>
                                  <input
                                    className={
                                      "w-full rounded p-2 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
                                    }
                                    id={`entry-${i}-diploma-${j}-start-year`}
                                    type={"number"}
                                    value={diploma.startYear}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        data,
                                        `entries.${i}.diplomas.${j}.startYear`,
                                        e.target.value,
                                        commitUpdate
                                      )
                                    }
                                  />
                                </div>
                                <div className={"flex flex-col w-full"}>
                                  <label
                                    htmlFor={`entry-${i}-diploma-${j}-end-year`}
                                    className={
                                      "text-lg text-(--foreground-primary)"
                                    }
                                  >
                                    End Year
                                  </label>
                                  <input
                                    className={
                                      "w-full rounded p-2 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
                                    }
                                    id={`entry-${i}-diploma-${j}-end-year`}
                                    type={"number"}
                                    value={diploma.endYear}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        data,
                                        `entries.${i}.diplomas.${j}.endYear`,
                                        e.target.value,
                                        commitUpdate
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </fieldset>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    className={
                      "w-full text-(--foreground-primary) border rounded border-(--border-primary) p-2 flex justify-center cursor-pointer"
                    }
                    onClick={() => handleDiplomaAdd(i)}
                  >
                    <IconPlus size={20} />
                  </button>
                </div>
              )}
            </div>
          ))}
          <hr className={"text-(--border-primary)"} />
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

export default EducationEditor;
