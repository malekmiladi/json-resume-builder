import {StyleSheet, View} from "@react-pdf/renderer";
import SectionTitle from "@/app/components/pdf/section-title";
import {EducationContent, EducationEntry} from "@/app/definitions/types";
import EducationsEntry from "@/app/components/pdf/sections/education/educations-entry";

const styles = StyleSheet.create({
    body: {
        paddingBottom: "5.8pt"
    }
})

function Education({education}: {education: EducationContent}) {
    return (
        <View style={styles.body}>
            <SectionTitle title={education.title}/>
            {education.entries.map((entry: EducationEntry, i) => (
                <EducationsEntry key={`education-entry-${i}`} entry={entry}/>
            ))}
        </View>
    )
}

export default Education;