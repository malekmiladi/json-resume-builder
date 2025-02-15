"use client";

import { Link, StyleSheet, Text, View } from "@react-pdf/renderer";
import { EntryDate } from "@/app/definitions/resume-types";
import IconLink from "@/app/components/pdf/icons/icon-link";
import { JsonUtils } from "@/app/utils/json-utils";

interface ProjectHeaderProps {
    title: string;
    link: string;
    date: EntryDate;
}

type EntryDate = {
    startDate: EntryDate;
    endDate: EntryDate;
};

const styles = StyleSheet.create({
    justified: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    text: {
        fontSize: "10.5pt",
        fontWeight: "heavy"
    },
    date: {
        fontSize: "10.5pt",
        fontWeight: "normal"
    },
    textAndLink: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3
    }
});

function ProjectEntryHeader({ title, link, date }: ProjectHeaderProps) {
    return (
        <View style={styles.justified}>
            <View style={styles.textAndLink}>
                <Text style={styles.text}>{title}</Text>
                <Link href={link}>
                    <IconLink size={8} />
                </Link>
            </View>
            <Text style={styles.date}>
                {JsonUtils.parseDateAsString(date.startDate, date.endDate)}
            </Text>
        </View>
    );
}

export default ProjectEntryHeader;
