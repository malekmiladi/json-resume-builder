'use client';

import { View, Text, Svg, Circle, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    list: {
        flexDirection: 'column'
    },
    listItem: {
        flexDirection: 'row',
        gap: 3
    },
    bullet: {
        marginTop: 5
    },
    text: {
        fontSize: "10.5pt"
    }
});

function ListItems({ items }: {items: string[]}) {
    return (
        <View style={styles.list}>
            {items.map((item, i) => {
                return (
                    <View key={i} style={styles.listItem}>
                        <Svg style={styles.bullet} width={4} height={4}>
                            <Circle cx="2" cy="2" r="2" fill="black"/>
                        </Svg>
                        <Text key={i} style={styles.text}>{item.trim()}</Text>
                    </View>
                )
            })}
        </View>
    )
}

export default ListItems