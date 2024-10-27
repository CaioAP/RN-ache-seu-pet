import { SetStateAction, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import PagerView from "react-native-pager-view";
import { Image } from "expo-image";
import MaterialSymbol from "@/components/MaterialSymbol";

const windowWidth = Dimensions.get("window").width;

export default function NewPost() {
  const pagerRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      setSelectedImages(result.assets.map((asset) => asset.uri));
    } else {
      alert("You did not select any image.");
    }
  };

  const onPageSelected = (e: any) => {
    setCurrentPage(e.nativeEvent.position);
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.imageContainer}>
          {selectedImages.length === 0 ? (
            <Pressable style={styles.buttonImage} onPress={pickImageAsync}>
              <MaterialSymbol
                name="add_photo_image"
                color="#565656"
                size={80}
              />
              <Text style={styles.buttonImageText}>
                Adicione aqui as imagens do seu pet
              </Text>
            </Pressable>
          ) : (
            <View style={{ flex: 1 }}>
              <PagerView
                style={styles.pager}
                initialPage={0}
                ref={pagerRef}
                onPageSelected={onPageSelected}
              >
                {selectedImages.map((image, index) => (
                  <View key={index} style={styles.page}>
                    <Image source={{ uri: image }} style={styles.image} />
                  </View>
                ))}
              </PagerView>
              <View style={styles.dotsContainer}>
                {selectedImages.map((image, index) => {
                  if (index === currentPage) {
                    return (
                      <Animated.View
                        key={index}
                        style={[
                          styles.dot,
                          { backgroundColor: "#FF7733", width: 24 },
                        ]}
                      />
                    );
                  }
                  return <Animated.View key={index} style={styles.dot} />;
                })}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
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
  pager: {
    flex: 1,
    height: 300,
  },
  page: {
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#aaaaaa44",
    backgroundColor: "#ffffff",
    marginHorizontal: 4,
  },
});
