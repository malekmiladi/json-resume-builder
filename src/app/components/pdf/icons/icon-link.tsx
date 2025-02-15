"use client";

import { Path, Svg } from "@react-pdf/renderer";

function IconLink({ size }: { size: number }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 36 36" fill="rgb(0, 0, 0)">
            <Path
                d={
                    "M27 33H5a2 2 0 01-2-2V9a2 2 0 012-2h10v2H5v22h22V21h2v10a2 2 0 01-2 2z"
                }
            />
            <Path
                d={
                    "M18 3a1 1 0 000 2h11.59L15.74 18.85a1 1 0 101.41 1.41L31 6.41V18a1 1 0 002 0V3z"
                }
            />
        </Svg>
    );
}

export default IconLink;
