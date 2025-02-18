"use client";

import { ChangeEvent } from "react";
import ChangeableTitle from "@/app/components/changeable-title";
import { ResumeJSON, SectionOrder } from "@/app/definitions/resume-types";
import AboutMeEditor from "@/app/components/editing-panel/about-me-editor";
import ExperienceEditor from "@/app/components/editing-panel/experience-editor";
import HeaderEditor from "@/app/components/editing-panel/header-editor";
import ProjectsEditor from "@/app/components/editing-panel/projects-editor";
import EducationEditor from "@/app/components/editing-panel/education-editor";
import SkillsEditor from "@/app/components/editing-panel/skills-editor";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import LanguagesEditor from "@/app/components/editing-panel/languages-editor";
import InterestsEditor from "@/app/components/editing-panel/interests-editor";
import IconJson from "@/app/components/editing-panel/icons/icon-json";
import IconUpload from "@/app/components/editing-panel/icons/icon-upload";
import IconPdf from "@/app/components/editing-panel/icons/icon-pdf";
import IconPlus from "@/app/components/editing-panel/icons/icon-plus";

interface PanelProps {
  editorsOrder: SectionOrder[];
  setEditorsOrder: (
    newEditorsOrder:
      | SectionOrder[]
      | ((currentData: SectionOrder[]) => SectionOrder[])
  ) => void;
  fileName: string;
  resumeData: ResumeJSON;
  setFileName: (fileName: string) => void;
  handleFileChange: (e: ChangeEvent) => void;
  setResumeContent: (
    resumeContent: ResumeJSON | ((currentData: ResumeJSON) => ResumeJSON)
  ) => void;
  handleDownloadJson: () => void;
  handleDownloadPdf: () => void;
  handleNew: () => void;
}

function Panel({
  editorsOrder,
  setEditorsOrder,
  resumeData,
  fileName,
  setFileName,
  handleFileChange,
  setResumeContent,
  handleDownloadJson,
  handleDownloadPdf,
  handleNew
}: PanelProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const buildComponent = (sectionOrder: SectionOrder) => {
    switch (sectionOrder.name) {
      case "header":
        return (
          <HeaderEditor
            key={sectionOrder.id}
            setResumeContent={setResumeContent}
            data={resumeData.header}
          />
        );
      case "about":
        return (
          <AboutMeEditor
            key={resumeData.about.title}
            id={sectionOrder.id}
            setResumeContent={setResumeContent}
            data={resumeData.about}
          />
        );
      case "experiences":
        return (
          <ExperienceEditor
            key={resumeData.experiences.title}
            id={sectionOrder.id}
            setResumeContent={setResumeContent}
            data={resumeData.experiences}
          />
        );
      case "projects":
        return (
          <ProjectsEditor
            key={resumeData.projects.title}
            id={sectionOrder.id}
            setResumeContent={setResumeContent}
            data={resumeData.projects}
          />
        );
      case "education":
        return (
          <EducationEditor
            key={resumeData.education.title}
            id={sectionOrder.id}
            setResumeContent={setResumeContent}
            data={resumeData.education}
          />
        );
      case "skills":
        return (
          <SkillsEditor
            key={resumeData.skills.title}
            id={sectionOrder.id}
            setResumeContent={setResumeContent}
            data={resumeData.skills}
          />
        );
      case "languages":
        return (
          <LanguagesEditor
            key={resumeData.languages.title}
            id={sectionOrder.id}
            setResumeContent={setResumeContent}
            data={resumeData.languages}
          />
        );
      case "interests":
        return (
          <InterestsEditor
            key={resumeData.interests.title}
            data={resumeData.interests}
            setResumeContent={setResumeContent}
            id={sectionOrder.id}
          />
        );
      default:
        return null;
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id === over.id) return;

    setEditorsOrder((prevOrder) => {
      const oldIndex = prevOrder.findIndex((order) => order.id === active.id);
      const newIndex = prevOrder.findIndex((order) => order.id === over!.id);
      return arrayMove(prevOrder, oldIndex, newIndex);
    });
  };

  return (
    <>
      <div
        className={
          "flex flex-col md:flex-row justify-between items-center p-2 border border-(--border-primary) bg-(--background-primary) rounded"
        }
      >
        <ChangeableTitle
          key={fileName}
          title={fileName}
          updateTitle={(newFileName) => {
            setFileName(newFileName);
          }}
        />
        <div
          className={"flex flex-col md:flex-row md:justify-end gap-2 w-full items-center"}
        >
          <button
            className={
              "h-fit border border-(--border-primary) bg-(--background-secondary) text-(--foreground-primary) rounded cursor-pointer flex flex-row gap-4 items-center"
            }
            onClick={handleNew}
          >
            <IconPlus size={25} />
          </button>
          <label
            htmlFor={"file"}
            className={
              "h-fit p-2 bg-(--background-secondary) border border-(--border-primary) text-(--foreground-primary) rounded text-center hover:cursor-pointer"
            }
          >
            <IconUpload size={26} />
            <input
              id="file"
              hidden={true}
              type="file"
              onChange={handleFileChange}
            />
          </label>
          <button
            className={
              "h-fit p-2 border border-(--border-primary) bg-(--background-secondary) text-(--foreground-primary) rounded cursor-pointer"
            }
            onClick={handleDownloadPdf}
          >
            <IconPdf size={26} />
          </button>
          <button
            className={
              "h-fit p-2 border border-(--border-primary) bg-(--background-secondary) text-(--foreground-primary) rounded cursor-pointer"
            }
            onClick={handleDownloadJson}
          >
            <IconJson size={26} />
          </button>
        </div>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={editorsOrder}
          strategy={verticalListSortingStrategy}
        >
          {editorsOrder.map((sectionOrder) => buildComponent(sectionOrder))}
        </SortableContext>
      </DndContext>
    </>
  );
}

export default Panel;
