import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";

import MaterialSymbol from "./MaterialSymbol";
import ButtonIcon from "./ButtonIcon";

const windowWidth = Dimensions.get("window").width;

interface Props {
  selectedImages: string[];
  setImages: (images: string[]) => void;
  removeImages: () => void;
}

export default function ImagePickerCarousel({
  selectedImages,
  setImages,
  removeImages,
}: Props) {
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      orderedSelection: true,
      quality: 1,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      setImages(result.assets.map((asset) => asset.uri));
    }
  };

  const onPageSelected = (e: any) => {
    setCurrentPage(e.nativeEvent.position);
  };

  return (
    <View style={styles.container}>
      {selectedImages.length === 0 ? (
        <Pressable style={styles.buttonImage} onPress={pickImageAsync}>
          <MaterialSymbol name="add_photo_image" color="#565656" size={80} />
          <Text style={styles.buttonImageText}>
            Adicione aqui as imagens do seu pet
          </Text>
        </Pressable>
      ) : (
        <>
          <View style={{ flex: 1 }}>
            <PagerView
              style={styles.carousel}
              initialPage={0}
              ref={pagerRef}
              onPageSelected={onPageSelected}
            >
              {selectedImages.map((image, index) => (
                <View key={index} style={styles.carouselItem}>
                  <Image
                    source={{ uri: image }}
                    style={styles.carouselImage}
                    contentFit="cover"
                  />
                </View>
              ))}
            </PagerView>
            <View style={styles.carouselIndicatorContainer}>
              {selectedImages.map((image, index) => {
                if (index === currentPage) {
                  return (
                    <Animated.View
                      key={index}
                      style={[
                        styles.carouselIndicator,
                        { backgroundColor: "#FF7733", width: 24 },
                      ]}
                    />
                  );
                }
                return (
                  <Animated.View key={index} style={styles.carouselIndicator} />
                );
              })}
            </View>
          </View>
          <View style={styles.buttonDelete}>
            <ButtonIcon icon="trash" onPress={removeImages} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "auto",
    height: 300,
  },
  buttonImage: {
    width: "auto",
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  buttonImageText: {
    maxWidth: 150,
    textAlign: "center",
  },
  buttonDelete: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  carousel: {
    flex: 1,
    height: 300,
  },
  carouselItem: {
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
  },
  carouselIndicatorContainer: {
    position: "absolute",
    top: 285,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  carouselIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#aaaaaa44",
    backgroundColor: "#ffffff",
    marginHorizontal: 4,
  },
});
