"use client";

import { StyleSheet, View } from "@react-pdf/renderer";
import { SocialEntry } from "@/app/definitions/resume-types";
import Social from "@/app/components/pdf/sections/header/social-entry";

const styles = StyleSheet.create({
  column: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    gap: "0.5rem"
  }
});

function SocialContainer({ socials }: { socials: SocialEntry[] }) {
  return (
    <View style={styles.column}>
      {socials
        .filter((social) => social.display)
        .map((social: SocialEntry, i: number) => (
          <Social key={`social-entry-${i}`} entry={social} />
        ))}
    </View>
  );
}

export default SocialContainer;
