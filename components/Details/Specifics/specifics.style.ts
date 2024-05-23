import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { COLORS, FONT, SIZES } from "~/constants";

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  specificsContainer: ViewStyle;
  specificsWrapper: ViewStyle;
  specificsDot: ViewStyle;
  specificsText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    marginTop: SIZES.large,
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
  },
  title: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },
  specificsContainer: {
    marginVertical: SIZES.small,
  },
  specificsWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: SIZES.small / 1.25,
  },
  specificsDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: COLORS.gray2,
    marginTop: 6,
  },
  specificsText: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    fontFamily: FONT.regular,
    marginLeft: SIZES.small,
  },
});

export default styles;
