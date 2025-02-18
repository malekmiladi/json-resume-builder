"use client";

import PDFDocument from "@/app/components/pdf/pdf-document";
import React, { ChangeEvent, useEffect, useState } from "react";
import Panel from "@/app/components/editing-panel/panel";
import { ResumeJSON } from "@/app/definitions/resume-types";
import PDFPreview from "@/app/components/pdf/pdf-preview";
import { pdf } from "@react-pdf/renderer";
import useDebounce from "@/app/hooks/use-debounce";
import { createEmptyResume } from "@/app/utils/creators";

export default function Home() {
  const [resumeContent, setResumeContent] = useState<ResumeJSON>(createEmptyResume());
  const [pdfFile, setPdfFile] = useState<string>();
  const debouncedResumeContent = useDebounce(resumeContent, 500);

  const handleDownloadJson = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(resumeContent, null, 4)], {
        type: "application/json"
      })
    );
    a.download = `${resumeContent.metadata.name}.json`;
    a.click();
  };

  const handleFileRead = (fileReader: FileReader) => {
    setResumeContent(JSON.parse(fileReader.result as string));
  };

  const handleFileChange = (e: ChangeEvent) => {
    const fileElement = e.target as HTMLInputElement;
    const file = fileElement.files![0];
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
    a.download = `${resumeContent.metadata.name}.pdf`;
    a.click();
  };

  useEffect(() => {
    const getBlob = async () => {
      return await instance.toBlob();
    };
    const instance = pdf(
      <PDFDocument
        sectionsOrder={resumeContent.order}
        data={debouncedResumeContent}
        title={resumeContent.metadata.name}
      />
    );
    getBlob().then((value) => {
      const file = URL.createObjectURL(value);
      setPdfFile(file);
    });
  }, [debouncedResumeContent]);

  return (
    <main className="grid grid-cols-2 min-h-screen h-screen font-[family-name:var(--font-share-tech-mono)] bg-(--background-primary)">
      <section
        className={
          "bg-(--background-primary) h-full w-full flex flex-col gap-2 p-2 overflow-auto"
        }
      >
        <Panel
          handleFileChange={handleFileChange}
          handleNew={() => setResumeContent(createEmptyResume())}
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
