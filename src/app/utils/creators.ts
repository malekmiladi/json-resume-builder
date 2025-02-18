import {
  CategoryData,
  DiplomaData,
  EducationEntry, ExperienceEntry, LanguageEntry, ProjectEntry,
  ResumeJSON,
  SectionOrder
} from "@/app/definitions/resume-types";

const initDefaultOrder = (): SectionOrder[] => [
  {
    name: "header",
    id: 1
  },
  {
    name: "about",
    id: 2
  },
  {
    name: "experiences",
    id: 3
  },
  {
    name: "projects",
    id: 4
  },
  {
    name: "education",
    id: 5
  },
  {
    name: "skills",
    id: 6
  },
  {
    name: "languages",
    id: 7
  },
  {
    name: "interests",
    id: 8
  }
];

const createEmptyResume = (): ResumeJSON => ({
  header: {
    fullName: "",
    specialty: "",
    email: "",
    phone: "",
    address: "",
    socials: [createSocialEntry(1)]
  },
  about: {
    title: "ABOUT",
    content: ""
  },
  experiences: {
    title: "EXPERIENCE",
    entries: [createNewExperienceEntry(1)]
  },
  projects: {
    title: "PROJECTS",
    entries: [createNewProjectEntry(1)]
  },
  education: {
    title: "EDUCATION",
    entries: [createNewEducationEntry(1)]
  },
  skills: {
    title: "SKILLS",
    categories: [createNewSkillsCategoryEntry(1)]
  },
  languages: {
    title: "LANGUAGES",
    entries: [createNewLanguageEntry(1)]
  },
  interests: {
    title: "INTERESTS",
    entries: []
  },
  metadata: {
    name: "New Resume",
    createdAt: new Date().toISOString()
  },
  order: initDefaultOrder()
});

const createNewEducationEntry = (id: number): EducationEntry => {
  return {
    id: id,
    establishment: "",
    location: "",
    display: true,
    diplomas: [createNewEducationDiploma(1)]
  };
};

const createNewEducationDiploma = (id: number): DiplomaData => {
  const now = new Date();
  return {
    id: id,
    type: "",
    field: "",
    startYear: now.getFullYear(),
    endYear: now.getFullYear(),
    display: true
  };
};

const createNewExperienceEntry = (id: number): ExperienceEntry => {
  const now = new Date();
  return {
    id: id,
    display: true,
    position: "",
    company: {
      name: "",
      link: "",
      location: ""
    },
    startDate: {
      date: {
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        day: now.getDate()
      },
      controls: {
        display: true,
        present: false,
        yearOnly: false
      }
    },
    endDate: {
      date: {
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        day: now.getDate()
      },
      controls: {
        display: true,
        present: false,
        yearOnly: false
      }
    },
    headline: "",
    responsibilities: [],
    skills: {
      title: "",
      entries: []
    }
  };
};

const createSocialEntry = (id: number) => ({
  id: id,
  type: "link",
  display: true,
  name: "",
  link: "",
  text: ""
});

const createNewProjectEntry = (id: number): ProjectEntry => {
  const now = new Date();
  return {
    id: id,
    display: true,
    title: "",
    link: "",
    startDate: {
      date: {
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        day: now.getDate()
      },
      controls: {
        display: true,
        present: false,
        yearOnly: false
      }
    },
    endDate: {
      date: {
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        day: now.getDate()
      },
      controls: {
        display: true,
        present: false,
        yearOnly: false
      }
    },
    headline: "",
    tasks: [],
    skills: {
      title: "",
      entries: []
    }
  };
};

const createNewSkillsCategoryEntry = (id: number): CategoryData => ({
  id: id,
  display: true,
  name: "",
  entries: []
});

const createNewLanguageEntry = (id: number): LanguageEntry => ({
  id: id,
  display: true,
  name: "",
  level: ""
});

export {
  createEmptyResume,
  createNewEducationDiploma,
  createNewEducationEntry,
  createNewExperienceEntry,
  createSocialEntry,
  createNewProjectEntry,
  createNewSkillsCategoryEntry,
  createNewLanguageEntry
};
