import React, { FC } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import styles, { dynamicStyles } from "./tabs.style";
import { SIZES } from "~/constants";
import { useTab } from "~/hooks";

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

const Tabs = () => {
  const { tabs, activeTab, setActiveTab } = useTab();
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
