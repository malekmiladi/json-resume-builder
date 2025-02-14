export type DateControl = {
    date: {
        year?: number;
        month?: number;
        day?: number;
    },
    controls: {
        display: boolean,
        present?: boolean,
        yearOnly: boolean,
    }
}

export type CompanyData = {
    name: string;
    link: string;
    location: string;
}

export type ExperienceSkills = {
    title: string;
    entries: string[];
}

export type ExperienceEntry = {
    id: number;
    display: boolean;
    position: string;
    company: CompanyData;
    startDate: DateControl;
    endDate: DateControl;
    headline: string;
    responsibilities: string[];
    skills: ExperienceSkills;
}

export type ExperiencesContent = {
    title: string;
    entries: ExperienceEntry[]
}

export type CategoryData = {
    id: number;
    display: boolean;
    name: string;
    entries: string[];
}

export type SkillsContent = {
    title: string;
    categories: CategoryData[];
}

export type LanguageEntry = {
    id: number;
    name: string;
    level: string;
}

export type LanguagesContent = {
    title: string;
    entries: LanguageEntry[];
}

export type ProjectEntry = {
    id: number;
    display: boolean;
    title: string;
    link: string;
    introduction: string;
    description: string[];
    startDate: DateControl;
    endDate: DateControl;
    skills: { title: string, entries: string[] };
}

export type ProjectsContent = {
    title: string;
    entries: ProjectEntry[];
}

export type InterestsContent = {
    title: string;
    entries: string[];
}

export type DiplomaData = {
    id: number;
    type: string;
    field: string;
    startYear: number
    endYear: number
}

export type EducationEntry = {
    id: number;
    establishment: string;
    location: string;
    diplomas: DiplomaData[];
}

export type EducationContent = {
    title: string;
    entries: EducationEntry[];
}

export type AboutContent = {
    title: string;
    content: string;
}

export type SocialEntry = {
    id: number;
    type: string;
    name?: string;
    link?: string;
    text?: string;
    countryCode?: string;
    phoneNumber?: string;
    location?: string;
    mail?: string
}

export type HeaderContent = {
    fullName: string;
    function: string;
    socials: SocialEntry[]
}

export interface ResumeJSON {
    header?: HeaderContent;
    about?: AboutContent;
    experiences?: ExperiencesContent;
    projects?: ProjectsContent;
    education?: EducationContent;
    skills?: SkillsContent;
    languages?: LanguagesContent;
    interests?: InterestsContent;
}