"use client";

import React from "react";
import { HeaderContent, ResumeJSON } from "@/app/definitions/resume-types";
import IconEye from "@/app/components/editing-panel/icons/icon-eye";
import IconEyeSlash from "@/app/components/editing-panel/icons/icon-eye-slash";
import IconEdit from "@/app/components/editing-panel/icons/icon-edit";
import IconTrashBin from "@/app/components/editing-panel/icons/icon-trash-bin";
import { JsonUtils } from "@/app/utils/json-utils";
import IconPlus from "@/app/components/editing-panel/icons/icon-plus";
import Collapsible from "@/app/components/collapsible";
import useAccordion from "@/app/hooks/use-accordion";

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

  const handleFieldChange = (
    path: string,
    value: string | string[] | boolean
  ) => {
    JsonUtils.update(data, path, value);
    commitUpdate();
  };

  const handleEntryDelete = (i: number) => {
    data.socials.splice(i, 1);
    deleteAccordionControl(i);
    commitUpdate();
  };

  const handleEntryAdd = () => {
    data.socials.push(constructData());
    addAccordionControl();
    commitUpdate();
  };

  const constructData = () => ({
    id: data.socials.length + 1,
    type: "link",
    display: false,
    name: "",
    link: "",
    text: ""
  });

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
          <h2
            className={
              "text-lg font-semibold flex flex-row justify-between gap-2 text-(--foreground-primary)"
            }
          >
            <p>Header</p>
          </h2>
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
              onChange={(e) => handleFieldChange("fullName", e.target.value)}
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
              onChange={(e) => handleFieldChange("specialty", e.target.value)}
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
                  onChange={(e) => handleFieldChange("email", e.target.value)}
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
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
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
                  onChange={(e) => handleFieldChange("address", e.target.value)}
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
              <div
                key={`header-editor-social-accordion-${i}`}
                className={
                  "flex flex-col md:flex-row gap-2 justify-between text-(--foreground-primary) p-2"
                }
              >
                <p>{social.name ? `${social.name}` : "New Social"}</p>
                <div
                  className={
                    "flex flex-row justify-between text-(--foreground-primary) gap-2"
                  }
                >
                  <button
                    className={"cursor-pointer"}
                    onClick={() =>
                      handleFieldChange(`socials.${i}.display`, !social.display)
                    }
                  >
                    {social.display ? (
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
                              `socials.${i}.name`,
                              e.target.value
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
                              `socials.${i}.link`,
                              e.target.value
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
                              `socials.${i}.text`,
                              e.target.value
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
