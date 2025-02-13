import '@/app/polyfill/promise-withresolvers'
import React, {useEffect, useState} from 'react';
import {ResumeJSON} from "@/app/definitions/types";
import PDFDocument from "@/app/components/pdf/pdf-document";
import {Document, Page, pdfjs} from 'react-pdf';
import {usePDF, pdf} from "@react-pdf/renderer";

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import PageNavigation from "@/app/components/pdf/page-navigation";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

function PDFPreview({name, pdfFile}: { name: string, pdfFile: string | undefined }) {

    const [pages, setPages] = useState(1);
    const [page, setPage] = useState(1);
    const [scale, setScale] = useState(1);

    const onDocumentLoadSuccess = ({numPages}: { numPages: number }) => {
        setPages(numPages);
    }

    const handleNextPage = () => {
        if (page == pages) return;
        setPage(page + 1);
    }

    const handlePreviousPage = () => {
        if (page == 1) return;
        setPage(page - 1);
    }

    const updatePdfScale = (scale: number) => {
        setScale(scale);
    }

    return (
        <>
            <div
                className={"w-full h-screen flex flex-col gap-2 p-2 items-center justify-center"}
            >
                <div className={"w-full border flex flex-col rounded border-[--border-primary] overflow-hidden h-full"}>
                    <TransformWrapper onTransformed={({state}) => updatePdfScale(state.scale)}>
                        <TransformComponent wrapperStyle={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain"
                        }}>
                            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                                <Page pageNumber={page} scale={scale}/>
                            </Document>
                        </TransformComponent>
                    </TransformWrapper>
                </div>
                <PageNavigation
                    currentPage={page} numPages={pages}
                    previousPage={{disabled: page == 1, handler: handlePreviousPage}}
                    nextPage={{disabled: page == pages, handler: handleNextPage}}
                />
            </div>
        </>
    );
}

export default PDFPreview;