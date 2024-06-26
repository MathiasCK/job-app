import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

import styles from "./nearbyjobs.style";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "~/constants";

import { useFetch } from "~/hooks";
import { Job } from "~/types";
import NearbyJobCard from "./NearbyJobCard";

const NearbyJobs = () => {
  const router = useRouter();

  const { isLoading, error, data } = useFetch<Job>("search", {
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
        ) : error || data?.error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.data?.map(job => (
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
