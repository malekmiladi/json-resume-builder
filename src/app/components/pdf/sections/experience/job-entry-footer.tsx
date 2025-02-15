"use client";

import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { ExperienceSkills } from "@/app/definitions/resume-types";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  title: {
    fontWeight: "bold",
    fontSize: "10.5pt"
  },
  skills: {
    fontSize: "10.5pt"
  }
});

function JobEntryFooter({
  experienceSkills
}: {
  experienceSkills: ExperienceSkills;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{experienceSkills.title}: </Text>
      <Text style={styles.skills}>{experienceSkills.entries.join(", ")}</Text>
    </View>
  );
}

export default JobEntryFooter;
