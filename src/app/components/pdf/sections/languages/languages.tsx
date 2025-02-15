"use client";

import {
  LanguageEntry,
  LanguagesContent
} from "@/app/definitions/resume-types";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import SectionTitle from "@/app/components/pdf/section-title";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  entry: {
    flexDirection: "row"
  },
  name: {
    fontWeight: "bold",
    fontSize: "10.5pt"
  },
  level: {
    fontSize: "10.5pt"
  },
  body: {
    paddingBottom: "5.8pt"
  }
});

function Languages({ languages }: { languages: LanguagesContent }) {
  return (
    <View style={styles.body}>
      <SectionTitle title={languages.title} />
      <View style={styles.container}></View>
      {languages.entries.map((language: LanguageEntry, i) => (
        <View key={`language-entry-${i}`} style={styles.entry}>
          <Text style={styles.name}>{language.name} </Text>
          <Text style={styles.level}>({language.level})</Text>
        </View>
      ))}
    </View>
  );
}

export default Languages;
