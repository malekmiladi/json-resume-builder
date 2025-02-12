'use client';

import {ExperienceEntry} from "@/app/definitions/types";
import {View} from "@react-pdf/renderer";
import JobEntryHeader from "@/app/components/pdf/sections/experience/job-entry-header";
import JobEntryBody from "@/app/components/pdf/sections/experience/job-entry-body";
import JobEntryFooter from "@/app/components/pdf/sections/experience/job-entry-footer";

function JobEntry({entry}: {entry: ExperienceEntry}) {
    console.log(entry);
    return (
        <View style={{marginBottom: 5}}>
            <JobEntryHeader
                position={entry.position}
                date={{
                    startDate: entry.startDate,
                    endDate: entry.endDate,
                }}
                company={entry.company}/>
            <JobEntryBody responsibilities={entry.responsibilities} introduction={entry.introduction}/>
            <JobEntryFooter experienceSkills={entry.skills} />
        </View>
    )
}

export default JobEntry;