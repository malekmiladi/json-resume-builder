'use client';

import {Link, StyleSheet, Text, View} from "@react-pdf/renderer";
import {ProjectDate} from "@/app/definitions/types";
import IconLink from "@/app/components/pdf/icons/icon-link";

interface ProjectHeaderProps {
    title: string;
    link: string;
    date: EntryDate
}

type EntryDate = {
    startDate?: ProjectDate;
    endDate?: ProjectDate;
}

const styles = StyleSheet.create({
    justified: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: "10.5pt",
        fontWeight: 'heavy',
    },
    date: {
        fontSize: "10.5pt",
        fontWeight: 'normal',
    },
    textAndLink: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
    }
});

function ProjectEntryHeader({title, link, date}: ProjectHeaderProps) {
    const dateToString = (date: EntryDate) => {
        let dateAsString = "";
        if (date.startDate) {
            dateAsString += `${date.startDate.month} ${date.startDate.year}`;
        }
        if (date.endDate) {
            dateAsString += ` - ${date.endDate.month}`;
            if (date.endDate.year) {
                dateAsString += ` ${date.endDate.year}`;
            }
        }
        return dateAsString;
    }
    return (
        <View style={styles.justified}>
            <View style={styles.textAndLink}>
                <Text style={styles.text}>{title}</Text>
                <Link href={link}>
                    <IconLink size={8}/>
                </Link>
            </View>
            <Text style={styles.date}>{dateToString(date)}</Text>
        </View>
    )
}

export default ProjectEntryHeader;