"use client";

import { View } from "@react-pdf/renderer";
import ProjectEntryHeader from "@/app/components/pdf/sections/projects/project-entry-header";
import { ProjectEntry } from "@/app/definitions/resume-types";
import JobEntryBody from "@/app/components/pdf/sections/experience/job-entry-body";
import JobEntryFooter from "@/app/components/pdf/sections/experience/job-entry-footer";

function ProjectsEntry({ entry }: { entry: ProjectEntry }) {
  return (
    <View style={{ marginBottom: 5 }}>
      <ProjectEntryHeader
        title={entry.title}
        link={entry.link}
        date={{
          startDate: entry.startDate,
          endDate: entry.endDate
        }}
      />
      <JobEntryBody
        introduction={entry.introduction}
        responsibilities={entry.description}
      />
      <JobEntryFooter experienceSkills={entry.skills} />
    </View>
  );
}

export default ProjectsEntry;
