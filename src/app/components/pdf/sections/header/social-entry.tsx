"use client";

import { Link, StyleSheet, Text, View } from "@react-pdf/renderer";
import Icon from "@/app/components/pdf/icons/icon";
import { SocialEntry } from "@/app/definitions/resume-types";

const styles = StyleSheet.create({
    socialEntry: {
        display: "flex",
        flexDirection: "row",
        textAlign: "center",
        alignItems: "center",
        alignContent: "center",
        alignSelf: "center"
    },
    text: {
        fontSize: 10,
        marginLeft: 4
    },
    link: {
        textDecoration: "none",
        color: "black"
    }
});

function Social({ entry }: { entry: SocialEntry }) {
    switch (entry.type) {
        case "link":
            return (
                <View style={styles.socialEntry}>
                    <Icon name={entry.name!} size={10} />
                    <Link style={styles.link} href={entry.link}>
                        <Text style={styles.text}>{entry.text}</Text>
                    </Link>
                </View>
            );
        case "mail":
            return (
                <View style={styles.socialEntry}>
                    <Icon name={entry.type!} size={10} />
                    <Link style={styles.link} href={`mailto:${entry.text}`}>
                        <Text style={styles.text}>{entry.text}</Text>
                    </Link>
                </View>
            );
        case "phone":
            const link = `${entry.text.replace(/ /g, "")}`;
            return (
                <View style={styles.socialEntry}>
                    <Icon name={entry.type!} size={10} />
                    <Link style={styles.link} href={link}>
                        <Text style={styles.text}>{entry.text}</Text>
                    </Link>
                </View>
            );
        case "location":
            return (
              <View style={styles.socialEntry}>
                <Icon name={entry.type!} size={10} />
                  <Text style={styles.text}>{entry.text}</Text>
              </View>
            );
        default:
            return <View></View>;
    }
}

export default Social;
