import {ResumeJSON} from "@/app/definitions/types";
import {Page, Document, StyleSheet, Font} from "@react-pdf/renderer";

import HeaderElement from "@/app/components/pdf/sections/header/header";
import Experience from "@/app/components/pdf/sections/experience/experience";
import About from "@/app/components/pdf/sections/about/about";
import Projects from "@/app/components/pdf/sections/projects/projects";
import Education from "@/app/components/pdf/sections/education/education";
import Skills from "@/app/components/pdf/sections/skills/skills";
import Languages from "@/app/components/pdf/sections/languages/languages";
import Interests from "@/app/components/pdf/sections/interests/interests";

Font.register({
    family: 'Alegreya',
    fonts: [
        {
            src: 'static/fonts/alegreya/static/alegreya-regular.ttf',
            fontStyle: 'normal',
        },
        {
            src: 'static/fonts/alegreya/static/alegreya-italic.ttf',
            fontStyle: 'italic',
        },
        {
            src: 'static/fonts/alegreya/static/alegreya-bold.ttf',
            fontWeight: 700,
        },
        {
            src: 'static/fonts/alegreya/static/alegreya-bold-italic.ttf',
            fontStyle: 'italic',
            fontWeight: 700
        },
    ]
})

const styles = StyleSheet.create({
    body: {
        fontFamily: 'Alegreya',
        paddingTop: "12mm",
        paddingBottom: "12mm",
        paddingLeft: '12mm',
        paddingRight: '12mm',
        paddingHorizontal: "12mm",
    }
});

function PDFDocument({data, title}: { data: ResumeJSON, title?: string }) {
    return (
        <Document creationDate={new Date()} title={title} producer={"Resume JSON-ified"}>
            <Page size={'A4'} style={styles.body}>
                {data.header && <HeaderElement headerContent={data.header}/>}
                {data.about && <About content={data.about}/>}
                {data.experiences && <Experience experiences={data.experiences}/>}
                {data.projects && <Projects projects={data.projects}/>}
                {data.education && <Education education={data.education}/>}
                {data.skills && <Skills skills={data.skills}/>}
                {data.languages && <Languages languages={data.languages}/>}
                {data.interests && <Interests interests={data.interests}/>}
            </Page>
        </Document>
    )
}

export default PDFDocument;