'use client';

import {AboutContent} from "@/app/definitions/types";
import {View, Text, StyleSheet} from "@react-pdf/renderer";
import SectionTitle from "@/app/components/pdf/section-title";

const styles = StyleSheet.create({
    body: {
        paddingBottom: "5.8pt"
    }
})

function About({content}: {content: AboutContent}) {
    return (
        <View style={styles.body}>
            <SectionTitle title={content.title}/>
            <Text style={{fontSize: "10.5pt"}}>{content.content}</Text>
        </View>
    )
}

export default About;