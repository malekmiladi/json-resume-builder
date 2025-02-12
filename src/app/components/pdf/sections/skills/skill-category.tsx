'use client';

import {CategoryData} from "@/app/definitions/types";
import {StyleSheet, Text, View} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    title: {
        fontWeight: "bold",
        fontSize: "10.5pt"
    },
    skills: {
        fontSize: "10.5pt",
    }
})

function SkillCategory({category}: {category: CategoryData}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{category.name}:{' '}</Text>
            <Text style={styles.skills}>{category.entries.join(', ')}</Text>
        </View>
    )
}

export default SkillCategory;