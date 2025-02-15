"use client";

import React from "react";
import IconLeftChevron from "@/app/components/editing-panel/icons/icon-left-chevron";
import IconRightChevron from "@/app/components/editing-panel/icons/icon-right-chevron";

interface NavigationProperties {
    disabled: boolean;
    handler: () => void;
}

function PageNavigation({
    currentPage,
    numPages,
    nextPage,
    previousPage
}: {
    currentPage: number;
    numPages: number;
    nextPage: NavigationProperties;
    previousPage: NavigationProperties;
}) {
    if (numPages <= 1) {
        return null;
    }
    return (
        <div
            className={
                "flex flex-row gap-2 h-fit p-1/2 items-center text-center align-middle"
            }
        >
            <button
                onClick={previousPage.handler}
                disabled={previousPage.disabled}
                className={
                    "items-center justify-center border border-[--border-primary] bg-[--bg-secondary] text-[--foreground] rounded"
                }
            >
                <IconLeftChevron size={16} />
            </button>
            <span
                className={
                    "font-normal text-center align-middle text-[--foreground]"
                }
            >
                {currentPage}/{numPages}
            </span>
            <button
                onClick={nextPage.handler}
                disabled={nextPage.disabled}
                className={`items-center justify-center border border-[--border-primary] bg-[--bg-secondary] text-[--foreground] rounded`}
            >
                <IconRightChevron size={16} />
            </button>
        </div>
    );
}

export default PageNavigation;
