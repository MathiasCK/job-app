import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import styles, { dynamicStyles } from "./welcome.style";
import { useRouter } from "expo-router";
import { SIZES, icons } from "~/constants";
import { useSearch } from "~/hooks";

const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = () => {
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useSearch();
  const [activeJobType, setActiveJobType] = useState(jobTypes[0]);

  const handleSearch = () => {
    if (searchQuery) {
      router.push(`/search/${searchQuery}`);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello John</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            placeholder="What are you looking for?"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={dynamicStyles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={dynamicStyles.tabText(activeJobType, item)}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
