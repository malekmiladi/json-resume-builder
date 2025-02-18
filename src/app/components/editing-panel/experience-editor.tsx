"use client";

import React from "react";
import {
  ExperienceEntry,
  ExperiencesContent,
  ResumeJSON
} from "@/app/definitions/resume-types";
import IconPlus from "@/app/components/editing-panel/icons/icon-plus";
import { constructDate, handleFieldChange } from "@/app/utils/json-utils";
import Collapsible from "@/app/components/collapsible";
import useAccordion from "@/app/hooks/use-accordion";
import ChangeableTitle from "@/app/components/changeable-title";
import EditableEntry from "@/app/components/EditableEntry";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createNewExperienceEntry } from "@/app/utils/creators";

interface ExperienceEditorProps {
  id: number;
  setResumeContent: (
    resumeContent: ResumeJSON | ((currentData: ResumeJSON) => ResumeJSON)
  ) => void;
  data: ExperiencesContent;
}

function ExperienceEditor({
  id,
  data,
  setResumeContent
}: ExperienceEditorProps) {
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

  const handleEntryAdd = () => {
    data.entries.push(createNewExperienceEntry(data.entries.length + 1));
    addAccordionControl();
    commitUpdate();
  };

  const handleEntryDelete = (i: number) => {
    data.entries.splice(i, 1);
    deleteAccordionControl(i);
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
          {data.entries.map((experience, i) => (
            <div
              key={`experience-container-${i}`}
              className={"border rounded border-(--border-primary)"}
            >
              <EditableEntry
                display={experience.display}
                text={
                  experience.position && experience.company.name
                    ? `${experience.position} - ${experience.company.name}`
                    : "New Entry"
                }
                toggleVisibility={() =>
                  handleFieldChange(
                    data,
                    `entries.${i}.display`,
                    !experience.display,
                    commitUpdate
                  )
                }
                deleteEntry={() => handleEntryDelete(i)}
                toggleEdit={() => handleAccordionChange(i)}
              />
              {accordionControls[i] && (
                <div
                  key={`experience-editor-entry-${i}`}
                  className={"flex flex-col p-2"}
                >
                  <form className={"flex flex-col gap-2 w-full max-w-full"}>
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
                          data,
                          `entries.${i}.position`,
                          e.target.value,
                          commitUpdate
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
                              data,
                              `entries.${i}.company.name`,
                              e.target.value,
                              commitUpdate
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
                              data,
                              `entries.${i}.company.link`,
                              e.target.value,
                              commitUpdate
                            )
                          }
                        />
                      </div>
                    </div>
                    <fieldset
                      className={"flex flex-col md:flex-row gap-2 w-full"}
                    >
                      <div className={"flex flex-col gap-2 w-full"}>
                        <fieldset
                          className={
                            "flex flex-col gap-2 border rounded border-(--border-primary) p-2 h-full"
                          }
                        >
                          <label
                            htmlFor={`experience-entry-start-date-${i}`}
                            className={"text-lg text-(--foreground-primary)"}
                          >
                            Start Date
                          </label>
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
                                data,
                                `entries.${i}.startDate.date`,
                                e.target.valueAsDate as Date,
                                commitUpdate
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
                                  data,
                                  `entries.${i}.startDate.controls.yearOnly`,
                                  e.target.checked,
                                  commitUpdate
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
                                  data,
                                  `entries.${i}.startDate.controls.display`,
                                  !experience.startDate.controls.display,
                                  commitUpdate
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
                        <fieldset
                          className={
                            "flex flex-col gap-2 border rounded border-(--border-primary) p-2"
                          }
                        >
                          <label
                            htmlFor={`experience-entry-end-date-${i}`}
                            className={"text-lg text-(--foreground-primary)"}
                          >
                            End Date
                          </label>
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
                                data,
                                `entries.${i}.endDate.date`,
                                e.target.valueAsDate as Date,
                                commitUpdate
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
                                  data,
                                  `entries.${i}.endDate.controls.present`,
                                  e.target.checked,
                                  commitUpdate
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
                                  data,
                                  `entries.${i}.endDate.controls.yearOnly`,
                                  e.target.checked,
                                  commitUpdate
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
                                  data,
                                  `entries.${i}.endDate.controls.display`,
                                  !experience.endDate.controls.display,
                                  commitUpdate
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
                          data,
                          `entries.${i}.headline`,
                          e.target.value,
                          commitUpdate
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
                        {" "}
                        (leave a single empty line between entries for bullets)
                      </span>
                    </label>
                    <textarea
                      rows={10}
                      onChange={(e) =>
                        handleFieldChange(
                          data,
                          `entries.${i}.responsibilities`,
                          e.target.value.split("\n\n"),
                          commitUpdate
                        )
                      }
                      defaultValue={experience.responsibilities.join("\n\n")}
                      className={
                        "border border-(--border-primary) w-full field-sizing-content rounded p-2 bg-(--background-secondary) text-(--foreground-primary)"
                      }
                    />
                    <label className={"text-lg text-(--foreground-primary)"}>
                      Skills
                      <span className={"text-sm"}> (new line separated)</span>
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
                          handleFieldChange(
                            data,
                            `entries.${i}.skills.title`,
                            e.target.value,
                            commitUpdate
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
                          data,
                          `entries.${i}.skills.entries`,
                          e.target.value.split("\n"),
                          commitUpdate
                        )
                      }
                    />
                  </form>
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
