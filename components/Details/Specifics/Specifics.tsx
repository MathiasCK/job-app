import React, { FC } from "react";
import { View, Text } from "react-native";

import styles from "./specifics.style";

interface Props {
  title: string;
  specifics: string[];
}

const Specifics: FC<Props> = ({ title, specifics }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.specificsContainer}>
        {specifics.map((item, index) => (
          <View key={item + index} style={styles.specificsWrapper}>
            <View style={styles.specificsDot} />
            <Text style={styles.specificsText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Specifics;
