"use client";

import { Line, StyleSheet, Svg, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingBottom: "3pt"
  },
  title: {
    fontWeight: "bold",
    fontSize: "11.5pt"
  }
});

function SectionTitle({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Svg width={"100%"} height={2}>
        <Line x1={0} x2={1000} y1={0} y2={0} strokeWidth={2} stroke={"black"} />
      </Svg>
    </View>
  );
}

export default SectionTitle;
