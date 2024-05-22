import React, { FC } from "react";
import { TouchableOpacity, Image } from "react-native";
import styles, { dynamicStyles } from "./screenheader.style";

interface Props {
  iconUrl: any;
  dimension: string;
}

const ScreenHeaderBtn: FC<Props> = ({ iconUrl, dimension }) => {
  const { btnImg } = dynamicStyles(dimension);

  const handlePress = () => {};
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      {/* @ts-ignore */}
      <Image source={iconUrl} resizeMode="cover" style={btnImg} />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
