'use client';

import {InterestsContent} from "@/app/definitions/types";
import SectionTitle from "@/app/components/pdf/section-title";
import {StyleSheet, Text, View} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    text: {
        fontSize: "10.5pt",
    },
    body: {
        paddingBottom: "5.8pt"
    }
})

function Interests({interests}: {interests: InterestsContent}) {
    return (
        <View style={styles.body}>
            <SectionTitle title={interests.title}/>
            <Text style={styles.text}>{interests.entries.join(', ')}</Text>
        </View>
    )
}

export default Interests;