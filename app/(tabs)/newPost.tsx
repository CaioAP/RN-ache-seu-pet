import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ImagePickerCarousel from "@/components/ImagePickerCarousel";

export default function NewPost() {
  return (
    <SafeAreaView>
      <ScrollView>
        <ImagePickerCarousel />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
