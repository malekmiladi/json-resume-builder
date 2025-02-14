import {DateControl} from "@/app/definitions/types";

export class JsonUtils {
    
    public static update(data: never, path: string, value: never) {
        let pointer = data;
        const slugs = path.split(".");
        for (let i = 0; i < slugs.length - 1; i++) {
            pointer = pointer[slugs[i]];
        }
        pointer[slugs[slugs.length - 1]] = value;
    }

    public static parseDateAsString(startDate: DateControl, endDate: DateControl) {
        let dateAsString = "";

        if (!startDate.controls.display) {
            return dateAsString;
        }

        const startDateAsDate = new Date(`${startDate.date.year}-${startDate.date.month}-${startDate.date.day ?? 1}`);
        const endDateAsDate = new Date(`${endDate.date.year}-${endDate.date.month}-${endDate.date.day ?? 1}`);

        if (!startDate.controls.yearOnly) {
            dateAsString += startDateAsDate.toLocaleString('default',{month:'short'}) + " "
        }

        dateAsString += startDateAsDate.getFullYear();

        if (!endDate.controls.display) {
            return dateAsString;
        } else {
            dateAsString += " – ";
        }

        if (endDate.controls.present) {
            dateAsString += "Present";
            return dateAsString;
        }

        if (!endDate.controls.yearOnly) {
            dateAsString += endDateAsDate.toLocaleString('default',{month:'short'}) + " "
        }

        dateAsString += endDateAsDate.getFullYear();

        return dateAsString;
    }

}