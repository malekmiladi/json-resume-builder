"use client";

import React from "react";
import { HeaderContent, ResumeJSON } from "@/app/definitions/resume-types";
import { handleFieldChange } from "@/app/utils/json-utils";
import IconPlus from "@/app/components/editing-panel/icons/icon-plus";
import Collapsible from "@/app/components/collapsible";
import useAccordion from "@/app/hooks/use-accordion";
import EditableEntry from "@/app/components/EditableEntry";
import { createSocialEntry } from "@/app/utils/creators";

interface HeaderEditorProps {
  setResumeContent: (
    resumeContent: ResumeJSON | ((currentData: ResumeJSON) => ResumeJSON)
  ) => void;
  data: HeaderContent;
}

function HeaderEditor({ data, setResumeContent }: HeaderEditorProps) {
  const {
    accordionControls,
    updateActive,
    addAccordionControl,
    deleteAccordionControl
  } = useAccordion(data.socials.length);

  const handleAccordionChange = (i: number) => {
    updateActive(i);
  };

  const handleEntryDelete = (i: number) => {
    data.socials.splice(i, 1);
    deleteAccordionControl(i);
    commitUpdate();
  };

  const handleEntryAdd = () => {
    data.socials.push(createSocialEntry(data.socials.length + 1));
    addAccordionControl();
    commitUpdate();
  };

  const commitUpdate = () => {
    setResumeContent((currentData): ResumeJSON => {
      return {
        ...currentData,
        header: data
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
          <h1 className={"text-xl font-bold text-(--foreground-primary) p-2"}>
            Header
          </h1>
        }
      >
        <fieldset className={"flex flex-col gap-2 w-full max-w-full"}>
          <div className={"flex flex-col gap-2"}>
            <label
              htmlFor={"header-full-name"}
              className={"text-lg text-(--foreground-primary)"}
            >
              Full Name
            </label>
            <input
              type={"text"}
              name={"header-full-name"}
              id={"header-full-name"}
              value={data.fullName}
              className={
                "w-full rounded p-2 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
              }
              onChange={(e) =>
                handleFieldChange(
                  data,
                  "fullName",
                  e.target.value,
                  commitUpdate
                )
              }
            />
            <label
              htmlFor={"header-specialty"}
              className={"text-lg text-(--foreground-primary)"}
            >
              Specialty
            </label>
            <input
              type={"text"}
              name={"header-specialty"}
              id={"header-specialty"}
              value={data.specialty}
              className={
                "w-full rounded p-2 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
              }
              onChange={(e) =>
                handleFieldChange(
                  data,
                  "specialty",
                  e.target.value,
                  commitUpdate
                )
              }
            />
            <div className={"flex flex-row gap-2"}>
              <div className={"flex flex-col w-full"}>
                <label
                  htmlFor={"header-email"}
                  className={"text-lg text-(--foreground-primary)"}
                >
                  Email
                </label>
                <input
                  type={"text"}
                  name={"header-email"}
                  id={"header-email"}
                  value={data.email}
                  className={
                    "w-full rounded p-2 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
                  }
                  onChange={(e) =>
                    handleFieldChange(
                      data,
                      "email",
                      e.target.value,
                      commitUpdate
                    )
                  }
                />
              </div>
              <div className={"flex flex-col w-full"}>
                <label
                  htmlFor={"header-phone"}
                  className={"text-lg text-(--foreground-primary)"}
                >
                  Phone
                </label>
                <input
                  type={"text"}
                  name={"header-phone"}
                  id={"header-phone"}
                  value={data.phone}
                  className={
                    "w-full rounded p-2 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
                  }
                  onChange={(e) =>
                    handleFieldChange(
                      data,
                      "phone",
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
                  htmlFor={"header-location"}
                  className={"text-lg text-(--foreground-primary)"}
                >
                  Address
                </label>
                <input
                  type={"text"}
                  name={"header-location"}
                  id={"header-location"}
                  value={data.address}
                  className={
                    "w-full rounded p-2 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
                  }
                  onChange={(e) =>
                    handleFieldChange(
                      data,
                      "address",
                      e.target.value,
                      commitUpdate
                    )
                  }
                />
              </div>
              <div className={"flex flex-col w-full"}></div>
            </div>
          </div>
        </fieldset>
        <fieldset
          className={
            "flex flex-col justify-between text-(--foreground-primary) gap-2 border border-(--border-primary) p-2 rounded"
          }
        >
          <h2 className={"font-semibold"}>Links</h2>
          {data.socials.map((social, i) => (
            <div
              key={`header-editor-social-container-${i}`}
              className={"border rounded border-(--border-primary)"}
            >
              <EditableEntry
                display={social.display}
                text={social.name ? `${social.name}` : "New Social"}
                toggleVisibility={() =>
                  handleFieldChange(
                    data,
                    `socials.${i}.display`,
                    !social.display,
                    commitUpdate
                  )
                }
                deleteEntry={() => handleEntryDelete(i)}
                toggleEdit={() => handleAccordionChange(i)}
              />
              {accordionControls[i] && (
                <div
                  key={`header-editor-social-entry-${i}`}
                  className={"flex flex-col p-2"}
                >
                  <fieldset className={"flex flex-col gap-2"}>
                    <div className={"flex flex-row gap-2 w-full"}>
                      <div className={"flex flex-col gap-2 w-full"}>
                        <label
                          htmlFor={`social-${i}-name`}
                          className={"flex flex-col gap-2"}
                        >
                          Name
                        </label>
                        <input
                          value={social.name}
                          name={`social-${i}-name`}
                          type={"text"}
                          className={
                            "placeholder:text-center w-full rounded p-2 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
                          }
                          onChange={(e) =>
                            handleFieldChange(
                              data,
                              `socials.${i}.name`,
                              e.target.value,
                              commitUpdate
                            )
                          }
                        />
                      </div>
                      <div className={"flex flex-col gap-2 w-full"}>
                        <label
                          htmlFor={`social-${i}-link`}
                          className={"flex flex-col gap-2"}
                        >
                          Link
                        </label>
                        <input
                          value={social.link}
                          name={`social-${i}-link`}
                          type={"text"}
                          className={
                            "placeholder:text-center w-full rounded p-2 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
                          }
                          onChange={(e) =>
                            handleFieldChange(
                              data,
                              `socials.${i}.link`,
                              e.target.value,
                              commitUpdate
                            )
                          }
                        />
                      </div>
                      <div className={"flex flex-col gap-2 w-full"}>
                        <label
                          htmlFor={`social-${i}-text`}
                          className={"flex flex-col gap-2"}
                        >
                          Display Text
                        </label>
                        <input
                          value={social.text}
                          name={`social-${i}-text`}
                          type={"text"}
                          className={
                            "placeholder:text-center w-full rounded p-2 bg-(--background-secondary) text-(--foreground-primary) border border-(--border-primary)"
                          }
                          onChange={(e) =>
                            handleFieldChange(
                              data,
                              `socials.${i}.text`,
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
          <button
            className={
              "w-full text-(--foreground-primary) border rounded border-(--border-primary) p-2 flex justify-center cursor-pointer"
            }
            onClick={handleEntryAdd}
          >
            <IconPlus size={20} />
          </button>
        </fieldset>
      </Collapsible>
    </div>
  );
}

export default HeaderEditor;
