"use client";

import React, { useState } from "react";
import IconCheck from "@/app/components/editing-panel/icons/icon-check";
import IconEdit from "@/app/components/editing-panel/icons/icon-edit";
import {
  ExperienceEntry,
  ExperiencesContent,
  ResumeJSON
} from "@/app/definitions/resume-types";
import IconTrashBin from "@/app/components/editing-panel/icons/icon-trash-bin";
import IconPlus from "@/app/components/editing-panel/icons/icon-plus";
import IconEye from "@/app/components/editing-panel/icons/icon-eye";
import IconEyeSlash from "@/app/components/editing-panel/icons/icon-eye-slash";
import { JsonUtils } from "@/app/utils/json-utils";
import Collapsible from "@/app/components/collapsible";

interface ExperienceEditorProps {
  setResumeContent: (
    resumeContent: ResumeJSON | ((currentData: ResumeJSON) => ResumeJSON)
  ) => void;
  data: ExperiencesContent;
}

function ExperienceEditor({ data, setResumeContent }: ExperienceEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [accordionControls, setAccordionControls] = useState(
    Array(data.entries.length).fill(false)
  );

  const handleTitleChange = () => {
    setIsEditing(false);
    if (title !== data.title) {
      JsonUtils.update(data, "title", title);
      commitUpdate();
    }
  };

  const handleAccordionChange = (i: number) => {
    setAccordionControls((prevState) => {
      const newArray = Array(prevState.length).fill(false);
      newArray[i] = !prevState[i];
      return newArray;
    });
  };

  const handleFieldChange = (
    path: string,
    value: string | string[] | boolean | Date
  ) => {
    if (value instanceof Date) {
      const year = value.getFullYear();
      const month = value.getMonth() + 1;
      const day = value.getDate();
      JsonUtils.update(data, path, {
        year: year,
        month: month,
        day: day
      });
    } else {
      JsonUtils.update(data, path, value);
    }
    commitUpdate();
  };

  const createNewEntry = () => {
    const now = new Date();
    return {
      id: data.entries.length + 1,
      display: true,
      position: "",
      company: {
        name: "",
        link: "",
        location: ""
      },
      startDate: {
        date: {
          month: now.getMonth() + 1,
          year: now.getFullYear(),
          day: now.getDate()
        },
        controls: {
          display: false,
          present: false,
          yearOnly: false
        }
      },
      endDate: {
        date: {
          month: now.getMonth() + 1,
          year: now.getFullYear(),
          day: now.getDate()
        },
        controls: {
          display: false,
          present: false,
          yearOnly: false
        }
      },
      headline: "",
      responsibilities: [],
      skills: {
        title: "",
        entries: []
      }
    } as ExperienceEntry;
  };

  const handleEntryAdd = () => {
    data.entries.push(createNewEntry());
    setAccordionControls((prevState) => {
      const newArray = Array(prevState.length + 1).fill(false);
      newArray[prevState.length] = true;
      return newArray;
    });
    commitUpdate();
  };

  const handleEntryDelete = (i: number) => {
    const currentActive = accordionControls.indexOf(true);
    const adjustedActive =
      i < currentActive ? currentActive - 1 : currentActive;
    data.entries.splice(i, 1);
    setAccordionControls((prevState) => {
      prevState[currentActive] = false;
      const newArray = prevState.splice(i, 1);
      if (i !== currentActive && currentActive !== -1) {
        newArray[adjustedActive] = true;
      }
      return newArray;
    });
    commitUpdate();
  };

  const commitUpdate = () => {
    setResumeContent((currentData): ResumeJSON => {
      return {
        ...currentData,
        experiences: data
      };
    });
  };

  const constructDate = ({
    year,
    month,
    day
  }: {
    year?: number;
    month?: number;
    day?: number;
  }) => new Date(`${year}-${month}-${day ?? 1}`).toISOString().split("T")[0];

  return (
    <div
      className={
        "bg-(--background-primary) border border-(--border-primary) rounded p-2 flex flex-col gap-2"
      }
    >
      <Collapsible
        titleComponent={
          <div className={"flex flex-row justify-between"}>
            {isEditing ? (
              <h2
                className={
                  "text-lg font-semibold text-(--foreground-primary) flex flex-row items-center gap-2"
                }
              >
                <input
                  value={title}
                  className={
                    "w-1/2 pl-2 pr-2 [&:not(:focus)]:bg-(--background-secondary) [&:not(:focus)]:text-(--foreground-primary) focus:outline-0 focus:border-(--background-primary) focus:border-2 border-2 rounded border-(--border-primary) active:bg-(--background-secondary) focus:bg-(--background-secondary) active:text-(--foreground-primary) focus:text-(--foreground-primary)"
                  }
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button
                  className={"text-(--foreground-primary) cursor-pointer"}
                  onClick={handleTitleChange}
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
                  className={"text-(--foreground-primary) cursor-pointer"}
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  <IconEdit size={20} />
                </button>
              </h2>
            )}
          </div>
        }
      >
        <div className={"flex flex-col gap-2"}>
          {data.entries.map((experience, i) => (
            <div
              key={`experience-container-${i}`}
              className={"border rounded border-(--border-primary)"}
            >
              <div
                key={`experience-editor-entry-accordion-${i}`}
                className={
                  "flex flex-col md:flex-row gap-2 justify-between text-(--foreground-primary) p-2"
                }
              >
                <p>
                  {experience.position && experience.company.name
                    ? `${experience.position} - ${experience.company.name}`
                    : "New Entry"}
                </p>
                <div
                  className={
                    "flex flex-row justify-between text-(--foreground-primary) gap-2"
                  }
                >
                  <button
                    className={"cursor-pointer"}
                    onClick={() =>
                      handleFieldChange(
                        `entries.${i}.display`,
                        !experience.display
                      )
                    }
                  >
                    {experience.display ? (
                      <IconEye size={20} />
                    ) : (
                      <IconEyeSlash size={20} />
                    )}
                  </button>
                  <button
                    className={"cursor-pointer"}
                    onClick={() => handleAccordionChange(i)}
                  >
                    <IconEdit size={20} />
                  </button>
                  <button
                    className={"cursor-pointer"}
                    onClick={() => handleEntryDelete(i)}
                  >
                    <IconTrashBin size={20} />
                  </button>
                </div>
              </div>
              {accordionControls[i] && (
                <div
                  key={`experience-editor-entry-${i}`}
                  className={"flex flex-col p-2"}
                >
                  <fieldset className={"flex flex-col gap-2 w-full max-w-full"}>
                    <label
                      htmlFor={`experience-editor-entry-title-${i}`}
                      className={"text-lg text-(--foreground-primary)"}
                    >
                      Job Title
                    </label>
                    <input
                      className={
                        "w-full rounded p-2 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
                      }
                      id={`experience-editor-entry-title-${i}`}
                      type={"text"}
                      value={experience.position}
                      onChange={(e) =>
                        handleFieldChange(
                          `entries.${i}.position`,
                          e.target.value
                        )
                      }
                    />
                    <div className={"grid md:grid-cols-2 gap-2"}>
                      <div>
                        <label
                          htmlFor={`experience-editor-entry-employer-${i}`}
                          className={"text-lg text-(--foreground-primary)"}
                        >
                          Employer
                        </label>
                        <input
                          className={
                            "w-full rounded p-2 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
                          }
                          id={`experience-editor-entry-employer-${i}`}
                          type={"text"}
                          value={experience.company.name}
                          onChange={(e) =>
                            handleFieldChange(
                              `entries.${i}.company.name`,
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`experience-editor-entry-employer-link-${i}`}
                          className={"text-lg text-(--foreground-primary)"}
                        >
                          Link
                        </label>
                        <input
                          className={
                            "w-full rounded p-2 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
                          }
                          id={`experience-editor-entry-employer-link-${i}`}
                          type={"text"}
                          value={experience.company.link}
                          onChange={(e) =>
                            handleFieldChange(
                              `entries.${i}.company.link`,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <fieldset
                      className={"flex flex-col md:flex-row gap-2 w-full"}
                    >
                      <div className={"flex flex-col gap-2 w-full"}>
                        <label
                          htmlFor={`experience-entry-start-date-${i}`}
                          className={"text-lg text-(--foreground-primary)"}
                        >
                          Start Date
                        </label>
                        <fieldset
                          className={
                            "flex flex-col gap-2 border rounded border-(--border-primary) p-2 h-full"
                          }
                        >
                          <input
                            id={`experience-entry-start-date-${i}`}
                            type="date"
                            name={"start-date"}
                            className={
                              "border border-(--border-primary) rounded p-2 bg-(--background-secondary) text-(--foreground-primary)"
                            }
                            value={constructDate(experience.startDate.date)}
                            onChange={(e) => {
                              handleFieldChange(
                                `entries.${i}.startDate.date`,
                                e.target.valueAsDate as Date
                              );
                            }}
                          />
                          <div className={"flex flex-row gap-2"}>
                            <input
                              id={`experience-entry-start-date-only-year-${i}`}
                              type={"checkbox"}
                              name={"year-only"}
                              className={"border border-(--border-primary)"}
                              checked={experience.startDate.controls.yearOnly}
                              onChange={(e) => {
                                handleFieldChange(
                                  `entries.${i}.startDate.controls.yearOnly`,
                                  e.target.checked
                                );
                              }}
                            />
                            <label
                              htmlFor={`experience-entry-start-date-only-year-${i}`}
                              className={"text-lg text-(--foreground-primary)"}
                            >
                              Year Only
                            </label>
                          </div>
                          <div className={"flex flex-row gap-2"}>
                            <input
                              id={`experience-entry-start-date-disable-${i}`}
                              type={"checkbox"}
                              name={"display"}
                              className={"border border-(--border-primary)"}
                              checked={!experience.startDate.controls.display}
                              onChange={() => {
                                handleFieldChange(
                                  `entries.${i}.startDate.controls.display`,
                                  !experience.startDate.controls.display
                                );
                              }}
                            />
                            <label
                              htmlFor={`experience-entry-start-date-disable-${i}`}
                              className={"text-lg text-(--foreground-primary)"}
                            >
                              {"Don't Show"}
                            </label>
                          </div>
                        </fieldset>
                      </div>
                      <div className={"flex flex-col gap-2 w-full"}>
                        <label
                          htmlFor={`experience-entry-end-date-${i}`}
                          className={"text-lg text-(--foreground-primary)"}
                        >
                          End Date
                        </label>
                        <fieldset
                          className={
                            "flex flex-col gap-2 border rounded border-(--border-primary) p-2"
                          }
                        >
                          <input
                            id={`experience-entry-end-date-${i}`}
                            type="date"
                            name={"start-date"}
                            className={
                              "border border-(--border-primary) rounded p-2 bg-(--background-secondary) text-(--foreground-primary)"
                            }
                            value={constructDate(experience.endDate.date)}
                            onChange={(e) => {
                              handleFieldChange(
                                `entries.${i}.endDate.date`,
                                e.target.valueAsDate as Date
                              );
                            }}
                          />
                          <div className={"flex flex-row gap-2"}>
                            <input
                              id={`experience-entry-end-date-present-${i}`}
                              type={"checkbox"}
                              name={"Present"}
                              checked={experience.endDate.controls.present}
                              onChange={(e) => {
                                handleFieldChange(
                                  `entries.${i}.endDate.controls.present`,
                                  e.target.checked
                                );
                              }}
                            />
                            <label
                              htmlFor={`experience-entry-end-date-present-${i}`}
                              className={"text-lg text-(--foreground-primary)"}
                            >
                              Present
                            </label>
                          </div>
                          <div className={"flex flex-row gap-2"}>
                            <input
                              id={`experience-entry-end-date-only-year-${i}`}
                              type={"checkbox"}
                              name={"year-only"}
                              checked={experience.endDate.controls.yearOnly}
                              onChange={(e) => {
                                handleFieldChange(
                                  `entries.${i}.endDate.controls.yearOnly`,
                                  e.target.checked
                                );
                              }}
                            />
                            <label
                              htmlFor={`experience-entry-end-date-only-year-${i}`}
                              className={"text-lg text-(--foreground-primary)"}
                            >
                              Year Only
                            </label>
                          </div>
                          <div className={"flex flex-row gap-2"}>
                            <input
                              id={`experience-entry-end-date-disable-${i}`}
                              type={"checkbox"}
                              name={"Present"}
                              checked={!experience.endDate.controls.display}
                              onChange={() => {
                                handleFieldChange(
                                  `entries.${i}.endDate.controls.display`,
                                  !experience.endDate.controls.display
                                );
                              }}
                            />
                            <label
                              htmlFor={`experience-entry-end-date-disable-${i}`}
                              className={"text-lg text-(--foreground-primary)"}
                            >
                              {"Don't Show"}
                            </label>
                          </div>
                        </fieldset>
                      </div>
                    </fieldset>
                    <label
                      htmlFor={`experience-editor-entry-headline-${i}`}
                      className={"text-lg text-(--foreground-primary)"}
                    >
                      Headline
                    </label>
                    <textarea
                      onChange={(e) =>
                        handleFieldChange(
                          `entries.${i}.headline`,
                          e.target.value
                        )
                      }
                      defaultValue={experience.headline}
                      className={
                        "border border-(--border-primary) w-full rounded p-2 bg-(--background-secondary) text-(--foreground-primary)"
                      }
                    />
                    <label
                      className={"text-lg text-(--foreground-primary)"}
                      htmlFor={`experience-editor-entry-body-${i}`}
                    >
                      Description
                      <span className={"text-sm"}>
                        (leave a single empty line between entries for bullets)
                      </span>
                    </label>
                    <textarea
                      rows={10}
                      onChange={(e) =>
                        handleFieldChange(
                          `entries.${i}.responsibilities`,
                          e.target.value.split("\n\n")
                        )
                      }
                      defaultValue={experience.responsibilities.join("\n\n")}
                      className={
                        "border border-(--border-primary) w-full field-sizing-content rounded p-2 bg-(--background-secondary) text-(--foreground-primary)"
                      }
                    />
                    <label className={"text-lg text-(--foreground-primary)"}>
                      Skills
                      <span className={"text-sm"}>(new line separated)</span>
                    </label>
                    <div className={"flex flex-row gap-2"}>
                      <label
                        className={"text-lg text-(--foreground-primary)"}
                        htmlFor={`experience-entry-skills-title-${i}`}
                      >
                        Title
                      </label>
                      <input
                        id={`experience-entry-skills-title-${i}`}
                        type={"text"}
                        value={experience.skills.title}
                        className={
                          "w-fit pl-2 pr-2 [&:not(:focus)]:bg-(--background-secondary) [&:not(:focus)]:text-(--foreground-primary) focus:outline-0 focus:border-(--background-primary) focus:border-2 border-2 rounded border-(--border-primary) active:bg-(--background-secondary) focus:bg-(--background-secondary) active:text-(--foreground-primary) focus:text-(--foreground-primary)"
                        }
                        onChange={(e) => {
                          JsonUtils.update(
                            data,
                            `entries.${i}.company.name`,
                            e.target.value
                          );
                          handleFieldChange(
                            `entries.${i}.skills.title`,
                            e.target.value
                          );
                        }}
                      />
                    </div>
                    <textarea
                      rows={5}
                      defaultValue={experience.skills.entries.join("\n")}
                      className={
                        "border border-(--border-primary) w-full field-sizing-content rounded p-2 bg-(--background-secondary) text-(--foreground-primary)"
                      }
                      onChange={(e) =>
                        handleFieldChange(
                          `entries.${i}.skills.entries`,
                          e.target.value.split("\n")
                        )
                      }
                    />
                  </fieldset>
                </div>
              )}
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

export default ExperienceEditor;
