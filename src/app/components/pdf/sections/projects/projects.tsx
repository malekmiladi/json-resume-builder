"use client";

import { ProjectsContent } from "@/app/definitions/resume-types";
import { StyleSheet, View } from "@react-pdf/renderer";
import SectionTitle from "@/app/components/pdf/section-title";
import ProjectsEntry from "@/app/components/pdf/sections/projects/projects-entry";

const styles = StyleSheet.create({
    body: {
        paddingBottom: "5.8pt"
    }
});

function Projects({ projects }: { projects: ProjectsContent }) {
    return (
        <View style={styles.body}>
            <SectionTitle title={projects.title} />
            {projects.entries.map((project, i) => (
                <ProjectsEntry key={`project-entry-${i}`} entry={project} />
            ))}
        </View>
    );
}

export default Projects;
