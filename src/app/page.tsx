"use client";

import PDFDocument from "@/app/components/pdf/pdf-document";
import React, {ChangeEvent, useEffect, useState} from "react";
import Panel from "@/app/components/editing-panel/panel";
import {ResumeJSON} from "@/app/definitions/resume.types";
import PDFPreview from "@/app/components/pdf/pdf-preview";
import {pdf} from "@react-pdf/renderer";

export default function Home() {

    const [fileName, setFileName] = useState("resume");
    const [resumeContent, setResumeContent] = useState({} as ResumeJSON);
    const [pdfFile, setPdfFile] = useState<string>();

    const handleDownloadJson = () => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(resumeContent)], {type: "application/json"}));
        a.download = `${fileName}.json`;
        a.click();
    }

    const handleFileRead = (fileReader: FileReader) => {
        const content = fileReader.result as string;
        setResumeContent(JSON.parse(content));
    }

    const handleFileChange = (e: ChangeEvent) => {
        const fileElement = e.target as HTMLInputElement;
        const file = fileElement.files![0];
        setFileName(file.name.split(".")[0]);
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            handleFileRead(fileReader);
        }
        fileReader.readAsText(file);
    }

    const handleDownloadPdf = () => {
        if (pdfFile === undefined) return;
        const a = document.createElement("a");
        a.href = pdfFile;
        a.download = `${fileName}.pdf`;
        a.click();
    }

    useEffect(() => {
        const getBlob = async () => {
            return await instance.toBlob();
        }
        const instance = pdf(<PDFDocument data={resumeContent} title={fileName}/>);
        getBlob().then((value) => {
            const file = URL.createObjectURL(value);
            setPdfFile(file);
        });
    }, [resumeContent])

    return (
        <main className="grid grid-cols-2 min-h-screen h-screen font-[family-name:var(--font-share-tech-mono)] bg-[--background]">
            <section className={"bg-[--background] h-full w-full flex flex-col gap-2 p-2 overflow-auto"}>
                <Panel
                    handleFileChange={handleFileChange}
                    fileName={fileName}
                    setFileName={setFileName}
                    setResumeContent={setResumeContent}
                    handleDownloadJson={handleDownloadJson}
                    handleDownloadPdf={handleDownloadPdf}
                    resumeData={resumeContent}
                />
            </section>
            <section className="h-screen w-full bg-[--background] flex flex-col gap-2 items-center justify-center p-2 border-l border-[--border-primary]">
                <PDFPreview pdfFile={pdfFile}/>
            </section>
        </main>
    );
}
