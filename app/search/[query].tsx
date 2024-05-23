import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { Text, SafeAreaView } from "react-native";

import { COLORS, icons, SIZES } from "~/constants";
import styles from "./search.style";
import { Job } from "~/types";
import { ScreenHeaderBtn } from "~/components";
import NearbyJobCard from "~/components/NearbyJobs/NearbyJobCard";
import { useFetch } from "~/hooks";

const JobSearch = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { data, error, isLoading, refetch } = useFetch<Job>("search", {
    query: params.query as string,
    page: page.toString(),
  });

  const handlePagination = (direction: "left" | "right") => {
    if (direction === "right") {
      setPage(page + 1);
      refetch();
      return;
    }

    if (page > 1) {
      setPage(page - 1);
      refetch();
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
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
          headerTitle: "",
        }}
      />

      <FlatList
        data={data?.data || []}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
          />
        )}
        keyExtractor={item => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                error && <Text>Oops something went wrong</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() =>
          data &&
          data.data &&
          data.data.length > 0 && (
            <View style={styles.footerContainer}>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => handlePagination("left")}
              >
                <Image
                  source={icons.chevronLeft}
                  style={styles.paginationImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={styles.paginationTextBox}>
                <Text style={styles.paginationText}>{page}</Text>
              </View>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => handlePagination("right")}
              >
                <Image
                  source={icons.chevronRight}
                  style={styles.paginationImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default JobSearch;
