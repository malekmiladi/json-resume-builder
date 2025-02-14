'use client';

import React, {useState} from 'react';
import IconCheck from "@/app/components/editing-panel/icons/icon-check";
import IconEdit from "@/app/components/editing-panel/icons/icon-edit";
import {ExperienceEntry, ExperiencesContent, ResumeJSON} from "@/app/definitions/types";
import IconTrashBin from "@/app/components/editing-panel/icons/icon-trash-bin";
import IconPlus from "@/app/components/editing-panel/icons/icon-plus";
import IconEye from "@/app/components/editing-panel/icons/icon-eye";
import IconEyeSlash from "@/app/components/editing-panel/icons/icon-eye-slash";
import {JsonUtils} from "@/app/utils/json-utils";

interface ExperienceEditorProps {
    setResumeContent: (resumeContent: ResumeJSON | ((currentData: ResumeJSON) => ResumeJSON)) => void;
    data: ExperiencesContent;
}

function ExperienceEditor({data, setResumeContent}: ExperienceEditorProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(data.title);
    const [accordionControls, setAccordionControls] = useState(Array(data.entries.length).fill(false));

    const handleTitleChange = () => {
        setIsEditing(false);
        if (title !== data.title) {
            JsonUtils.update(data as never, "title", title as never);
            commitUpdate();
        }
    }

    const handleAccordionChange = (i: number) => {
        setAccordionControls((prevState) => {
            const newArray = Array(prevState.length).fill(false);
            newArray[i] = !prevState[i];
            return newArray;
        })
    }

    const handleFieldChange = (path: string, value: string | string[] | boolean | Date) => {
        if (value instanceof Date) {
            const year = value.getFullYear();
            const month = value.getMonth() + 1;
            const day = value.getDate();
            JsonUtils.update(data as never, path, {year: year, month: month, day: day} as never);
        } else {
            JsonUtils.update(data as never, path, value as never);
        }
        commitUpdate();
    }

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
    }

    const handleEntryAdd = () => {
        data.entries.push(createNewEntry());
        setAccordionControls((prevState) => {
            const newArray = Array(prevState.length + 1).fill(false);
            newArray[prevState.length] = true;
            return newArray;
        })
        commitUpdate();
    }

    const handleEntryDelete = (i: number) => {
        const currentActive = accordionControls.indexOf(true);
        const adjustedActive = i < currentActive ? currentActive - 1 : currentActive;
        data.entries.splice(i, 1);
        setAccordionControls((prevState) => {
            prevState[currentActive] = false;
            const newArray = prevState.splice(i, 1);
            if (i !== currentActive && currentActive !== -1) {
                newArray[adjustedActive] = true;
            }
            return newArray;
        })
        commitUpdate();
    }

    const commitUpdate = () => {
        setResumeContent((currentData): ResumeJSON => {
            return {
                ...currentData,
                experiences: data
            }
        });
    }

    const constructDate = ({year, month, day}: {
        year?: number,
        month?: number,
        day?: number
    }) => ((new Date(`${year}-${month}-${day ?? 1}`)).toISOString().split('T')[0]);

    return (
        <div className={"bg-[--background] border border-[--border-primary] rounded p-2 flex flex-col gap-2"}>
            <>
                {
                    isEditing ?
                        <h2 className={"text-lg font-semibold text-[--foreground] flex flex-row items-center gap-2"}>
                            <input
                                value={title}
                                className={"w-1/2 pl-2 pr-2 [&:not(:focus)]:bg-[--bg-secondary] [&:not(:focus)]:text-[--foreground] focus:outline-0 focus:border-[--background] focus:border-2 border-2 rounded border-[--border-primary] active:bg-[--bg-secondary] focus:bg-[--bg-secondary] active:text-[--foreground] focus:text-[--foreground]"}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <button
                                className={"text-[--foreground]"}
                                onClick={handleTitleChange}
                            >
                                <IconCheck size={20}/>
                            </button>
                        </h2>
                        :
                        <h2
                            className={"text-lg font-semibold flex flex-row items-center gap-2 text-[--foreground]"}>
                            <p>
                                {data.title}
                            </p>
                            <button
                                className={"text-[--foreground]"}
                                onClick={() => {
                                    setIsEditing(true);
                                }}
                            >
                                <IconEdit size={20}/>
                            </button>
                        </h2>
                }
            </>
            <div className={"flex flex-col gap-2"}>
                {
                    data.entries.map((experience, i) => (
                        <div key={`experience-container-${i}`} className={"border rounded border-[--border-primary]"}>
                            <div
                                key={`experience-editor-entry-accordion-${i}`}
                                className={"flex flex-col md:flex-row gap-2 justify-between text-[--foreground] p-2"}
                            >
                                <p>{(experience.position && experience.company.name) ? `${experience.position} - ${experience.company.name}` : "New Entry"}</p>
                                <div className={"flex flex-row justify-between text-[--foreground] gap-2"}>
                                    <button
                                        onClick={() => handleFieldChange(`entries.${i}.display`, !experience.display)}
                                    >
                                        {
                                            experience.display ?
                                                <IconEye size={20}/> :
                                                <IconEyeSlash size={20}/>
                                        }
                                    </button>
                                    <button
                                        onClick={() => handleAccordionChange(i)}
                                    >
                                        <IconEdit size={20}/>
                                    </button>
                                    <button
                                        onClick={() => handleEntryDelete(i)}
                                    >
                                        <IconTrashBin size={20}/>
                                    </button>
                                </div>
                            </div>
                            {accordionControls[i] &&
                                <div key={`experience-editor-entry-${i}`}
                                     className={"flex flex-col p-2"}>
                                    <fieldset className={"flex flex-col gap-2 w-full max-w-full"}>
                                        <label
                                            htmlFor={`experience-editor-entry-title-${i}`}
                                            className={"text-lg text-[--foreground]"}>
                                            Job Title
                                        </label>
                                        <input
                                            className={"w-full rounded p-2 bg-[--bg-secondary] text-[--foreground]"}
                                            id={`experience-editor-entry-title-${i}`} type={"text"}
                                            value={experience.position}
                                            onChange={(e) => handleFieldChange(`entries.${i}.position`, e.target.value)}
                                        />
                                        <div className={"grid grid-rows-2 md:grid-cols-2 gap-2"}>
                                            <div>
                                                <label
                                                    htmlFor={`experience-editor-entry-employer-${i}`}
                                                    className={"text-lg text-[--foreground]"}
                                                >
                                                    Employer
                                                </label>
                                                <input
                                                    className={"w-full rounded p-2 bg-[--bg-secondary] text-[--foreground]"}
                                                    id={`experience-editor-entry-employer-${i}`} type={"text"}
                                                    value={experience.company.name}
                                                    onChange={(e) => handleFieldChange(`entries.${i}.company.name`, e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`experience-editor-entry-employer-link-${i}`}
                                                    className={"text-lg text-[--foreground]"}>
                                                    Link
                                                </label>
                                                <input
                                                    className={"w-full rounded p-2 bg-[--bg-secondary] text-[--foreground]"}
                                                    id={`experience-editor-entry-employer-link-${i}`} type={"text"}
                                                    value={experience.company.link}
                                                    onChange={(e) => handleFieldChange(`entries.${i}.company.link`, e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <fieldset className={"flex flex-col md:flex-row gap-2 w-full"}>
                                            <div className={"flex flex-col gap-2 w-full"}>
                                                <label
                                                    htmlFor={`experience-entry-start-date-${i}`}
                                                    className={"text-lg text-[--foreground]"}>
                                                    Start Date
                                                </label>
                                                <fieldset
                                                    className={"flex flex-col gap-2 border rounded border-[--border-primary] p-2 h-full"}>
                                                    <input
                                                        id={`experience-entry-start-date-${i}`}
                                                        type="date"
                                                        name={"start-date"}
                                                        className={"border border-[--border-primary] rounded p-2 bg-[--bg-secondary] text-[--foreground]"}
                                                        value={constructDate(experience.startDate.date)}
                                                        onChange={(e) => {
                                                            handleFieldChange(`entries.${i}.startDate.date`, e.target.valueAsDate as Date)
                                                        }}
                                                    />
                                                    <div className={"flex flex-row gap-2"}>
                                                        <input
                                                            id={`experience-entry-start-date-only-year-${i}`}
                                                            type={"checkbox"} name={"year-only"}
                                                            checked={experience.startDate.controls.yearOnly}
                                                            onChange={(e) => {
                                                                handleFieldChange(`entries.${i}.startDate.controls.yearOnly`, e.target.checked)
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor={`experience-entry-start-date-only-year-${i}`}
                                                            className={"text-lg text-[--foreground]"}>
                                                            Year Only
                                                        </label>
                                                    </div>
                                                    <div className={"flex flex-row gap-2"}>
                                                        <input
                                                            id={`experience-entry-start-date-disable-${i}`}
                                                            type={"checkbox"} name={"display"}
                                                            checked={!experience.startDate.controls.display}
                                                            onChange={() => {
                                                                handleFieldChange(`entries.${i}.startDate.controls.display`, !experience.startDate.controls.display)
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor={`experience-entry-start-date-disable-${i}`}
                                                            className={"text-lg text-[--foreground]"}>
                                                            {"Don't Show"}
                                                        </label>
                                                    </div>
                                                </fieldset>
                                            </div>
                                            <div className={"flex flex-col gap-2 w-full"}>
                                                <label
                                                    htmlFor={`experience-entry-end-date-${i}`}
                                                    className={"text-lg text-[--foreground]"}>
                                                    End Date
                                                </label>
                                                <fieldset
                                                    className={"flex flex-col gap-2 border rounded border-[--border-primary] p-2"}>
                                                    <input
                                                        id={`experience-entry-end-date-${i}`}
                                                        type="date"
                                                        name={"start-date"}
                                                        className={"border border-[--border-primary] rounded p-2 bg-[--bg-secondary] text-[--foreground]"}
                                                        value={constructDate(experience.endDate.date)}
                                                        onChange={(e) => {
                                                            handleFieldChange(`entries.${i}.endDate.date`, e.target.valueAsDate as Date)
                                                        }}
                                                    />
                                                    <div className={"flex flex-row gap-2"}>
                                                        <input id={`experience-entry-end-date-present-${i}`}
                                                               type={"checkbox"} name={"Present"}
                                                               checked={experience.endDate.controls.present}
                                                               onChange={(e) => {
                                                                   handleFieldChange(`entries.${i}.endDate.controls.present`, e.target.checked)
                                                               }}
                                                        />
                                                        <label
                                                            htmlFor={`experience-entry-end-date-present-${i}`}
                                                            className={"text-lg text-[--foreground]"}>
                                                            Present
                                                        </label>
                                                    </div>
                                                    <div className={"flex flex-row gap-2"}>
                                                        <input
                                                            id={`experience-entry-end-date-only-year-${i}`}
                                                            type={"checkbox"} name={"year-only"}
                                                            checked={experience.endDate.controls.yearOnly}
                                                            onChange={(e) => {
                                                                handleFieldChange(`entries.${i}.endDate.controls.yearOnly`, e.target.checked)
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor={`experience-entry-end-date-only-year-${i}`}
                                                            className={"text-lg text-[--foreground]"}>
                                                            Year Only
                                                        </label>
                                                    </div>
                                                    <div className={"flex flex-row gap-2"}>
                                                        <input
                                                            id={`experience-entry-end-date-disable-${i}`}
                                                            type={"checkbox"} name={"Present"}
                                                            checked={!experience.endDate.controls.display}
                                                            onChange={() => {
                                                                handleFieldChange(`entries.${i}.endDate.controls.display`, !experience.endDate.controls.display)
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor={`experience-entry-end-date-disable-${i}`}
                                                            className={"text-lg text-[--foreground]"}>
                                                            {"Don't Show"}
                                                        </label>
                                                    </div>
                                                </fieldset>
                                            </div>
                                        </fieldset>
                                        <label
                                            htmlFor={`experience-editor-entry-headline-${i}`}
                                            className={"text-lg text-[--foreground]"}>
                                            Headline
                                        </label>
                                        <textarea
                                            onChange={(e) => handleFieldChange(`entries.${i}.headline`, e.target.value)}
                                            defaultValue={experience.headline}
                                            className={"border border-[--border-primary] w-full rounded p-2 bg-[--bg-secondary] text-[--foreground]"}
                                        />
                                        <label
                                            className={"text-lg text-[--foreground]"}
                                            htmlFor={`experience-editor-entry-body-${i}`}>
                                            Description{' '}<span className={"text-sm"}>(leave a single empty line between entries for bullets)</span>
                                        </label>
                                        <textarea
                                            rows={10}
                                            onChange={(e) => handleFieldChange(`entries.${i}.responsibilities`, e.target.value.split('\n\n'))}
                                            defaultValue={experience.responsibilities.join('\n\n')}
                                            className={"border border-[--border-primary] w-full field-sizing-content rounded p-2 bg-[--bg-secondary] text-[--foreground]"}
                                        />
                                        <label className={"text-lg text-[--foreground]"}>
                                            Skills{' '}<span className={"text-sm"}>(new line separated)</span>
                                        </label>
                                        <div className={"flex flex-row gap-2"}>
                                            <label className={"text-lg text-[--foreground]"}
                                                   htmlFor={`experience-entry-skills-title-${i}`}>Title</label>
                                            <input
                                                id={`experience-entry-skills-title-${i}`}
                                                type={"text"} value={experience.skills.title}
                                                className={"w-fit pl-2 pr-2 [&:not(:focus)]:bg-[--bg-secondary] [&:not(:focus)]:text-[--foreground] focus:outline-0 focus:border-[--background] focus:border-2 border-2 rounded border-[--border-primary] active:bg-[--bg-secondary] focus:bg-[--bg-secondary] active:text-[--foreground] focus:text-[--foreground]"}
                                                onChange={(e) => {
                                                    JsonUtils.update(data as never, `entries.${i}.company.name`, e.target.value as never);
                                                    handleFieldChange(`entries.${i}.skills.title`, e.target.value)
                                                }}
                                            />
                                        </div>
                                        <textarea
                                            rows={5}
                                            defaultValue={experience.skills.entries.join('\n')}
                                            className={"border border-[--border-primary] w-full field-sizing-content rounded p-2 bg-[--bg-secondary] text-[--foreground]"}
                                            onChange={(e) => handleFieldChange(`entries.${i}.skills.entries`, e.target.value.split('\n'))}
                                        />
                                    </fieldset>
                                </div>
                            }
                        </div>
                    ))
                }
                <button
                    className={"w-full text-[--foreground] border rounded border-[--border-primary] p-2 flex justify-center"}
                    onClick={handleEntryAdd}
                >
                    <IconPlus size={20}/>
                </button>
            </div>
        </div>
    );
}

export default ExperienceEditor;