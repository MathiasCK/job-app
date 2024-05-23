import { COLORS, SIZES, icons, images } from "~/constants";
import { Stack } from "expo-router";
import { SafeAreaView, ScrollView, View } from "react-native";
import {
  NearbyJobs,
  PopularJobs,
  ScreenHeaderBtn,
  Welcome,
} from "~/components";

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome />
          <PopularJobs />
          <NearbyJobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
