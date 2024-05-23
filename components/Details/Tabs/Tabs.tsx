import React, { FC } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import styles, { dynamicStyles } from "./tabs.style";
import { SIZES } from "~/constants";

interface TabProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface TabButtonProps {
  name: string;
  activeTab: string;
  onHandleSearchType: () => void;
}

const TabButton: FC<TabButtonProps> = ({
  name,
  activeTab,
  onHandleSearchType,
}) => (
  <TouchableOpacity
    style={dynamicStyles.btn(name, activeTab)}
    onPress={onHandleSearchType}
  >
    <Text style={dynamicStyles.btnText(name, activeTab)}>{name}</Text>
  </TouchableOpacity>
);

const Tabs: FC<TabProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        contentContainerStyle={{
          columnGap: SIZES.small / 2,
        }}
      />
    </View>
  );
};

export default Tabs;
