"use client";

import PDFDocument from "@/app/components/pdf/pdf-document";
import React, { ChangeEvent, useEffect, useState } from "react";
import Panel from "@/app/components/editing-panel/panel";
import { ResumeJSON, SectionOrder } from "@/app/definitions/resume-types";
import PDFPreview from "@/app/components/pdf/pdf-preview";
import { pdf } from "@react-pdf/renderer";
import useDebounce from "@/app/hooks/use-debounce";

const initDefaultOrder = (): SectionOrder[] => [
  {
    name: "header",
    id: 1
  },
  {
    name: "about",
    id: 2
  },
  {
    name: "experiences",
    id: 3
  },
  {
    name: "projects",
    id: 4
  },
  {
    name: "education",
    id: 5
  },
  {
    name: "skills",
    id: 6
  },
  {
    name: "languages",
    id: 7
  },
  {
    name: "interests",
    id: 8
  }
];

const createEmpty = (): ResumeJSON => ({
  header: {
    fullName: "",
    specialty: "",
    email: "",
    phone: "",
    address: "",
    socials: []
  },
  about: {
    title: "ABOUT",
    content: ""
  },
  experiences: {
    title: "EXPERIENCE",
    entries: []
  },
  projects: {
    title: "PROJECTS",
    entries: []
  },
  education: {
    title: "EDUCATION",
    entries: []
  },
  skills: {
    title: "SKILLS",
    categories: []
  },
  languages: {
    title: "LANGUAGES",
    entries: []
  },
  interests: {
    title: "INTERESTS",
    entries: []
  },
  order: initDefaultOrder()
});

export default function Home() {
  const [fileName, setFileName] = useState<string>("resume");
  const [resumeContent, setResumeContent] = useState<ResumeJSON>(createEmpty());
  const [pdfFile, setPdfFile] = useState<string>();
  const debouncedResumeContent = useDebounce(resumeContent, 500);
  const [sectionsOrder, setSectionsOrder] =
    useState<SectionOrder[]>(initDefaultOrder());

  const handleDownloadJson = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(resumeContent, null, 4)], {
        type: "application/json"
      })
    );
    a.download = `${fileName}.json`;
    a.click();
  };

  const handleFileRead = (fileReader: FileReader) => {
    setResumeContent(JSON.parse(fileReader.result as string));
  };

  const handleFileChange = (e: ChangeEvent) => {
    const fileElement = e.target as HTMLInputElement;
    const file = fileElement.files![0];
    setFileName(file.name.split(".")[0]);
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      handleFileRead(fileReader);
    };
    fileReader.readAsText(file);
  };

  const handleDownloadPdf = () => {
    if (pdfFile === undefined) return;
    const a = document.createElement("a");
    a.href = pdfFile;
    a.download = `${fileName}.pdf`;
    a.click();
  };

  useEffect(() => {
    const getBlob = async () => {
      return await instance.toBlob();
    };
    const instance = pdf(
      <PDFDocument
        sectionsOrder={sectionsOrder}
        data={debouncedResumeContent}
        title={fileName}
      />
    );
    getBlob().then((value) => {
      const file = URL.createObjectURL(value);
      setPdfFile(file);
    });
  }, [debouncedResumeContent, sectionsOrder]);

  return (
    <main className="grid grid-cols-2 min-h-screen h-screen font-[family-name:var(--font-share-tech-mono)] bg-(--background-primary)">
      <section
        className={
          "bg-(--background-primary) h-full w-full flex flex-col gap-2 p-2 overflow-auto"
        }
      >
        <Panel
          editorsOrder={sectionsOrder}
          setEditorsOrder={setSectionsOrder}
          handleFileChange={handleFileChange}
          handleNew={() => setResumeContent(createEmpty())}
          fileName={fileName}
          setFileName={setFileName}
          setResumeContent={setResumeContent}
          handleDownloadJson={handleDownloadJson}
          handleDownloadPdf={handleDownloadPdf}
          resumeData={resumeContent}
        />
      </section>
      <section className="h-screen w-full bg-(--background) flex flex-col gap-2 items-center justify-center p-2 border-l border-(--border-primary)">
        <PDFPreview pdfFile={pdfFile} />
      </section>
    </main>
  );
}
