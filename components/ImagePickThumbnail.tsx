import { Image } from "expo-image";
import { useState } from "react";
import { FlatList, Platform, Pressable, StyleSheet, View } from "react-native";

interface Props {
  images: string[];
  onChange: (image: string) => void;
}

export default function ImagePickThumbnail({ images, onChange }: Props) {
  const [selected, setSelected] = useState<number>(0);

  const onSelect = (item: string, index: number) => {
    onChange(item);
    setSelected(index);
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      contentContainerStyle={styles.container}
      data={images}
      renderItem={({ item, index }) => {
        if (selected === index) {
          return (
            <View style={[styles.imageContainer, styles.imageSelected]}>
              <Image
                source={{ uri: item }}
                contentFit="cover"
                style={styles.image}
              />
            </View>
          );
        }
        return (
          <Pressable
            style={styles.imageContainer}
            onPress={() => onSelect(item, index)}
          >
            <Image
              source={{ uri: item }}
              contentFit="cover"
              style={styles.image}
            />
          </Pressable>
        );
      }}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageContainer: {
    width: 80,
    height: 60,
  },
  imageSelected: {
    borderWidth: 2,
    borderColor: "#ff7733",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
