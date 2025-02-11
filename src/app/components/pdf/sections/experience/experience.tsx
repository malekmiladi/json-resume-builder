import {ExperiencesContent} from "@/app/definitions/types";
import {View} from "@react-pdf/renderer";
import SectionTitle from "@/app/components/pdf/section-title";
import JobEntry from "@/app/components/pdf/sections/experience/job-entry";

function Experience({experiences}: {experiences: ExperiencesContent}) {
    return (
        <View>
            <SectionTitle title={experiences.title}/>
            {experiences.entries.map((experience, i) => (
                <JobEntry key={`experience-entry-${i}`} entry={experience}/>
            ))}
        </View>
    )
}

export default Experience;