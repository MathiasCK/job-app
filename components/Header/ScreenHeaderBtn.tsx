import React, { FC } from "react";
import { TouchableOpacity, Image } from "react-native";
import styles, { dynamicStyles } from "./screenheader.style";

interface Props {
  iconUrl: any;
  dimension: string;
  handlePress?: () => void;
}

const ScreenHeaderBtn: FC<Props> = ({ iconUrl, dimension, handlePress }) => {
  const { btnImg } = dynamicStyles(dimension);

  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      {/* @ts-ignore */}
      <Image source={iconUrl} resizeMode="cover" style={btnImg} />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
