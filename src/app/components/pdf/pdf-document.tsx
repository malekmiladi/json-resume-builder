import { ResumeJSON, SectionOrder } from "@/app/definitions/resume-types";
import { Document, Font, Page, StyleSheet } from "@react-pdf/renderer";

import HeaderElement from "@/app/components/pdf/sections/header/header";
import Experience from "@/app/components/pdf/sections/experience/experience";
import About from "@/app/components/pdf/sections/about/about";
import Projects from "@/app/components/pdf/sections/projects/projects";
import Education from "@/app/components/pdf/sections/education/education";
import Skills from "@/app/components/pdf/sections/skills/skills";
import Languages from "@/app/components/pdf/sections/languages/languages";
import Interests from "@/app/components/pdf/sections/interests/interests";

Font.register({
  family: "Alegreya",
  fonts: [
    {
      src: "fonts/alegreya/static/alegreya-regular.ttf",
      fontStyle: "normal"
    },
    {
      src: "fonts/alegreya/static/alegreya-italic.ttf",
      fontStyle: "italic"
    },
    {
      src: "fonts/alegreya/static/alegreya-bold.ttf",
      fontWeight: 700
    },
    {
      src: "fonts/alegreya/static/alegreya-bold-italic.ttf",
      fontStyle: "italic",
      fontWeight: 700
    }
  ]
});

const styles = StyleSheet.create({
  body: {
    fontFamily: "Alegreya",
    paddingTop: "12mm",
    paddingBottom: "12mm",
    paddingLeft: "12mm",
    paddingRight: "12mm",
    paddingHorizontal: "12mm"
  }
});

function PDFDocument({
  data,
  title,
  sectionsOrder
}: {
  data: ResumeJSON;
  title?: string;
  sectionsOrder: SectionOrder[];
}) {
  const buildComponent = (sectionOrder: SectionOrder) => {
    switch (sectionOrder.name) {
      case "header":
        return (
          <HeaderElement key={sectionOrder.id} headerContent={data.header} />
        );
      case "about":
        return <About key={sectionOrder.id} content={data.about} />;
      case "experiences":
        return (
          <Experience key={sectionOrder.id} experiences={data.experiences} />
        );
      case "projects":
        return <Projects key={sectionOrder.id} projects={data.projects} />;
      case "education":
        return <Education key={sectionOrder.id} education={data.education} />;
      case "skills":
        return <Skills key={sectionOrder.id} skills={data.skills} />;
      case "languages":
        return <Languages key={sectionOrder.id} languages={data.languages} />;
      case "interests":
        return <Interests key={sectionOrder.id} interests={data.interests} />;
      default:
        return null;
    }
  };

  return (
    <Document
      creationDate={new Date()}
      title={title}
      producer={"Resume JSON-ified"}
    >
      <Page size={"A4"} style={styles.body}>
        {sectionsOrder.map((sectionOrder) => buildComponent(sectionOrder))}
      </Page>
    </Document>
  );
}

export default PDFDocument;
