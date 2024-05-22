import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "~/constants";
import { Job } from "~/types";

interface Styles {
  container: ViewStyle;
  logoContainer: ViewStyle;
  logoImage: ImageStyle;
  companyName: TextStyle;
  infoContainer: ViewStyle;
  infoWrapper: ViewStyle;
  location: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    width: 250,
    padding: SIZES.xLarge,
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "70%",
    height: "70%",
  },
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});

interface DynamicStyles {
  container: (selectedJob: string, item: Job) => ViewStyle;
  logoContainer: (selectedJob: string, item: Job) => ViewStyle;
  jobName: (selectedJob: string, item: Job) => TextStyle;
  publisher: (selectedJob: string, item: Job) => TextStyle;
}

export const dynamicStyles: DynamicStyles = {
  container: (selectedJob, item) => ({
    backgroundColor: selectedJob === item.job_id ? COLORS.primary : "#FFF",
  }),
  logoContainer: (selectedJob, item) => ({
    backgroundColor: selectedJob === item.job_id ? "#FFF" : COLORS.white,
  }),
  jobName: (selectedJob, item) => ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
  }),
  publisher: (selectedJob, item) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.bold,
    color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
  }),
};

export default styles;
