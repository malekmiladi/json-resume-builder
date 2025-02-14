'use client';

import {HeaderContent} from "@/app/definitions/resume.types";
import {StyleSheet, Text, View} from "@react-pdf/renderer";
import SocialContainer from "@/app/components/pdf/sections/header/social-container";

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: "5.8pt"
    },
    metadataContainer: {
        alignItems: "center",
        marginBottom: "3.5pt",
        paddingBottom: "5.8pt",
    },
    fullName: {
        fontSize: "16pt",
        fontWeight: "heavy",
    },
    function: {
        fontSize: "11.52pt",
        fontStyle: "italic",
    }
});

function HeaderElement({headerContent}: {headerContent: HeaderContent}) {
    return (
        <View style={styles.header}>
            <View style={styles.metadataContainer}>
                <Text style={styles.fullName}>{headerContent.fullName}</Text>
                <Text style={styles.function}>{headerContent.function}</Text>
            </View>
            <SocialContainer socials={headerContent.socials} />
        </View>
    )
}

export default HeaderElement;