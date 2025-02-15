const schema = {
    header: {
        fullName: "string",
        title: "string",
        socials: [
            {
                id: "number",
                type: "string",
                name: "string",
                link: "string",
                text: "string"
            }
        ]
    },
    about: {
        title: "string",
        content: "string"
    },
    experience: {
        title: "string",
        entries: [
            {
                id: "number",
                display: "boolean",
                role: "string",
                company: {
                    name: "string",
                    link: "string",
                    location: "string"
                },
                startDate: {
                    date: {
                        year: "number",
                        month: "number",
                        day: "number"
                    },
                    controls: {
                        display: "boolean",
                        present: "boolean",
                        yearOnly: "boolean"
                    }
                },
                endDate: {
                    date: {
                        year: "number",
                        month: "number",
                        day: "number"
                    },
                    controls: {
                        display: "boolean",
                        present: "boolean",
                        yearOnly: "boolean"
                    }
                },
                responsibilities: ["string"],
                skills: {
                    title: "string",
                    entries: ["string"]
                }
            }
        ]
    },
    projects: {
        title: "string",
        entries: [
            {
                id: "number",
                display: "boolean",
                title: "string",
                link: "string",
                description: "string",
                startDate: {
                    date: {
                        year: "number",
                        month: "number",
                        day: "number"
                    },
                    controls: {
                        display: "boolean",
                        present: "boolean",
                        yearOnly: "boolean"
                    }
                },
                endDate: {
                    date: {
                        year: "number",
                        month: "number",
                        day: "number"
                    },
                    controls: {
                        display: "boolean",
                        present: "boolean",
                        yearOnly: "boolean"
                    }
                },
                skills: {
                    title: "string",
                    entries: ["string"]
                }
            }
        ]
    },
    education: {
        title: "string",
        entries: [
            {
                id: "number",
                school: "string",
                location: "string",
                diplomas: [
                    {
                        id: "number",
                        type: "string",
                        field: "string",
                        startYear: "number",
                        endYear: "number"
                    }
                ]
            }
        ]
    },
    skills: {
        title: "string",
        categories: [
            {
                id: "number",
                display: "boolean",
                name: "string",
                entries: ["string"]
            }
        ]
    },
    languages: {
        title: "string",
        entries: [
            {
                id: "number",
                name: "string",
                level: "string"
            }
        ]
    },
    interests: {
        title: "string",
        entries: ["string"]
    }
};

export { schema };
