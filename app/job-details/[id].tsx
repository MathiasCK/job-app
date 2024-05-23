import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import {
  About,
  Company,
  Specifics,
  ScreenHeaderBtn,
  Tabs,
  Footer,
} from "~/components";
import { COLORS, SIZES, icons } from "~/constants";
import { useFetch, useTab } from "~/hooks";
import { Job } from "~/types";

const JobDetails = () => {
  const { activeTab } = useTab();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const params = useLocalSearchParams();
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch<Job>("job-details", {
    job_id: params.id as string,
  });

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  const displayTabContent = () => {
    switch (activeTab) {
      case "About":
        return (
          <About info={data?.data?.[0].job_description ?? "No data provided"} />
        );
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            specifics={
              data?.data?.[0].job_highlights?.Qualifications ?? ["N/A"]
            }
          />
        );
      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            specifics={
              data?.data?.[0].job_highlights?.Responsibilities ?? ["N/A"]
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => {
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.push("/");
                }
              }}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data?.data?.length === 0 ? (
            <Text>No data found</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data?.data?.[0].employer_logo as string}
                jobTitle={data?.data?.[0].job_title as string}
                companyName={data?.data?.[0].employer_name as string}
                location={data?.data?.[0].job_country as string}
              />
              <Tabs />
              {displayTabContent()}
            </View>
          )}
        </ScrollView>
        <Footer
          url={
            data?.data?.[0]?.job_google_link ??
            "https://careers.google.com/jobs/results"
          }
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
