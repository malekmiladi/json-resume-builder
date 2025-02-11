import {StyleSheet, Text, View} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    justified: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: "10.5pt",
        fontWeight: 'heavy',
    },
    date: {
        fontSize: "10.5pt",
        fontWeight: 'normal',
    }
});

function TextAndDate({text, date}: {text: string, date: string}) {
    return (
        <View style={styles.justified}>
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.date}>{date}</Text>
        </View>
    )
}

export default TextAndDate;