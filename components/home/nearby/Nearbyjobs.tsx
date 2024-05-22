import React, { useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";

import styles from "./nearbyjobs.style";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SIZES } from "~/constants";

import { useFetch } from "~/hooks";
import { Job } from "~/types";
import NearbyJobCard from "~/components/common/cards/nearby/NearbyJobCard";

const NearbyJobs = () => {
  const router = useRouter();

  const { isLoading, error, data, refetch } = useFetch<Job>("search", {
    query: "react developer",
    num_pages: "1",
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity style={styles.headerBtn}>View all</TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map(job => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default NearbyJobs;
