"use client";

import { Link, StyleSheet, Text, View } from "@react-pdf/renderer";
import { CompanyData, EntryDate } from "@/app/definitions/resume-types";
import IconLink from "@/app/components/pdf/icons/icon-link";
import TextAndDate from "@/app/components/pdf/text-and-date";
import { JsonUtils } from "@/app/utils/json-utils";

type DateType = {
  startDate: EntryDate;
  endDate: EntryDate;
};

interface TextAndDateProps {
  position: string;
  date: DateType;
  company: CompanyData;
}

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
  nameAndLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3
  },
  name: {
    fontWeight: "normal",
    fontStyle: "italic",
    fontSize: "10.5pt"
  }
});

function JobEntryHeader({ position, date, company }: TextAndDateProps) {
  return (
    <View>
      <TextAndDate
        text={position}
        date={JsonUtils.parseDateAsString(date.startDate, date.endDate)}
      />
      <View style={styles.nameAndLink}>
        <Text style={styles.name}>{company.name}</Text>
        {company.link.length > 0 && (
          <Link href={company.link}>
            <IconLink size={8} />
          </Link>
        )}
      </View>
    </View>
  );
}

export default JobEntryHeader;
