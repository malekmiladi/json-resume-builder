export type DateParts = {
  year?: number;
  month?: number;
  day?: number;
};

export type DateControls = {
  display: boolean;
  present?: boolean;
  yearOnly: boolean;
};

export type EntryDate = {
  date: DateParts;
  controls: DateControls;
};

export type CompanyData = {
  name: string;
  link: string;
  location: string;
};

export type ExperienceSkills = {
  title: string;
  entries: string[];
};

export type ExperienceEntry = {
  id: number;
  display: boolean;
  position: string;
  company: CompanyData;
  startDate: EntryDate;
  endDate: EntryDate;
  headline: string;
  responsibilities: string[];
  skills: ExperienceSkills;
};

export type ExperiencesContent = {
  title: string;
  entries: ExperienceEntry[];
};

export type CategoryData = {
  id: number;
  display: boolean;
  name: string;
  entries: string[];
};

export type SkillsContent = {
  title: string;
  categories: CategoryData[];
};

export type LanguageEntry = {
  id: number;
  name: string;
  level: string;
};

export type LanguagesContent = {
  title: string;
  entries: LanguageEntry[];
};

export type ProjectEntry = {
  id: number;
  display: boolean;
  title: string;
  link: string;
  introduction: string;
  description: string[];
  startDate: EntryDate;
  endDate: EntryDate;
  skills: { title: string; entries: string[] };
};

export type ProjectsContent = {
  title: string;
  entries: ProjectEntry[];
};

export type InterestsContent = {
  title: string;
  entries: string[];
};

export type DiplomaData = {
  id: number;
  type: string;
  field: string;
  startYear: number;
  endYear: number;
};

export type EducationEntry = {
  id: number;
  establishment: string;
  location: string;
  diplomas: DiplomaData[];
};

export type EducationContent = {
  title: string;
  entries: EducationEntry[];
};

export type AboutContent = {
  title: string;
  content: string;
};

export type SocialEntry = {
  id: number;
  display: boolean;
  type: string;
  name: string;
  link: string;
  text: string;
};

export type HeaderContent = {
  fullName: string;
  specialty: string;
  email: string;
  phone: string;
  address: string;
  socials: SocialEntry[];
};

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

export type ResumeFieldType =
  | HeaderContent
  | SocialEntry
  | AboutContent
  | SkillsContent
  | CategoryData
  | InterestsContent
  | ExperiencesContent
  | ExperienceEntry
  | CompanyData
  | EntryDate
  | ExperienceSkills
  | DateParts
  | DateControls
  | ProjectsContent
  | ProjectEntry
  | LanguagesContent
  | LanguageEntry
  | EducationContent
  | DiplomaData
  | string
  | number
  | boolean
  | string[];
