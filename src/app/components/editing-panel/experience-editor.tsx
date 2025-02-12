'use client';

import React, {useState} from 'react';
import IconCheck from "@/app/components/editing-panel/icons/icon-check";
import IconEdit from "@/app/components/editing-panel/icons/icon-edit";
import {ExperiencesContent, ResumeJSON} from "@/app/definitions/types";

interface ExperienceEditorProps {
    setResumeContent: (resumeContent: ResumeJSON | ((currentData: ResumeJSON) => ResumeJSON)) => void;
    data: ExperiencesContent;
}

enum ExperienceField {
    POSITION,
    EMPLOYER,
    EMPLOYER_LINK,
    INTRODUCTION,
    DESCRIPTION,
    SKILLS_TITLE,
    SKILLS_ENTRIES,
    START_DATE,
    END_DATE,
}

function ExperienceEditor({data, setResumeContent}: ExperienceEditorProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(data.title);
    const [accordionControls, setAccordionControls] = useState(Array(data.entries.length).fill(false));
    console.log(data);
    const handleTitleChange = () => {
        setIsEditing(false);
        if (title !== data.title) {
            setResumeContent((currentData: ResumeJSON): ResumeJSON => {
                return {
                    ...currentData,
                    experiences: {
                        title: title,
                        entries: data.entries,
                    }
                }
            })
        }
    }

    const handleAccordionChange = (i: number) => {
        setAccordionControls((prevState) => {
            const newArray = Array(prevState.length).fill(false);
            newArray[i] = !prevState[i];
            return newArray;
        })
    }

    const handleEntryPositionChange = (i: number, position: string): ExperiencesContent => {
        data.entries[i].position = position;
        return data;
    }

    const handleEmployerNameChange = (i: number, name: string) => {
        data.entries[i].company.name = name;
        return data;
    }

    const handleLinkChange = (i: number, link: string) => {
        data.entries[i].company.link = link;
        return data;
    }

    const handleIntroductionChange = (i: number, introduction: string) => {
        data.entries[i].introduction = introduction;
        return data;
    }

    const handleDescriptionChange = (i: number, description: string) => {
        data.entries[i].responsibilities = description.split('\n\n');
        return data;
    }

    const handleSkillsTitleChange = (i: number, title: string) => {
        data.entries[i].skills.title = title;
        return data;
    }

    const handleSkillsEntriesChange = (i: number, entries: string) => {
        data.entries[i].skills.entries = entries.split('\n');
        return data;
    }

    const commitUpdate = (update: ExperiencesContent) => {
        setResumeContent((currentData): ResumeJSON => {
            return {
                ...currentData,
                experiences: update
            }
        });
    }

    const handleFieldChange = (i: number, field: ExperienceField, value: string) => {
        let update: ExperiencesContent = {
            title: data.title,
            entries: data.entries,
        };
        switch (field) {
            case ExperienceField.POSITION: {
                update = handleEntryPositionChange(i, value);
                break;
            }
            case ExperienceField.EMPLOYER: {
                update = handleEmployerNameChange(i, value);
                break;
            }
            case ExperienceField.EMPLOYER_LINK: {
                update = handleLinkChange(i, value);
                break;
            }
            case ExperienceField.INTRODUCTION: {
                update = handleIntroductionChange(i, value);
                break;
            }
            case ExperienceField.DESCRIPTION: {
                update = handleDescriptionChange(i, value);
                break;
            }
            case ExperienceField.SKILLS_TITLE: {
                update = handleSkillsTitleChange(i, value);
                break;
            }
            case ExperienceField.SKILLS_ENTRIES: {
                update = handleSkillsEntriesChange(i, value);
                break;
            }
            default: {
                return;
            }
        }
        commitUpdate(update);
    }

    return (
        <div className={"bg-[--background] border border-[--border-primary] rounded p-2 m-3 flex flex-col gap-2"}>
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
                                className={"text-[--foreground] border-2 border-[--border-primary] rounded"}
                                onClick={handleTitleChange}
                            >
                                <IconCheck size={20}/>
                            </button>
                        </h2>
                        :
                        <h2
                            onClick={() => {
                                setIsEditing(true);
                            }}
                            className={"text-lg font-semibold flex flex-row items-center gap-2 text-[--foreground]"}>
                            <p>
                                {data.title}
                            </p>
                            <IconEdit size={20}/>
                        </h2>
                }
            </>
            <div className={"flex flex-col gap-4"}>
                {
                    data.entries.map((experience, i) => (
                        <div key={`experience-container-${i}`}>
                            <hr key={`experience-break-${i}`} className="h-px bg-[--border-primary] border-0"/>
                            <div
                                key={`experience-editor-entry-accordion-${i}`}
                                className={"flex flex-row justify-between text-[--foreground] p-2"}
                            >
                                <p>{experience.position} - {experience.company.name}</p>
                                <button
                                    onClick={() => handleAccordionChange(i)}
                                >
                                    <IconEdit size={20}/>
                                </button>
                            </div>
                            {accordionControls[i] &&
                                <div key={`experience-editor-entry-${i}`}
                                     className={"flex flex-col p-2 border border-[--border-primary]"}>
                                    <fieldset className={"flex flex-col gap-2"}>
                                        <label htmlFor={`experience-editor-entry-title-${i}`}
                                               className={"text-lg text-[--foreground]"}>
                                            Job Title
                                        </label>
                                        <input
                                            className={"w-full rounded p-3 bg-[--bg-secondary] text-[--foreground]"}
                                            id={`experience-editor-entry-title-${i}`} type={"text"}
                                            value={experience.position}
                                            onChange={(e) => handleFieldChange(i, ExperienceField.POSITION, e.target.value)}
                                        />
                                        <div className={"grid grid-cols-2 gap-2"}>
                                            <div>
                                                <label htmlFor={`experience-editor-entry-employer-${i}`}
                                                       className={"text-lg text-[--foreground]"}
                                                >
                                                    Employer
                                                </label>
                                                <input
                                                    className={"w-full rounded p-3 bg-[--bg-secondary] text-[--foreground]"}
                                                    id={`experience-editor-entry-employer-${i}`} type={"text"}
                                                    value={experience.company.name}
                                                    onChange={(e) => handleFieldChange(i, ExperienceField.EMPLOYER, e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor={`experience-editor-entry-employer-link-${i}`} className={"text-lg text-[--foreground]"}>
                                                    Link
                                                </label>
                                                <input
                                                    className={"w-full rounded p-3 bg-[--bg-secondary] text-[--foreground]"}
                                                    id={`experience-editor-entry-employer-link-${i}`} type={"text"}
                                                    value={experience.company.link}
                                                    onChange={(e) => handleFieldChange(i, ExperienceField.EMPLOYER_LINK, e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <label htmlFor={`experience-editor-entry-introduction-${i}`} className={"text-lg text-[--foreground]"}>
                                            Introduction
                                        </label>
                                        <textarea
                                            onChange={(e) => handleFieldChange(i, ExperienceField.INTRODUCTION, e.target.value)}
                                            defaultValue={experience.introduction}
                                            className={"w-full rounded p-3 bg-[--bg-secondary] text-[--foreground]"}
                                        />
                                        <label className={"text-lg text-[--foreground]"} htmlFor={`experience-editor-entry-body-${i}`}>
                                            Description{' '}<span className={"text-sm"}>(leave a single empty line between entries for bullets)</span>
                                        </label>
                                        <textarea rows={10}
                                            onChange={(e) => handleFieldChange(i, ExperienceField.DESCRIPTION, e.target.value)}
                                            defaultValue={experience.responsibilities.join('\n\n')}
                                            className={"w-full field-sizing-content rounded p-3 bg-[--bg-secondary] text-[--foreground]"}
                                        />
                                        <label className={"text-lg text-[--foreground]"}>
                                            Skills{' '}<span className={"text-sm"}>(new line separated)</span>
                                        </label>
                                        <div className={"flex flex-row gap-2"}>
                                            <label className={"text-lg text-[--foreground]"} htmlFor={`experience-entry-skills-title-${i}`}>Title</label>
                                            <input
                                                id={`experience-entry-skills-title-${i}`}
                                                type={"text"} value={experience.skills.title}
                                                className={"w-fit pl-2 pr-2 [&:not(:focus)]:bg-[--bg-secondary] [&:not(:focus)]:text-[--foreground] focus:outline-0 focus:border-[--background] focus:border-2 border-2 rounded border-[--border-primary] active:bg-[--bg-secondary] focus:bg-[--bg-secondary] active:text-[--foreground] focus:text-[--foreground]"}
                                                onChange={(e) => handleFieldChange(i, ExperienceField.SKILLS_TITLE, e.target.value)}
                                            />
                                        </div>
                                        <textarea rows={5}
                                                  defaultValue={experience.skills.entries.join('\n')}
                                                  className={"w-full field-sizing-content rounded p-3 bg-[--bg-secondary] text-[--foreground]"}
                                                  onChange={(e) => handleFieldChange(i, ExperienceField.SKILLS_ENTRIES, e.target.value)}
                                        />
                                    </fieldset>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default ExperienceEditor;