"use client";

import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    list: {
        flexDirection: "column"
    },
    listItem: {
        flexDirection: "row",
        gap: 3
    },
    bullet: {
        marginTop: 5
    },
    text: {
        fontSize: "10.5pt"
    }
});

function ListItems({ items }: { items: string[] }) {
    return (
        <View style={styles.list}>
            {items.map((item, i) => {
                return (
                    <View key={i} style={styles.listItem}>
                        <Text key={i} style={styles.text}>
                            – {item.trim()}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
}

export default ListItems;
