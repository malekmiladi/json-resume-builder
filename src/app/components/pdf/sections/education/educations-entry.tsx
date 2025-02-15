"use client";

import { StyleSheet, Text, View } from "@react-pdf/renderer";
import TextAndDate from "@/app/components/pdf/text-and-date";
import { DiplomaData, EducationEntry } from "@/app/definitions/resume-types";

const styles = StyleSheet.create({
    container: {
        flexDirection: "column"
    },
    establishment: {
        fontStyle: "italic",
        fontSize: "10.5pt"
    }
});

function EducationsEntry({ entry }: { entry: EducationEntry }) {
    const dateToString = (startYear: number, endYear: number) => {
        return `${startYear} – ${endYear}`;
    };
    const dataToDiploma = (type: string, field: string) => {
        return `${type} – ${field}`;
    };
    return entry.diplomas.map((diploma: DiplomaData, i) => (
        <View key={`diploma-entry-${i}`} style={styles.container}>
            <TextAndDate
                date={dateToString(diploma.startYear, diploma.endYear)}
                text={dataToDiploma(diploma.type, diploma.field)}
            />
            <Text style={styles.establishment}>{entry.establishment}</Text>
        </View>
    ));
}

export default EducationsEntry;
