'use client';

import {Link, StyleSheet, Text, View} from "@react-pdf/renderer";
import {CompanyData, ExperienceDate} from "@/app/definitions/types";
import IconLink from "@/app/components/pdf/icons/icon-link";
import TextAndDate from "@/app/components/pdf/text-and-date";

type EntryDate = {
    startDate: ExperienceDate,
    endDate: ExperienceDate
}

interface TextAndDateProps {
    position: string,
    date: EntryDate;
    company: CompanyData;
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
    nameAndLink: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
    },
    name: {
        fontWeight: 'normal',
        fontStyle: 'italic',
        fontSize: "10.5pt",
    }
});

function JobEntryHeader({position, date, company}: TextAndDateProps) {
    const dateToString = (date: EntryDate) => {
        return `${date.startDate.month} ${date.startDate.year} – ${date.endDate.month} ${date.endDate.year}`;
    }
    return (
        <View>
            <TextAndDate text={position} date={dateToString(date)} />
            <View style={styles.nameAndLink}>
                <Text style={styles.name}>{company.name}</Text>
                <Link href={company.link}>
                    <IconLink size={8}/>
                </Link>
            </View>
        </View>
    )
}

export default JobEntryHeader;