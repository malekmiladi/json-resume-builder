'use client';

import IconGithub from "@/app/components/pdf/icons/icon-github";
import IconLinkedin from "@/app/components/pdf/icons/icon-linkedin";
import IconMail from "@/app/components/pdf/icons/icon-mail";
import IconPhone from "@/app/components/pdf/icons/icon-phone";
import IconLocation from "@/app/components/pdf/icons/icon-location";

function Icon({ name, size }: { name: string, size: number }) {
    switch (name) {
        case "github":
            return <IconGithub size={size} />;
        case "linkedin":
            return <IconLinkedin size={size} />;
        case "mail":
            return <IconMail size={size} />;
        case "phone":
            return <IconPhone size={size} />
        case "location":
            return <IconLocation size={size} />
    }
}

export default Icon;