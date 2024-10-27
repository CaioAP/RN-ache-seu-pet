import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ImagePickerCarousel from "@/components/ImagePickerCarousel";
import ImagePickThumbnail from "@/components/ImagePickThumbnail";
import { useState } from "react";

export default function NewPost() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const setImages = (images: string[]) => {
    setSelectedImages(images);
  };

  const removeImages = () => {
    setSelectedImages([]);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <ImagePickerCarousel
          selectedImages={selectedImages}
          setImages={setImages}
          removeImages={removeImages}
        />
        <View style={styles.form}>
          <Text style={styles.label}>Escolha a foto de capa</Text>
          <ImagePickThumbnail images={selectedImages} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    gap: 16,
    margin: 16,
  },
  label: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
    color: "#565656",
  },
});
