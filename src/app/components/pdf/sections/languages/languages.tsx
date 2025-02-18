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
  const displayOnly = languages.entries.filter((language) => language.display);
  return (
    <View style={styles.body}>
      <SectionTitle title={languages.title} />
      <View style={styles.container}>
        {displayOnly.map(
          (language: LanguageEntry, i) =>
            language.name && (
              <View key={`language-entry-${i}`} style={styles.entry}>
                <Text style={styles.name}>{language.name} </Text>
                {language.level && (
                  <Text style={styles.level}>({language.level})</Text>
                )}
                {i < displayOnly.length - 1 && (
                  <Text style={styles.level}>, </Text>
                )}
              </View>
            )
        )}
      </View>
    </View>
  );
}

export default Languages;
