"use client";

import { HeaderContent, SocialEntry } from "@/app/definitions/resume-types";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import SocialContainer from "@/app/components/pdf/sections/header/social-container";

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "5.8pt"
  },
  metadataContainer: {
    alignItems: "center",
    marginBottom: "3.5pt",
    paddingBottom: "5.8pt"
  },
  fullName: {
    fontSize: "16pt",
    fontWeight: "heavy"
  },
  function: {
    fontSize: "11.52pt",
    fontStyle: "italic"
  }
});

function HeaderElement({ headerContent }: { headerContent: HeaderContent }) {
  const extendSocials = () => {
    let nextId = headerContent.socials.length;
    return [
      {
        id: ++nextId,
        type: "mail",
        text: headerContent.email,
        display: headerContent.email.length > 0,
      } as SocialEntry,
      {
        id: ++nextId,
        type: "phone",
        text: headerContent.phone,
        display: headerContent.phone.length > 0,
      } as SocialEntry,
      ...headerContent.socials,
      {
        id: ++nextId,
        type: "location",
        text: headerContent.address,
        display: headerContent.address.length > 0,
      } as SocialEntry
    ];
  };
  return (
    <View style={styles.header}>
      <View style={styles.metadataContainer}>
        <Text style={styles.fullName}>{headerContent.fullName}</Text>
        <Text style={styles.function}>{headerContent.specialty}</Text>
      </View>
      <SocialContainer socials={extendSocials()} />
    </View>
  );
}

export default HeaderElement;
