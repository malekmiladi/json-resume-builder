"use client";

import { ExperiencesContent } from "@/app/definitions/resume-types";
import { StyleSheet, View } from "@react-pdf/renderer";
import SectionTitle from "@/app/components/pdf/section-title";
import JobEntry from "@/app/components/pdf/sections/experience/job-entry";

const styles = StyleSheet.create({
  body: {
    paddingBottom: "5.8pt"
  }
});

function Experience({ experiences }: { experiences: ExperiencesContent }) {
  return (
    <View style={styles.body}>
      <SectionTitle title={experiences.title} />
      {experiences.entries
        .filter((experience) => experience.display)
        .map((experience, i) => (
          <JobEntry key={`experience-entry-${i}`} entry={experience} />
        ))}
    </View>
  );
}

export default Experience;
