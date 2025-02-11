'use client';

import {PDFViewer} from "@react-pdf/renderer";
import PDFDocument from "@/app/components/pdf/pdf-document";
import {ChangeEvent, useState} from "react";
import Panel from "@/app/components/editing-panel/panel";
import {ResumeJSON} from "@/app/definitions/types";

export default function Home() {
    const [fileName, setFileName] = useState("resume");
    const [resumeContent, setResumeContent] = useState({} as ResumeJSON);

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

    return (
        <main className="grid grid-cols-2 min-h-screen font-[family-name:var(--font-geist-sans)]">
            <section className={"bg-[--background]"}>
                <Panel
                    handleFileChange={handleFileChange}
                    fileName={fileName}
                    setFileName={setFileName}
                    setResumeContent={setResumeContent}
                    handleDownloadJson={handleDownloadJson}
                    resumeData={resumeContent}
                />
            </section>
            <section className="h-full w-full flex flex-col items-center sm:items-start">
                <PDFViewer width={"100%"} height={"100%"} showToolbar={true}>
                    <PDFDocument data={resumeContent} title={fileName}/>
                </PDFViewer>
            </section>
        </main>
    );
}
