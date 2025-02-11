import {StyleSheet, Text, View} from "@react-pdf/renderer";
import ListItems from "@/app/components/pdf/list-items";

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row'
    },
    introduction: {
        fontStyle: 'italic',
        fontSize: "10.5pt",
    },
    responsibilities: {
        fontSize: "10.5pt"
    }
});

function JobEntryBody({introduction, responsibilities}: {introduction: string, responsibilities: string[]}) {
    return (
        <View>
            {introduction && <Text style={styles.introduction}>{introduction}</Text>}
            <ListItems items={responsibilities}/>
        </View>
    )
}

export default JobEntryBody;